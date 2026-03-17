<!--
  App.svelte -- Root Layout
  Handles both Tauri desktop and web PWA modes.
  Web auth handled by reverse proxy -- if you can see this, you're in.
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import TitleBar from './components/TitleBar.svelte';
  import FileTree from './components/FileTree.svelte';
  import Editor from './components/Editor.svelte';
  import ChatPanel from './components/ChatPanel.svelte';
  import InstructorPanel from './components/InstructorPanel.svelte';
  import WelcomeScreen from './components/WelcomeScreen.svelte';
  import WebAuth from './components/WebAuth.svelte';
  import Terminal from './components/Terminal.svelte';
  import CommandPalette from './components/CommandPalette.svelte';
  import StatusBar from './components/StatusBar.svelte';
  import SearchPanel from './components/SearchPanel.svelte';
  import Breadcrumbs from './components/Breadcrumbs.svelte';
  import NotificationToast from './components/NotificationToast.svelte';
  import { store, detectLanguage } from './stores/app.svelte.ts';
  import * as api from './lib/api';

  /** In web mode, show project picker first (no project = show picker) */
  let webReady = $state(api.isDesktop);

  /** Command Palette state */
  let showPalette = $state(false);
  let paletteMode = $state<'command' | 'file' | 'goto'>('command');

  onMount(async () => {
    const dir = await api.getProjectDir();
    if (dir) {
      store.projectDir = dir;
      store.fileTree = await api.readDir(dir);
      webReady = true;
      // Check git status
      refreshGitStatus();
    } else if (api.isDesktop) {
      webReady = true;
    }
    // If web mode and no project, webReady stays false -> show project picker
  });

  async function openProject() {
    const dir = await api.openFolder();
    if (dir) {
      store.projectDir = dir;
      store.fileTree = await api.readDir(dir);
      refreshGitStatus();
    }
  }

  async function refreshGitStatus() {
    if (!store.projectDir) return;
    try {
      const status = await api.gitStatus(store.projectDir);
      if (status) {
        store.git = status;
      }
    } catch {}
  }

  function onWebReady() {
    webReady = true;
  }

  // Global keyboard shortcuts
  function handleKeydown(e: KeyboardEvent) {
    // Don't intercept when palette is open (it handles its own keys)
    if (showPalette) return;

    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      store.panels.terminal = !store.panels.terminal;
    }

    // Ctrl+Shift+P: command palette
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      paletteMode = 'command';
      showPalette = true;
    }

    // Ctrl+P: file picker
    if (e.ctrlKey && !e.shiftKey && e.key === 'p') {
      e.preventDefault();
      paletteMode = 'file';
      showPalette = true;
    }

    // Ctrl+G: goto line
    if (e.ctrlKey && !e.shiftKey && e.key === 'g') {
      e.preventDefault();
      paletteMode = 'goto';
      showPalette = true;
    }

    // Ctrl+B: toggle file tree
    if (e.ctrlKey && !e.shiftKey && e.key === 'b') {
      e.preventDefault();
      store.panels.fileTree = !store.panels.fileTree;
    }

    // Ctrl+L: toggle chat panel
    if (e.ctrlKey && !e.shiftKey && e.key === 'l') {
      e.preventDefault();
      store.panels.chat = !store.panels.chat;
    }

    // Ctrl+Shift+F: project-wide search
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
      e.preventDefault();
      store.panels.search = !store.panels.search;
      if (store.panels.search) {
        store.panels.fileTree = false; // Replace file tree with search
      }
    }

    // Ctrl+Shift+T: reopen closed tab
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
      e.preventDefault();
      reopenClosedTab();
    }

    // Ctrl+W: close current tab
    if (e.ctrlKey && !e.shiftKey && e.key === 'w') {
      e.preventDefault();
      if (store.openTabs.length > 0) {
        editorComponent?.closeTab(store.activeTabIndex);
      }
    }

    // Ctrl+Tab: next tab
    if (e.ctrlKey && e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      if (store.openTabs.length > 1) {
        store.activeTabIndex = (store.activeTabIndex + 1) % store.openTabs.length;
      }
    }

    // Ctrl+Shift+Tab: previous tab
    if (e.ctrlKey && e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      if (store.openTabs.length > 1) {
        store.activeTabIndex = (store.activeTabIndex - 1 + store.openTabs.length) % store.openTabs.length;
      }
    }
  }

  async function reopenClosedTab() {
    const closed = store.reopenClosedTab();
    if (!closed) return;

    // Re-read file to get latest content
    const content = await api.readFile(closed.tab.path);
    if (content === null) {
      store.notify('warning', `File no longer exists: ${closed.tab.name}`);
      return;
    }

    const tab = { ...closed.tab, content, modified: false };
    const insertIdx = Math.min(closed.index, store.openTabs.length);
    store.openTabs.splice(insertIdx, 0, tab);
    store.activeTabIndex = insertIdx;
    store.notify('info', `Reopened ${tab.name}`);
  }

  // Open a file from search results or palette at a specific line
  async function openFileAtLine(path: string, line?: number) {
    const existingIdx = store.openTabs.findIndex(t => t.path === path);
    if (existingIdx !== -1) {
      store.activeTabIndex = existingIdx;
      if (line && editorComponent?.getEditor?.()) {
        setTimeout(() => {
          const editor = editorComponent.getEditor();
          editor.revealLineInCenter(line);
          editor.setPosition({ lineNumber: line, column: 1 });
          editor.focus();
        }, 50);
      }
      return;
    }
    const content = await api.readFile(path);
    if (content === null) return;
    const name = path.split(/[\\/]/).pop() || path;
    store.openTabs.push({
      path,
      name,
      content,
      modified: false,
      language: detectLanguage(name),
    });
    store.activeTabIndex = store.openTabs.length - 1;
    if (line) {
      setTimeout(() => {
        const editor = editorComponent?.getEditor?.();
        if (editor) {
          editor.revealLineInCenter(line);
          editor.setPosition({ lineNumber: line, column: 1 });
          editor.focus();
        }
      }, 100);
    }
  }

  // Command palette handler
  async function handlePaletteOpenFile(path: string) {
    await openFileAtLine(path);
  }

  function handlePaletteCommand(commandId: string) {
    // Handle goto-line with argument
    if (commandId.startsWith('goto-line:')) {
      const line = parseInt(commandId.split(':')[1], 10);
      if (!isNaN(line) && editorComponent?.getEditor?.()) {
        const editor = editorComponent.getEditor();
        editor.revealLineInCenter(line);
        editor.setPosition({ lineNumber: line, column: 1 });
        editor.focus();
      }
      return;
    }

    switch (commandId) {
      case 'toggle-file-tree':
        store.panels.search = false;
        store.panels.fileTree = !store.panels.fileTree;
        break;
      case 'toggle-terminal':
        store.panels.terminal = !store.panels.terminal;
        break;
      case 'toggle-chat':
        store.panels.chat = !store.panels.chat;
        break;
      case 'toggle-search':
        store.panels.search = !store.panels.search;
        if (store.panels.search) store.panels.fileTree = false;
        break;
      case 'mode-chat':
        store.panels.chat = true;
        store.rightPanel = 'chat';
        break;
      case 'mode-instructor':
        store.panels.chat = true;
        store.rightPanel = 'instructor';
        break;
      case 'open-folder':
        openProject();
        break;
      case 'save-file': {
        const editor = editorComponent?.getEditor?.();
        if (editor) editor.trigger('command-palette', 'forge-save', null);
        break;
      }
      case 'close-tab':
        if (store.openTabs.length > 0) {
          editorComponent?.closeTab(store.activeTabIndex);
        }
        break;
      case 'close-all-tabs':
        store.openTabs = [];
        store.activeTabIndex = 0;
        break;
      case 'reopen-closed-tab':
        reopenClosedTab();
        break;
      case 'goto-line': {
        paletteMode = 'goto';
        showPalette = true;
        break;
      }
      case 'find-in-file': {
        const editor = editorComponent?.getEditor?.();
        if (editor) editor.trigger('command-palette', 'actions.find', null);
        break;
      }
      case 'find-in-project':
        store.panels.search = true;
        store.panels.fileTree = false;
        break;
      case 'replace-in-file': {
        const editor = editorComponent?.getEditor?.();
        if (editor) editor.trigger('command-palette', 'editor.action.startFindReplaceAction', null);
        break;
      }
      case 'new-file':
        store.openTabs.push({
          path: `untitled-${Date.now()}`,
          name: 'Untitled',
          content: '',
          modified: true,
          language: 'plaintext',
        });
        store.activeTabIndex = store.openTabs.length - 1;
        break;
      case 'format-document': {
        const editor = editorComponent?.getEditor?.();
        if (editor) editor.trigger('command-palette', 'editor.action.formatDocument', null);
        break;
      }
      case 'toggle-word-wrap': {
        const editor = editorComponent?.getEditor?.();
        if (editor) {
          const current = editor.getOption(/* wordWrap */ 130);
          editor.updateOptions({ wordWrap: current === 'off' ? 'on' : 'off' });
        }
        break;
      }
      case 'toggle-minimap': {
        const editor = editorComponent?.getEditor?.();
        if (editor) {
          const current = editor.getOption(/* minimap */ 72);
          editor.updateOptions({ minimap: { enabled: !current?.enabled } });
        }
        break;
      }
      case 'change-theme':
        // Placeholder for theme switching
        store.notify('info', 'Theme switching coming soon');
        break;
      case 'zoom-in': {
        const editor = editorComponent?.getEditor?.();
        if (editor) {
          const current = editor.getOption(/* fontSize */ 50);
          editor.updateOptions({ fontSize: (current || 14) + 1 });
        }
        break;
      }
      case 'zoom-out': {
        const editor = editorComponent?.getEditor?.();
        if (editor) {
          const current = editor.getOption(/* fontSize */ 50);
          editor.updateOptions({ fontSize: Math.max(8, (current || 14) - 1) });
        }
        break;
      }
    }
  }

  let hasProject = $derived(store.projectDir !== '');
  let showWorkspace = $derived(hasProject || store.rightPanel === 'instructor');

  let editorComponent: Editor;
