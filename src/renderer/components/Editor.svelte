<!--
  Editor.svelte — Monaco Code Editor with Tabs
  
  Monaco is the same editor engine that powers VS Code.
  It gives us:
  - Syntax highlighting for 80+ languages
  - IntelliSense (autocomplete) for TypeScript/JavaScript
  - Find and replace (Ctrl+F, Ctrl+H)
  - Multi-cursor editing (Alt+Click)
  - Bracket matching, auto-indent, minimap
  - Code folding, go to line, command palette
  
  We wrap it in a Svelte component and add tabs on top.
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { store } from '../stores/app.svelte.ts';

  let editorContainer: HTMLDivElement;
  let editor: any = null;           // Monaco editor instance
  let monaco: any = null;           // Monaco module

  // Track models (each open file gets its own "model" — Monaco's term for a document)
  let models: Map<string, any> = new Map();

  onMount(async () => {
    // Dynamic import — Monaco is big, so we load it async
    monaco = await import('monaco-editor');

    // ── Configure Monaco ──────────────────────
    
    // Set the dark theme (we customize it to match our UI)
    monaco.editor.defineTheme('forge-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '555577', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'type', foreground: 'ffcb6b' },
        { token: 'function', foreground: '82aaff' },
        { token: 'variable', foreground: 'e4e4ed' },
        { token: 'operator', foreground: '89ddff' },
        { token: 'delimiter', foreground: '89ddff' },
      ],
      colors: {
        'editor.background': '#0a0a0f',
        'editor.foreground': '#e4e4ed',
        'editor.lineHighlightBackground': '#111118',
        'editor.selectionBackground': '#7c5cfc33',
        'editor.inactiveSelectionBackground': '#7c5cfc1a',
        'editorCursor.foreground': '#7c5cfc',
        'editorWhitespace.foreground': '#1e1e2e',
        'editorIndentGuide.background': '#1e1e2e',
        'editorIndentGuide.activeBackground': '#2e2e42',
        'editorLineNumber.foreground': '#333355',
        'editorLineNumber.activeForeground': '#7c5cfc',
        'editor.findMatchBackground': '#fbbf2444',
        'editor.findMatchHighlightBackground': '#fbbf2422',
        'editorBracketMatch.background': '#7c5cfc22',
        'editorBracketMatch.border': '#7c5cfc44',
        'editorOverviewRuler.border': '#00000000',
        'scrollbarSlider.background': '#2e2e4255',
        'scrollbarSlider.hoverBackground': '#2e2e4299',
      },
    });

    // ── Create Editor ──────────────────────────
    editor = monaco.editor.create(editorContainer, {
      theme: 'forge-dark',
      fontFamily: "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
      fontSize: 14,
      lineHeight: 22,
      padding: { top: 16, bottom: 16 },
      minimap: { enabled: true, scale: 1, showSlider: 'mouseover' },
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      renderLineHighlight: 'all',
      bracketPairColorization: { enabled: true },
      guides: { bracketPairs: true, indentation: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,        // Auto-resize when container changes
      wordWrap: 'off',
      tabSize: 2,
      formatOnPaste: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      parameterHints: { enabled: true },
      // Accessible features
      accessibilitySupport: 'off',  // Faster rendering
    });

    // ── Keyboard Shortcuts ─────────────────────
    
    // Ctrl+S — Save current file
    editor.addAction({
      id: 'forge-save',
      label: 'Save File',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => saveCurrentFile(),
    });

    // Ctrl+Shift+P — Quick command palette (like VS Code)
    // (Monaco has this built in, but we can add custom commands)

    // Track content changes to mark tab as modified
    editor.onDidChangeModelContent(() => {
      const tab = store.activeTab;
      if (tab && editor.getModel()) {
        const currentContent = editor.getValue();
        if (currentContent !== tab.content) {
          tab.modified = true;
        }
      }
    });

    // If a file is already open, show it
    syncEditorToActiveTab();
  });

  // ── React to tab changes ───────────────────
  $effect(() => {
    // This runs whenever store.activeTabIndex changes
    const _ = store.activeTabIndex;
    syncEditorToActiveTab();
  });

  function syncEditorToActiveTab() {
    if (!editor || !monaco) return;
    const tab = store.activeTab;
    
    if (!tab) {
      // No tabs open — show empty state
      editor.setModel(null);
      return;
    }

    // Get or create a model for this file
    let model = models.get(tab.path);
    if (!model) {
      const uri = monaco.Uri.parse('file://' + tab.path.replace(/\\/g, '/'));
      model = monaco.editor.createModel(tab.content, tab.language, uri);
      models.set(tab.path, model);

      // Track changes on this specific model
      model.onDidChangeContent(() => {
        const t = store.openTabs.find(t => t.path === tab.path);
        if (t) t.modified = true;
      });
    }

    editor.setModel(model);
    editor.focus();
  }

  /** Save the current file to disk */
  async function saveCurrentFile() {
    const tab = store.activeTab;
    if (!tab || !editor) return;

    const content = editor.getValue();
    const success = await window.api.writeFile(tab.path, content);
    if (success) {
      tab.content = content;
      tab.modified = false;
    }
  }

  /** Close a tab */
  function closeTab(index: number) {
    const tab = store.openTabs[index];
    // Clean up the Monaco model
    const model = models.get(tab.path);
    if (model) {
      model.dispose();
      models.delete(tab.path);
    }

    store.openTabs.splice(index, 1);
    
    // Adjust active index
    if (store.activeTabIndex >= store.openTabs.length) {
      store.activeTabIndex = Math.max(0, store.openTabs.length - 1);
    }
    syncEditorToActiveTab();
  }
