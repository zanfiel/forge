<!--
  Editor.svelte -- Monaco Code Editor with Tabs (Tauri Edition)
  
  Monaco editor -- same as VS Code's editor engine.
  Uses api.writeFile() for saving instead of Electron IPC.
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { store } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';

  let editorContainer: HTMLDivElement;
  let editor: any = null;
  let monaco: any = null;
  let models: Map<string, any> = new Map();

  // Tab drag state
  let dragIndex = $state<number | null>(null);
  let dragOverIndex = $state<number | null>(null);

  onMount(async () => {
    monaco = await import('monaco-editor');

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
      automaticLayout: true,
      wordWrap: 'off',
      tabSize: 2,
      formatOnPaste: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      parameterHints: { enabled: true },
      stickyScroll: { enabled: true },
      accessibilitySupport: 'off',
    });

    // Ctrl+S -- Save
    editor.addAction({
      id: 'forge-save',
      label: 'Save File',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => saveCurrentFile(),
    });

    editor.onDidChangeModelContent(() => {
      const tab = store.activeTab;
      if (tab && editor.getModel()) {
        const currentContent = editor.getValue();
        if (currentContent !== tab.content) {
          tab.modified = true;
        }
      }
    });

    syncEditorToActiveTab();
  });

  $effect(() => {
    const _ = store.activeTabIndex;
    syncEditorToActiveTab();
  });

  function syncEditorToActiveTab() {
    if (!editor || !monaco) return;
    const tab = store.activeTab;

    if (!tab) {
      editor.setModel(null);
      return;
    }

    let model = models.get(tab.path);
    if (!model) {
      const uri = monaco.Uri.parse('file://' + tab.path.replace(/\\/g, '/'));
      model = monaco.editor.createModel(tab.content, tab.language, uri);
      models.set(tab.path, model);

      model.onDidChangeContent(() => {
        const t = store.openTabs.find(t => t.path === tab.path);
        if (t) t.modified = true;
      });
    }

    editor.setModel(model);
    editor.focus();
  }

  async function saveCurrentFile() {
    const tab = store.activeTab;
    if (!tab || !editor) return;

    const content = editor.getValue();
    const success = await api.writeFile(tab.path, content);
    if (success) {
      tab.content = content;
      tab.modified = false;
      store.notify('success', `Saved ${tab.name}`);
    } else {
      store.notify('error', `Failed to save ${tab.name}`);
    }
  }

  // Expose editor for ChatPanel auto-context
  export function getEditor() { return editor; }
  export function getMonaco() { return monaco; }

  /** Close a tab with dirty file protection. Exported for use from App.svelte. */
  export async function closeTab(index: number) {
    const tab = store.openTabs[index];
    if (!tab) return;

    // Dirty file protection
    if (tab.modified) {
      const shouldSave = confirm(`"${tab.name}" has unsaved changes.\n\nSave before closing?`);
      if (shouldSave) {
        // Save first
        if (index === store.activeTabIndex && editor) {
          const content = editor.getValue();
          const success = await api.writeFile(tab.path, content);
          if (!success) {
            store.notify('error', `Failed to save ${tab.name}. Tab not closed.`);
            return;
          }
          tab.content = content;
          tab.modified = false;
        }
      }
      // If they clicked Cancel in the confirm, we still close (browser confirm only has OK/Cancel)
      // For a proper "Don't Save / Cancel / Save" we'd need a custom dialog
    }

    // Push to closed tabs stack for undo
    store.pushClosedTab({ ...tab }, index);

    // Dispose Monaco model
    const model = models.get(tab.path);
    if (model) {
      model.dispose();
      models.delete(tab.path);
    }

    store.openTabs.splice(index, 1);

    if (store.activeTabIndex >= store.openTabs.length) {
      store.activeTabIndex = Math.max(0, store.openTabs.length - 1);
    }
    syncEditorToActiveTab();
  }

  // Tab drag reorder
  function onDragStart(e: DragEvent, index: number) {
    dragIndex = index;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(index));
    }
  }

  function onDragOver(e: DragEvent, index: number) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    dragOverIndex = index;
  }

  function onDrop(e: DragEvent, index: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) {
      dragIndex = null;
      dragOverIndex = null;
      return;
    }

    const tab = store.openTabs[dragIndex];
    store.openTabs.splice(dragIndex, 1);
    store.openTabs.splice(index, 0, tab);

    // Update activeTabIndex to follow the active tab
    if (store.activeTabIndex === dragIndex) {
      store.activeTabIndex = index;
    } else if (dragIndex < store.activeTabIndex && index >= store.activeTabIndex) {
      store.activeTabIndex--;
    } else if (dragIndex > store.activeTabIndex && index <= store.activeTabIndex) {
      store.activeTabIndex++;
    }

    dragIndex = null;
    dragOverIndex = null;
  }

  function onDragEnd() {
    dragIndex = null;
    dragOverIndex = null;
  }

  // Middle-click to close tab
  function onTabMouseDown(e: MouseEvent, index: number) {
    if (e.button === 1) {
      e.preventDefault();
      closeTab(index);
    }
  }