</script>

<svelte:window onkeydown={handleKeydown} />

{#if !webReady && api.isWeb}
  <!-- Web mode: show project picker (already authenticated via proxy) -->
  <WebAuth onAuthenticated={onWebReady} />
{:else}
  <TitleBar hasProject={showWorkspace} onOpenProject={openProject} />

  {#if showWorkspace}
    <div class="workspace"
         class:no-tree={!store.panels.fileTree && !store.panels.search || !hasProject}
         class:no-chat={!store.panels.chat}>
      
      {#if (store.panels.fileTree || store.panels.search) && hasProject}
        <aside class="sidebar-left">
          <div class="sidebar-tabs">
            <button
              class="sidebar-tab"
              class:active={store.panels.fileTree && !store.panels.search}
              onclick={() => { store.panels.fileTree = true; store.panels.search = false; }}
              title="Explorer (Ctrl+B)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V9C21 7.9 20.1 7 19 7H13L11 5H5C3.9 5 3 5.9 3 7Z"/>
              </svg>
            </button>
            <button
              class="sidebar-tab"
              class:active={store.panels.search}
              onclick={() => { store.panels.search = true; store.panels.fileTree = false; }}
              title="Search (Ctrl+Shift+F)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21L16.5 16.5"/>
              </svg>
            </button>
          </div>
          {#if store.panels.search}
            <SearchPanel onOpenFile={openFileAtLine} />
          {:else}
            <FileTree />
          {/if}
        </aside>
      {/if}

      <main class="editor-area">
        {#if store.activeTab && hasProject}
          <Breadcrumbs
            filePath={store.activeTab.path}
            projectDir={store.projectDir}
            onNavigate={openFileAtLine}
          />
        {/if}
        <div class="editor-pane" class:with-terminal={store.panels.terminal}>
          <Editor bind:this={editorComponent} />
        </div>
        {#if store.panels.terminal}
          <div class="terminal-pane">
            <Terminal />
          </div>
        {/if}
      </main>

      {#if store.panels.chat}
        <aside class="sidebar-right">
          <div class="panel-toggle">
            <button
              class="toggle-btn"
              class:active={store.rightPanel === 'chat'}
              onclick={() => store.rightPanel = 'chat'}
            >Chat</button>
            <button
              class="toggle-btn"
              class:active={store.rightPanel === 'instructor'}
              onclick={() => store.rightPanel = 'instructor'}
            >Learn</button>
          </div>

          {#if store.rightPanel === 'chat'}
            <ChatPanel getMonacoEditor={() => editorComponent?.getEditor?.()} />
          {:else}
            <InstructorPanel />
          {/if}
        </aside>
      {/if}
    </div>

    <StatusBar
      editor={editorComponent?.getEditor?.()}
      onGotoLine={() => { paletteMode = 'goto'; showPalette = true; }}
    />
  {:else}
    <WelcomeScreen onOpenProject={openProject} />
  {/if}
{/if}

<!-- Command Palette overlay -->
{#if showPalette}
  <CommandPalette
    mode={paletteMode}
    onClose={() => showPalette = false}
    onOpenFile={handlePaletteOpenFile}
    onCommand={handlePaletteCommand}
  />
{/if}

<!-- Notification Toasts -->
<NotificationToast />

<style>
  .workspace {
    display: grid;
    grid-template-columns: 260px 1fr 380px;
    height: calc(100vh - 38px - 24px); /* title bar + status bar */
    overflow: hidden;
  }
  .workspace.no-tree { grid-template-columns: 1fr 380px; }
  .workspace.no-chat { grid-template-columns: 260px 1fr; }
  .workspace.no-tree.no-chat { grid-template-columns: 1fr; }

  .sidebar-left {
    background: var(--bg-surface);
    border-right: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .sidebar-tabs {
    display: flex;
    padding: 4px 6px;
    gap: 2px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .sidebar-tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 4px;
    color: var(--text-muted);
    transition: all 0.15s;
  }
  .sidebar-tab:hover { color: var(--text-primary); background: var(--bg-hover); }
  .sidebar-tab.active { color: var(--accent); background: var(--accent-dim); }

  .editor-area {
    background: var(--bg-base);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .editor-pane {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .editor-pane.with-terminal { flex: 3; }

  .terminal-pane {
    flex: 1;
    min-height: 120px;
    max-height: 50%;
    border-top: 1px solid var(--border);
    overflow: hidden;
  }

  .sidebar-right {
    background: var(--bg-surface);
    border-left: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .panel-toggle {
    display: flex;
    padding: 6px;
    gap: 2px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .toggle-btn {
    flex: 1;
    padding: 6px 8px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 6px;
    color: var(--text-secondary);
    transition: all 0.15s;
  }
  .toggle-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
  .toggle-btn.active { background: var(--accent); color: white; }
</style>