</script>

<!-- Tab bar -->
{#if store.openTabs.length > 0}
  <div class="tab-bar">
    {#each store.openTabs as tab, i}
      <div
        class="tab"
        class:active={i === store.activeTabIndex}
        onclick={() => { store.activeTabIndex = i; }}
        title={tab.path}
        role="tab"
      >
        <span class="tab-name">
          {tab.name}
        </span>
        {#if tab.modified}
          <span class="tab-dot">●</span>
        {/if}
        <button class="tab-close" onclick={(e) => { e.stopPropagation(); closeTab(i); }}>
          ×
        </button>
      </div>
    {/each}
  </div>
{/if}

<!-- Editor container (Monaco mounts here) -->
<div class="editor-wrapper" class:empty={store.openTabs.length === 0}>
  {#if store.openTabs.length === 0}
    <div class="empty-state">
      <div class="empty-icon">📝</div>
      <p>Open a file from the explorer</p>
      <p class="hint">or press <kbd>Ctrl+P</kbd> to search</p>
    </div>
  {/if}
  <div bind:this={editorContainer} class="monaco-container"
       class:hidden={store.openTabs.length === 0}></div>
</div>

<style>
  /* ─── Tab Bar ──────────────────────────── */
  .tab-bar {
    display: flex;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    min-height: 36px;
  }

  .tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 12px;
    height: 36px;
    font-size: 12px;
    color: var(--text-secondary);
    border-right: 1px solid var(--border);
    white-space: nowrap;
    transition: all 0.1s;
    flex-shrink: 0;
  }

  .tab:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }

  .tab.active {
    background: var(--bg-base);
    color: var(--text-primary);
    border-bottom: 2px solid var(--accent);
  }

  .tab-dot {
    color: var(--accent);
    font-size: 10px;
  }

  .tab-close {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 14px;
    color: var(--text-muted);
    opacity: 0;
    transition: all 0.1s;
  }
  .tab:hover .tab-close { opacity: 1; }
  .tab-close:hover {
    background: var(--bg-active);
    color: var(--text-primary);
  }

  /* ─── Editor ───────────────────────────── */
  .editor-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .monaco-container {
    width: 100%;
    height: 100%;
  }

  .monaco-container.hidden {
    display: none;
  }

  /* ─── Empty State ──────────────────────── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
    color: var(--text-muted);
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 8px;
    opacity: 0.3;
  }

  .hint {
    font-size: 12px;
  }

  kbd {
    padding: 2px 6px;
    background: var(--bg-raised);
    border: 1px solid var(--border-bright);
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 11px;
  }
</style>