</script>

{#if store.openTabs.length > 0}
  <div class="tab-bar">
    {#each store.openTabs as tab, i}
      <div
        class="tab"
        class:active={i === store.activeTabIndex}
        class:drag-over={dragOverIndex === i && dragIndex !== i}
        class:dragging={dragIndex === i}
        onclick={() => { store.activeTabIndex = i; }}
        onmousedown={(e) => onTabMouseDown(e, i)}
        ondragstart={(e) => onDragStart(e, i)}
        ondragover={(e) => onDragOver(e, i)}
        ondrop={(e) => onDrop(e, i)}
        ondragend={onDragEnd}
        draggable="true"
        title={tab.path}
        role="tab"
      >
        <span class="tab-name">{tab.name}</span>
        {#if tab.modified}
          <span class="tab-dot">*</span>
        {/if}
        <button class="tab-close" onclick={(e) => { e.stopPropagation(); closeTab(i); }}>
          x
        </button>
      </div>
    {/each}
  </div>
{/if}

<div class="editor-wrapper" class:empty={store.openTabs.length === 0}>
  {#if store.openTabs.length === 0}
    <div class="empty-state">
      <div class="empty-icon">{'{ }'}</div>
      <p>Open a file from the explorer</p>
      <p class="hint">or press <kbd>Ctrl+P</kbd> to search</p>
      <div class="shortcut-grid">
        <kbd>Ctrl+Shift+P</kbd> <span>Command Palette</span>
        <kbd>Ctrl+P</kbd> <span>Quick Open File</span>
        <kbd>Ctrl+Shift+F</kbd> <span>Search in Project</span>
        <kbd>Ctrl+B</kbd> <span>Toggle Explorer</span>
        <kbd>Ctrl+`</kbd> <span>Toggle Terminal</span>
        <kbd>Ctrl+L</kbd> <span>Toggle Chat</span>
      </div>
    </div>
  {/if}
  <div bind:this={editorContainer} class="monaco-container"
       class:hidden={store.openTabs.length === 0}></div>
</div>

<style>
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
    cursor: grab;
    user-select: none;
  }

  .tab:hover { background: var(--bg-hover); color: var(--text-primary); }
  .tab.active {
    background: var(--bg-base);
    color: var(--text-primary);
    border-bottom: 2px solid var(--accent);
  }
  .tab.dragging { opacity: 0.4; }
  .tab.drag-over { border-left: 2px solid var(--accent); }

  .tab-dot { color: var(--accent); font-size: 10px; }

  .tab-close {
    width: 18px; height: 18px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 3px; font-size: 14px;
    color: var(--text-muted); opacity: 0; transition: all 0.1s;
  }
  .tab:hover .tab-close { opacity: 1; }
  .tab-close:hover { background: var(--bg-active); color: var(--text-primary); }

  .editor-wrapper { flex: 1; position: relative; overflow: hidden; }
  .monaco-container { width: 100%; height: 100%; }
  .monaco-container.hidden { display: none; }

  .empty-state {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; height: 100%; gap: 8px; color: var(--text-muted);
  }
  .empty-icon {
    font-size: 48px; margin-bottom: 8px; opacity: 0.15;
    font-family: var(--font-mono); font-weight: 200;
  }
  .hint { font-size: 12px; margin-bottom: 16px; }

  .shortcut-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 6px 16px;
    font-size: 12px;
    text-align: left;
  }
  .shortcut-grid span { color: var(--text-muted); }

  kbd {
    padding: 2px 6px; background: var(--bg-raised);
    border: 1px solid var(--border-bright); border-radius: 3px;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--text-secondary);
  }
</style>
