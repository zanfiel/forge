<!--
  ChatPanel.svelte - AI Chat Interface (Tauri Edition)
  
  Talks to Synapse via Tauri invoke → Rust HTTP → Synapse.
  Streaming events come via Tauri's event system instead of Electron IPC.
-->

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { store, uid, type ChatMessage, type ToolCall, type PendingEdit, type Checkpoint } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';
  import DiffView from './DiffView.svelte';

  let { getMonacoEditor = () => null as any }: { getMonacoEditor?: () => any } = $props();

  function gatherEditorContext(): string {
    const tab = store.activeTab;
    if (!tab || !tab.content) return '';

    const parts: string[] = [];
    parts.push(`[Active file: ${tab.path} (${tab.language})]`);

    const content = tab.content;
    if (content.length <= 15000) {
      parts.push('```' + (tab.language || '') + '\n' + content + '\n```');
    } else {
      parts.push('```' + (tab.language || '') + '\n' + content.slice(0, 5000) + '\n...[truncated]...\n' + content.slice(-5000) + '\n```');
    }

    try {
      const editor = getMonacoEditor?.();
      if (editor) {
        const selection = editor.getSelection?.();
        if (selection && !selection.isEmpty()) {
          const selectedText = editor.getModel()?.getValueInRange(selection) || '';
          if (selectedText) {
            parts.push(`[Selection (lines ${selection.startLineNumber}-${selection.endLineNumber}):\n\`\`\`\n${selectedText}\n\`\`\`]`);
          }
        }
        const pos = editor.getPosition?.();
        if (pos) {
          parts.push(`[Cursor: line ${pos.lineNumber}, col ${pos.column}]`);
        }
      }
    } catch {}

    return parts.join('\n\n');
  }

  interface LocalPendingEdit {
    file: string;
    oldContent: string;
    newContent: string;
    toolCallId: string;
  }
  let pendingEdits = $state<LocalPendingEdit[]>([]);

  let inputText = $state('');
  let inputEl: HTMLTextAreaElement;
  let scrollEl: HTMLDivElement;
  let mode = $state<'chat' | 'agent' | 'teach'>('agent');

  onMount(() => {
    api.onStreamEvent((event: any) => {
      const streamingMsg = store.chatMessages.find(m => m.isStreaming);
      if (!streamingMsg) return;

      switch (event.type) {
        case 'text':
          streamingMsg.content += event.text;
          scrollToBottom();
          break;
        case 'tool_call':
          if (!streamingMsg.toolCalls) streamingMsg.toolCalls = [];
          streamingMsg.toolCalls.push({
            id: event.tool_call_id,
            name: event.tool_name,
            args: event.tool_args,
          });
          break;
        case 'tool_result':
          if (streamingMsg.toolCalls) {
            const tc = streamingMsg.toolCalls.find(
              (t: ToolCall) => t.id === event.tool_call_id
            ) || streamingMsg.toolCalls.find(
              (t: ToolCall) => t.name === event.tool_name && !t.result
            );
            if (tc) tc.result = event.tool_result;
          }
          break;
        case 'pending_edit':
          store.pendingEdits = [...store.pendingEdits, {
            toolCallId: event.tool_call_id,
            file: event.file,
            oldContent: event.old_content,
            newContent: event.new_content,
          }];
          pendingEdits = [...pendingEdits, {
            file: event.file || event.data?.file,
            oldContent: event.old_content || event.data?.old_content,
            newContent: event.new_content || event.data?.new_content,
            toolCallId: event.tool_call_id || event.data?.tool_call_id,
          }];
          // Pause thinking indicator - waiting for user accept/reject
          store.isAiThinking = false;
          scrollToBottom();
          break;
        case 'usage':
          store.tokenUsage = {
            input: event.usage?.prompt_tokens ?? event.prompt_tokens ?? 0,
            output: event.usage?.completion_tokens ?? event.completion_tokens ?? 0,
            cached: event.usage?.cache_read_tokens ?? event.cache_read_tokens ?? 0,
          };
          break;
        case 'done':
          streamingMsg.isStreaming = false;
          store.isAiThinking = false;
          if (streamingMsg.toolCalls?.some(
            (tc: ToolCall) => ['write', 'edit', 'patch'].includes(tc.name)
          )) {
            refreshOpenFiles();
          }
          scrollToBottom();
          break;
        case 'error':
          streamingMsg.content += `\n⚠️ ${event.text}`;
          streamingMsg.isStreaming = false;
          store.isAiThinking = false;
          break;
      }
    });
  });

  function createCheckpoint(description: string, filePath: string, content: string) {
    const cp: Checkpoint = {
      id: uid(),
      timestamp: Date.now(),
      description,
      files: new Map([[filePath, content]]),
    };
    store.checkpoints = [...store.checkpoints, cp];
  }

  async function rewindToCheckpoint(cpId: string) {
    const cp = store.checkpoints.find(c => c.id === cpId);
    if (!cp) return;
    for (const [path, content] of cp.files) {
      await api.writeFile(path, content);
      const tab = store.openTabs.find(t => t.path === path);
      if (tab) {
        tab.content = content;
        tab.modified = false;
      }
    }
    // Remove this checkpoint and all after it
    const idx = store.checkpoints.findIndex(c => c.id === cpId);
    store.checkpoints = store.checkpoints.slice(0, idx);
  }

  async function acceptEdit(edit: PendingEdit) {
    // Snapshot before accepting
    createCheckpoint(`AI edit: ${edit.file.split(/[\\/]/).pop()}`, edit.file, edit.oldContent);
    store.pendingEdits = store.pendingEdits.filter(e => e.toolCallId !== edit.toolCallId);
    store.isAiThinking = true;
    try {
      await api.confirmEdit(edit.toolCallId, true);
      // Refresh the file in editor if it's open
      const openTab = store.openTabs.find(t => t.path === edit.file);
      if (openTab) {
        openTab.content = edit.newContent;
        openTab.modified = false;
      }
      // Store the edit in Engram
      api.storeMemory(`Accepted AI edit to ${edit.file}`, 'task');
    } catch {
      store.isAiThinking = false;
    }
  }

  async function rejectEdit(edit: PendingEdit) {
    store.pendingEdits = store.pendingEdits.filter(e => e.toolCallId !== edit.toolCallId);
    store.isAiThinking = true;
    try {
      await api.confirmEdit(edit.toolCallId, false);
    } catch {
      store.isAiThinking = false;
    }
  }

  function handleEditResolved(toolCallId: string) {
    pendingEdits = pendingEdits.filter(e => e.toolCallId !== toolCallId);
  }

  async function rememberMessage(content: string) {
    const mem = await api.storeMemory(content, 'reference');
    if (mem) {
      // Brief visual feedback via a toast-like placeholder in chat
      const note: ChatMessage = {
        id: uid(),
        role: 'assistant',
        content: `✓ Saved to Engram memory #${mem.id}`,
        timestamp: Date.now(),
      };
      store.chatMessages.push(note);
    }
  }

  async function send() {
    const text = inputText.trim();
    if (!text || store.isAiThinking) return;

    let fullMessage = text;
    const currentTab = store.activeTab;

    if (mode === 'chat') {
      fullMessage = `[Mode: chat-only - respond conversationally. Do NOT use tools.]\n\n${text}`;
    } else if (mode === 'teach' && currentTab) {
      fullMessage = `[Context: I'm looking at ${currentTab.name} (${currentTab.language})]\n\n${text}`;
    }

    // Auto-inject editor context (active file, cursor, selection)
    const editorCtx = gatherEditorContext();
    if (editorCtx) {
      fullMessage += `\n\n---\n# Editor Context\n${editorCtx}`;
    }

    // Inject Engram context - query with project name + user message (non-blocking)
    const projectName = store.projectDir.split(/[\\/]/).pop() || 'forge';
    const engramCtx = await api.getEngramContext(`${projectName} ${text}`, 1500);
    if (engramCtx) {
      fullMessage += `\n\n---\n<memory-context>\n${engramCtx}\n</memory-context>`;
    }

    store.chatMessages.push({
      id: uid(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    });

    inputText = '';
    store.isAiThinking = true;
    await scrollToBottom();

    const assistantMsg: ChatMessage = {
      id: uid(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
      toolCalls: [],
    };
    store.chatMessages.push(assistantMsg);

    try {
      const resp = await api.chatStream(fullMessage, store.sessionId);

      if (resp?.error) {
        const syncResp = await api.chat(fullMessage, store.sessionId);
        if (syncResp.error) {
          assistantMsg.content = `⚠️ Error: ${syncResp.error}`;
        } else {
          assistantMsg.content = syncResp.text || '(no response)';
          if (syncResp.tool_calls) {
            assistantMsg.toolCalls = syncResp.tool_calls;
          }
        }
      }
    } catch (err: any) {
      assistantMsg.content = `⚠️ Connection failed: ${err.message}\n\nMake sure Synapse is running:\n\`synapse serve\``;
    }

    assistantMsg.isStreaming = false;
    store.isAiThinking = false;

    if (assistantMsg.toolCalls) {
      for (const tc of assistantMsg.toolCalls) {
        if (tc.name === 'write' || tc.name === 'edit' || tc.name === 'patch') {
          await refreshOpenFiles();
        }
      }
    }

    await scrollToBottom();
  }

  async function refreshOpenFiles() {
    for (const tab of store.openTabs) {
      const content = await api.readFile(tab.path);
      if (content !== null && content !== tab.content) {
        tab.content = content;
        tab.modified = false;
      }
    }
  }

  function quickAction(action: string) {
    const tab = store.activeTab;
    const fileName = tab?.name || 'this code';

    const prompts: Record<string, string> = {
      explain: `Explain what ${fileName} does. Break it down simply - I'm learning.`,
      fix: `Check ${fileName} for bugs or issues. Explain what you find.`,
      improve: `How could I improve ${fileName}? Focus on readability and best practices.`,
      test: `Write tests for ${fileName}. Explain the testing approach.`,
      comment: `Add helpful comments to ${fileName}. I want to understand every section.`,
    };

    inputText = prompts[action] || action;
    send();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function autoResize() {
    if (!inputEl) return;
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 150) + 'px';
  }

  async function scrollToBottom() {
    await tick();
    if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
  }

  interface DiffLine { type: 'add' | 'remove' | 'context'; text: string; }

  function getDiffLines(oldContent: string, newContent: string): DiffLine[] {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    const result: DiffLine[] = [];
    // Simple line-based diff: show removed then added, with limited context
    const maxContext = 3;
    let i = 0, j = 0;
    while (i < oldLines.length || j < newLines.length) {
      if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
        if (result.length < maxContext || (oldLines.length - i) <= maxContext) {
          result.push({ type: 'context', text: '  ' + oldLines[i] });
        }
        i++; j++;
      } else {
        if (i < oldLines.length) result.push({ type: 'remove', text: '- ' + oldLines[i++] });
        if (j < newLines.length) result.push({ type: 'add', text: '+ ' + newLines[j++] });
      }
      if (result.length > 100) { result.push({ type: 'context', text: '  ...' }); break; }
    }
    return result;
  }

  function renderContent(text: string): string {
    return text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code class="lang-$1">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>');
  }
</script>

<div class="chat-panel">
  <div class="chat-header">
    <div class="mode-tabs">
      <button class="mode-tab" class:active={mode === 'agent'} onclick={() => mode = 'agent'}>
        ⚡ Agent
      </button>
      <button class="mode-tab" class:active={mode === 'chat'} onclick={() => mode = 'chat'}>
        💬 Chat
      </button>
      <button class="mode-tab" class:active={mode === 'teach'} onclick={() => mode = 'teach'}>
        🎓 Teach
      </button>
    </div>
  </div>

  {#if mode === 'teach' && store.openTabs.length > 0}
    <div class="quick-actions">
      <button class="qa-btn" onclick={() => quickAction('explain')}>🔍 Explain</button>
      <button class="qa-btn" onclick={() => quickAction('fix')}>🔧 Find bugs</button>
      <button class="qa-btn" onclick={() => quickAction('improve')}>✨ Improve</button>
      <button class="qa-btn" onclick={() => quickAction('comment')}>💬 Add comments</button>
      <button class="qa-btn" onclick={() => quickAction('test')}>🧪 Write tests</button>
    </div>
  {/if}

  <div class="messages" bind:this={scrollEl}>
    {#if store.chatMessages.length === 0}
      <div class="welcome-message">
        <div class="welcome-icon">⚡</div>
        <h3>Forge AI</h3>
        <p>Ask me anything about your code. I can read files, run commands, and explain concepts.</p>
        {#if mode === 'teach'}
          <p class="teach-hint">Open a file and use the buttons above, or just ask a question!</p>
        {/if}
      </div>
    {/if}

    {#each store.chatMessages as msg (msg.id)}
      <div class="message {msg.role}" class:streaming={msg.isStreaming}>
        <div class="msg-avatar">{msg.role === 'user' ? '👤' : '⚡'}</div>
        <div class="msg-body">
          <div class="msg-role">{msg.role === 'user' ? 'You' : 'Forge'}</div>
          <div class="msg-content">{@html renderContent(msg.content)}</div>

          {#if msg.role === 'assistant' && msg.content && !msg.isStreaming}
            <button class="remember-btn" onclick={() => rememberMessage(msg.content)} title="Save to Engram memory">
              🧠
            </button>
          {/if}

          {#if msg.toolCalls && msg.toolCalls.length > 0}
            <div class="tool-calls">
              {#each msg.toolCalls as tc}
                <details class="tool-call">
                  <summary>
                    <span class="tool-icon">🔧</span>
                    <span class="tool-name">{tc.name}</span>
                    {#if tc.result}<span class="tool-status">✓</span>{/if}
                  </summary>
                  {#if tc.args}<pre class="tool-args">{tc.args}</pre>{/if}
                  {#if tc.result}<pre class="tool-result">{tc.result.slice(0, 500)}{tc.result.length > 500 ? '...' : ''}</pre>{/if}
                </details>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}

    {#each pendingEdits as edit (edit.toolCallId)}
      <DiffView {edit} onResolved={handleEditResolved} />
    {/each}

    {#if store.isAiThinking}
      <div class="thinking">
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
      </div>
    {/if}
  </div>

  {#if store.tokenUsage.input > 0 || store.checkpoints.length > 0}
    <div class="token-bar">
      {#if store.tokenUsage.input > 0}
        <span>↑{store.tokenUsage.input.toLocaleString()} ↓{store.tokenUsage.output.toLocaleString()}</span>
        {#if store.tokenUsage.cached > 0}
          <span class="cached-tokens">💾 {store.tokenUsage.cached.toLocaleString()} cached</span>
        {/if}
      {/if}
      {#if store.checkpoints.length > 0}
        <details class="checkpoint-menu">
          <summary class="checkpoint-badge">🔖 {store.checkpoints.length} checkpoint{store.checkpoints.length !== 1 ? 's' : ''}</summary>
          <div class="checkpoint-list">
            {#each store.checkpoints.slice().reverse() as cp (cp.id)}
              <button class="checkpoint-item" onclick={() => rewindToCheckpoint(cp.id)}>
                ↩ {cp.description}
                <span class="checkpoint-time">{new Date(cp.timestamp).toLocaleTimeString()}</span>
              </button>
            {/each}
          </div>
        </details>
      {/if}
    </div>
  {/if}

  <div class="input-area">
    <textarea
      bind:this={inputEl}
      bind:value={inputText}
      oninput={autoResize}
      onkeydown={handleKeydown}
      placeholder={mode === 'teach' ? "Ask me to explain anything..." : mode === 'agent' ? "Tell me what to build..." : "Ask anything... (Enter to send)"}
      rows="1"
    ></textarea>
    <button class="send-btn" onclick={send} disabled={!inputText.trim() || store.isAiThinking}>
      {store.isAiThinking ? '⏳' : '↑'}
    </button>
  </div>
</div>

<style>
  .chat-panel { display: flex; flex-direction: column; height: 100%; }

  .chat-header { padding: 8px 12px; border-bottom: 1px solid var(--border); }

  .mode-tabs {
    display: flex; gap: 4px; background: var(--bg-raised);
    padding: 3px; border-radius: var(--radius);
  }
  .mode-tab {
    flex: 1; padding: 5px 8px; border-radius: 5px; font-size: 12px;
    font-weight: 500; color: var(--text-secondary); transition: all 0.15s;
  }
  .mode-tab.active { background: var(--accent); color: white; }
  .mode-tab:hover:not(.active) { background: var(--bg-hover); }

  .quick-actions {
    display: flex; flex-wrap: wrap; gap: 4px;
    padding: 8px 12px; border-bottom: 1px solid var(--border);
  }
  .qa-btn {
    padding: 4px 10px; font-size: 11px; background: var(--bg-raised);
    border: 1px solid var(--border); border-radius: 999px;
    color: var(--text-secondary); transition: all 0.15s;
  }
  .qa-btn:hover { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

  .messages {
    flex: 1; overflow-y: auto; padding: 16px 12px;
    display: flex; flex-direction: column; gap: 16px;
  }

  .message { display: flex; gap: 10px; animation: fadeIn 0.2s ease-out; }

  .msg-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0; background: var(--bg-raised);
  }
  .message.assistant .msg-avatar { background: var(--accent-dim); }

  .msg-body { flex: 1; min-width: 0; }

  .msg-role {
    font-size: 12px; font-weight: 600;
    color: var(--text-secondary); margin-bottom: 4px;
  }

  .msg-content {
    font-size: 13px; line-height: 1.6;
    color: var(--text-primary); word-wrap: break-word;
  }
  .msg-content :global(h3), .msg-content :global(h4) {
    margin: 8px 0 4px; font-size: 14px; color: var(--accent);
  }
  .msg-content :global(.code-block) {
    background: var(--bg-raised); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 12px; margin: 8px 0;
    overflow-x: auto; font-family: var(--font-mono);
    font-size: 12px; line-height: 1.5;
  }
  .msg-content :global(.inline-code) {
    background: var(--bg-raised); padding: 1px 5px; border-radius: 3px;
    font-family: var(--font-mono); font-size: 12px; color: var(--cyan);
  }
  .msg-content :global(li) { margin-left: 16px; margin-bottom: 2px; }

  .tool-calls { margin-top: 8px; display: flex; flex-direction: column; gap: 4px; }
  .tool-call {
    background: var(--bg-raised); border: 1px solid var(--border);
    border-radius: var(--radius-sm); font-size: 12px;
  }
  .tool-call summary {
    padding: 6px 10px; cursor: pointer; display: flex;
    align-items: center; gap: 6px; color: var(--text-secondary);
  }
  .tool-call summary:hover { background: var(--bg-hover); }
  .tool-name { font-family: var(--font-mono); font-weight: 500; color: var(--blue); }
  .tool-status { color: var(--green); margin-left: auto; }
  .tool-args, .tool-result {
    padding: 8px 10px; font-family: var(--font-mono); font-size: 11px;
    overflow-x: auto; margin: 0; border-top: 1px solid var(--border);
    color: var(--text-secondary); max-height: 200px; overflow-y: auto;
  }
  .tool-result { background: #0d0d14; }

  .thinking { display: flex; gap: 4px; padding: 8px 0 8px 38px; }
  .thinking-dot {
    width: 6px; height: 6px; background: var(--accent);
    border-radius: 50%; animation: pulse 1s ease-in-out infinite;
  }
  .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
  .thinking-dot:nth-child(3) { animation-delay: 0.4s; }

  .welcome-message {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center;
    padding: 40px 20px; color: var(--text-muted); gap: 8px; flex: 1;
  }
  .welcome-icon { font-size: 40px; margin-bottom: 8px; }
  .welcome-message h3 { font-size: 16px; color: var(--text-secondary); }
  .welcome-message p { font-size: 13px; max-width: 250px; }
  .teach-hint { color: var(--accent); font-weight: 500; }

  .input-area {
    padding: 12px; border-top: 1px solid var(--border);
    display: flex; gap: 8px; align-items: flex-end;
  }
  textarea {
    flex: 1; resize: none; border: 1px solid var(--border);
    background: var(--bg-raised); color: var(--text-primary);
    font-family: var(--font-sans); font-size: 13px;
    padding: 10px 12px; border-radius: var(--radius);
    outline: none; line-height: 1.4; max-height: 150px;
    transition: border-color 0.15s;
  }
  textarea:focus { border-color: var(--accent); }
  textarea::placeholder { color: var(--text-muted); }

  .send-btn {
    width: 36px; height: 36px; border-radius: var(--radius);
    background: var(--accent); color: white;
    font-size: 16px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; flex-shrink: 0;
  }
  .send-btn:hover:not(:disabled) { background: var(--accent-hover); transform: scale(1.05); }
  .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Pending edits (diff review) */
  .pending-edit {
    border: 1px solid #2ea043; border-radius: var(--radius);
    overflow: hidden; margin: 4px 0;
  }
  .pending-edit-header {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 10px; background: #0d2a1a;
    border-bottom: 1px solid #2ea043;
  }
  .pending-file { font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: #7ee787; }
  .pending-path { font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .pending-actions { display: flex; gap: 6px; flex-shrink: 0; }
  .accept-btn {
    padding: 3px 10px; font-size: 11px; font-weight: 600;
    background: #2ea04330; color: #7ee787; border: 1px solid #2ea043;
    border-radius: 4px; cursor: pointer;
  }
  .accept-btn:hover { background: #2ea04360; }
  .reject-btn {
    padding: 3px 10px; font-size: 11px; font-weight: 600;
    background: #da363430; color: #f85149; border: 1px solid #da3634;
    border-radius: 4px; cursor: pointer;
  }
  .reject-btn:hover { background: #da363460; }
  .pending-diff {
    max-height: 200px; overflow-y: auto;
    font-family: var(--font-mono); font-size: 11px; line-height: 1.5;
    background: #0d1117;
  }
  .diff-line { padding: 0 10px; white-space: pre-wrap; word-break: break-all; }
  .diff-line.add { background: #0a2a0a; color: #7ee787; }
  .diff-line.remove { background: #2a0a0a; color: #f85149; text-decoration: line-through; }
  .diff-line.context { color: var(--text-muted); }

  /* Remember button */
  .remember-btn {
    margin-top: 4px; padding: 2px 6px; font-size: 12px;
    background: transparent; border: 1px solid var(--border);
    border-radius: 4px; color: var(--text-muted); cursor: pointer;
    opacity: 0; transition: opacity 0.15s;
  }
  .message:hover .remember-btn { opacity: 1; }
  .remember-btn:hover { background: var(--bg-raised); color: var(--text-primary); }

  /* Token bar */
  .token-bar {
    display: flex; align-items: center; gap: 10px;
    padding: 4px 12px; font-size: 11px; color: var(--text-muted);
    border-top: 1px solid var(--border); background: var(--bg-raised);
  }
  .cached-tokens { color: #58a6ff; }

  /* Checkpoint menu */
  .checkpoint-menu { position: relative; margin-left: auto; }
  .checkpoint-badge {
    cursor: pointer; padding: 2px 6px; border-radius: 4px;
    font-size: 11px; color: var(--text-muted);
  }
  .checkpoint-badge:hover { background: var(--bg-hover); color: var(--text-primary); }
  .checkpoint-list {
    position: absolute; bottom: 100%; right: 0;
    background: var(--bg-surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 4px; min-width: 200px;
    max-height: 200px; overflow-y: auto; z-index: 100;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }
  .checkpoint-item {
    display: flex; align-items: center; gap: 6px;
    width: 100%; padding: 6px 8px; font-size: 11px;
    color: var(--text-secondary); border-radius: 4px;
    text-align: left;
  }
  .checkpoint-item:hover { background: var(--bg-hover); color: var(--text-primary); }
  .checkpoint-time { margin-left: auto; font-size: 10px; color: var(--text-muted); }
</style>
