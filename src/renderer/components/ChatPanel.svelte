<!--
  ChatPanel.svelte — AI Chat Interface
  
  This is where you talk to Synapse. It's like a chat app but the
  "other person" is an AI that can:
  - Read and edit your files
  - Run commands
  - Explain code
  - Fix errors
  - Teach you concepts
  
  Messages stream in token-by-token (like ChatGPT) for a fluid feel.
-->

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { store, uid, type ChatMessage, type ToolCall } from '../stores/app.svelte.ts';

  let inputText = $state('');
  let inputEl: HTMLTextAreaElement;
  let scrollEl: HTMLDivElement;
  let mode = $state<'chat' | 'teach'>('chat');

  // Listen for streaming events from Synapse
  onMount(() => {
    window.api.onStreamEvent((event: any) => {
      // Find the currently streaming message
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
        case 'done':
          streamingMsg.isStreaming = false;
          store.isAiThinking = false;
          // Refresh files if AI edited them
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

  /** Send a message to Synapse */
  async function send() {
    const text = inputText.trim();
    if (!text || store.isAiThinking) return;

    // Add context about the current file if relevant
    let fullMessage = text;
    const currentTab = store.activeTab;
    
    // In teach mode, prepend context
    if (mode === 'teach' && currentTab) {
      fullMessage = `[Context: I'm looking at ${currentTab.name} (${currentTab.language})]\n\n${text}`;
    }

    // Add user message
    store.chatMessages.push({
      id: uid(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    });

    inputText = '';
    store.isAiThinking = true;
    await scrollToBottom();

    // Placeholder for AI response
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
      // Try streaming first, fall back to sync
      const resp = await window.api.chatStream(fullMessage, store.sessionId);

      if (resp?.error) {
        // Streaming failed — try sync endpoint
        const syncResp = await window.api.chat(fullMessage, store.sessionId);
        if (syncResp.error) {
          assistantMsg.content = `⚠️ Error: ${syncResp.error}`;
        } else {
          assistantMsg.content = syncResp.text || '(no response)';
          if (syncResp.tool_calls) {
            assistantMsg.toolCalls = syncResp.tool_calls;
          }
        }
      }
      // If streaming worked, events come via onStreamEvent callback below
    } catch (err: any) {
      assistantMsg.content = `⚠️ Connection failed: ${err.message}\n\nMake sure Synapse is running:\n\`synapse serve\``;
    }

    assistantMsg.isStreaming = false;
    store.isAiThinking = false;

    // If the AI edited a file that's open, refresh it
    if (assistantMsg.toolCalls) {
      for (const tc of assistantMsg.toolCalls) {
        if (tc.name === 'write' || tc.name === 'edit' || tc.name === 'patch') {
          await refreshOpenFiles();
        }
      }
    }

    await scrollToBottom();
  }

  /** Refresh open file contents (after AI edits them) */
  async function refreshOpenFiles() {
    for (const tab of store.openTabs) {
      const content = await window.api.readFile(tab.path);
      if (content !== null && content !== tab.content) {
        tab.content = content;
        tab.modified = false;
        // TODO: update Monaco model if this tab is active
      }
    }
  }

  /** Quick actions — common things to ask */
  function quickAction(action: string) {
    const tab = store.activeTab;
    const fileName = tab?.name || 'this code';
    
    const prompts: Record<string, string> = {
      explain: `Explain what ${fileName} does. Break it down simply — I'm learning.`,
      fix: `Check ${fileName} for bugs or issues. Explain what you find.`,
      improve: `How could I improve ${fileName}? Focus on readability and best practices.`,
      test: `Write tests for ${fileName}. Explain the testing approach.`,
      comment: `Add helpful comments to ${fileName}. I want to understand every section.`,
    };

    inputText = prompts[action] || action;
    send();
  }

  /** Handle Enter to send, Shift+Enter for newline */
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  /** Auto-resize textarea */
  function autoResize() {
    if (!inputEl) return;
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 150) + 'px';
  }

  async function scrollToBottom() {
    await tick();
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  }

  /** Simple markdown-ish rendering */
  function renderContent(text: string): string {
    return text
      // Code blocks: ```lang\ncode\n```
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="code-block"><code class="lang-$1">$2</code></pre>')
      // Inline code: `code`
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Bold: **text**
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic: *text*
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
      // Headers
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      // Lists
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      // Line breaks
      .replace(/\n/g, '<br>');
  }
</script>

<div class="chat-panel">
  <!-- Header -->
  <div class="chat-header">
    <div class="mode-tabs">
      <button class="mode-tab" class:active={mode === 'chat'} onclick={() => mode = 'chat'}>
        💬 Chat
      </button>
      <button class="mode-tab" class:active={mode === 'teach'} onclick={() => mode = 'teach'}>
        🎓 Teach
      </button>
    </div>
  </div>

  <!-- Quick actions (shown when in teach mode) -->
  {#if mode === 'teach' && store.openTabs.length > 0}
    <div class="quick-actions">
      <button class="qa-btn" onclick={() => quickAction('explain')}>🔍 Explain</button>
      <button class="qa-btn" onclick={() => quickAction('fix')}>🔧 Find bugs</button>
      <button class="qa-btn" onclick={() => quickAction('improve')}>✨ Improve</button>
      <button class="qa-btn" onclick={() => quickAction('comment')}>💬 Add comments</button>
      <button class="qa-btn" onclick={() => quickAction('test')}>🧪 Write tests</button>
    </div>
  {/if}

  <!-- Messages -->
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
        <!-- Avatar -->
        <div class="msg-avatar">
          {msg.role === 'user' ? '👤' : '⚡'}
        </div>

        <!-- Content -->
        <div class="msg-body">
          <div class="msg-role">{msg.role === 'user' ? 'You' : 'Forge'}</div>
          <div class="msg-content">
            {@html renderContent(msg.content)}
          </div>

          <!-- Tool calls (show what the AI did) -->
          {#if msg.toolCalls && msg.toolCalls.length > 0}
            <div class="tool-calls">
              {#each msg.toolCalls as tc}
                <details class="tool-call">
                  <summary>
                    <span class="tool-icon">🔧</span>
                    <span class="tool-name">{tc.name}</span>
                    {#if tc.result}
                      <span class="tool-status">✓</span>
                    {/if}
                  </summary>
                  {#if tc.args}
                    <pre class="tool-args">{tc.args}</pre>
                  {/if}
                  {#if tc.result}
                    <pre class="tool-result">{tc.result.slice(0, 500)}{tc.result.length > 500 ? '...' : ''}</pre>
                  {/if}
                </details>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}

    {#if store.isAiThinking}
      <div class="thinking">
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
        <span class="thinking-dot"></span>
      </div>
    {/if}
  </div>

  <!-- Input area -->
  <div class="input-area">
    <textarea
      bind:this={inputEl}
      bind:value={inputText}
      oninput={autoResize}
      onkeydown={handleKeydown}
      placeholder={mode === 'teach' ? "Ask me to explain anything..." : "Ask anything... (Enter to send)"}
      rows="1"
    ></textarea>
    <button class="send-btn" onclick={send} disabled={!inputText.trim() || store.isAiThinking}>
      {store.isAiThinking ? '⏳' : '↑'}
    </button>
  </div>
</div>

<style>
  .chat-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* ─── Header ───────────────────────────── */
  .chat-header {
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
  }

  .mode-tabs {
    display: flex;
    gap: 4px;
    background: var(--bg-raised);
    padding: 3px;
    border-radius: var(--radius);
  }

  .mode-tab {
    flex: 1;
    padding: 5px 8px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.15s;
  }
  .mode-tab.active {
    background: var(--accent);
    color: white;
  }
  .mode-tab:hover:not(.active) {
    background: var(--bg-hover);
  }

  /* ─── Quick Actions ────────────────────── */
  .quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
  }

  .qa-btn {
    padding: 4px 10px;
    font-size: 11px;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 999px;
    color: var(--text-secondary);
    transition: all 0.15s;
  }
  .qa-btn:hover {
    background: var(--accent-dim);
    border-color: var(--accent);
    color: var(--accent);
  }

  /* ─── Messages ─────────────────────────── */
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .message {
    display: flex;
    gap: 10px;
    animation: fadeIn 0.2s ease-out;
  }

  .msg-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    background: var(--bg-raised);
  }

  .message.assistant .msg-avatar {
    background: var(--accent-dim);
  }

  .msg-body {
    flex: 1;
    min-width: 0;
  }

  .msg-role {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 4px;
  }

  .msg-content {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-primary);
    word-wrap: break-word;
  }

  .msg-content :global(h3), .msg-content :global(h4) {
    margin: 8px 0 4px;
    font-size: 14px;
    color: var(--accent);
  }

  .msg-content :global(.code-block) {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px;
    margin: 8px 0;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.5;
  }

  .msg-content :global(.inline-code) {
    background: var(--bg-raised);
    padding: 1px 5px;
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--cyan);
  }

  .msg-content :global(li) {
    margin-left: 16px;
    margin-bottom: 2px;
  }

  /* ─── Tool Calls ───────────────────────── */
  .tool-calls {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tool-call {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 12px;
  }

  .tool-call summary {
    padding: 6px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-secondary);
  }
  .tool-call summary:hover {
    background: var(--bg-hover);
  }

  .tool-name {
    font-family: var(--font-mono);
    font-weight: 500;
    color: var(--blue);
  }

  .tool-status {
    color: var(--green);
    margin-left: auto;
  }

  .tool-args, .tool-result {
    padding: 8px 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    overflow-x: auto;
    margin: 0;
    border-top: 1px solid var(--border);
    color: var(--text-secondary);
    max-height: 200px;
    overflow-y: auto;
  }

  .tool-result {
    background: #0d0d14;
  }

  /* ─── Thinking Dots ────────────────────── */
  .thinking {
    display: flex;
    gap: 4px;
    padding: 8px 0 8px 38px;
  }

  .thinking-dot {
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    animation: pulse 1s ease-in-out infinite;
  }
  .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
  .thinking-dot:nth-child(3) { animation-delay: 0.4s; }

  /* ─── Welcome ──────────────────────────── */
  .welcome-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px 20px;
    color: var(--text-muted);
    gap: 8px;
    flex: 1;
  }

  .welcome-icon {
    font-size: 40px;
    margin-bottom: 8px;
  }

  .welcome-message h3 {
    font-size: 16px;
    color: var(--text-secondary);
  }

  .welcome-message p {
    font-size: 13px;
    max-width: 250px;
  }

  .teach-hint {
    color: var(--accent);
    font-weight: 500;
  }

  /* ─── Input ────────────────────────────── */
  .input-area {
    padding: 12px;
    border-top: 1px solid var(--border);
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  textarea {
    flex: 1;
    resize: none;
    border: 1px solid var(--border);
    background: var(--bg-raised);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 13px;
    padding: 10px 12px;
    border-radius: var(--radius);
    outline: none;
    line-height: 1.4;
    max-height: 150px;
    transition: border-color 0.15s;
  }
  textarea:focus {
    border-color: var(--accent);
  }
  textarea::placeholder {
    color: var(--text-muted);
  }

  .send-btn {
    width: 36px;
    height: 36px;
    border-radius: var(--radius);
    background: var(--accent);
    color: white;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .send-btn:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: scale(1.05);
  }
  .send-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
</style>
