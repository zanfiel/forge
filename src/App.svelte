<!--
  App.svelte — Root Layout
  Desktop-only Tauri workspace.
  Layout: [ActivityBar] | [Sidebar] | [Editor + BottomPanel] | [RightPanel]
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import TitleBar from './components/TitleBar.svelte';
  import ActivityBar from './components/ActivityBar.svelte';
  import FileTree from './components/FileTree.svelte';
  import Editor from './components/Editor.svelte';
  import ChatPanel from './components/ChatPanel.svelte';
  import InstructorPanel from './components/InstructorPanel.svelte';
  import WelcomeScreen from './components/WelcomeScreen.svelte';
  import BottomPanel from './components/BottomPanel.svelte';
  import ResizeHandle from './components/ResizeHandle.svelte';
  import { store } from './stores/app.svelte.ts';
  import * as api from './lib/api';

  let webReady = $state(true);

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

  function handleKeydown(e: KeyboardEvent) {
    // Ctrl+` toggle bottom panel (terminal)
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      store.bottomPanelOpen = !store.bottomPanelOpen;
      if (store.bottomPanelOpen) store.bottomPanelTab = 'terminal';
    }
    // Ctrl+B toggle sidebar
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      store.leftSidebarOpen = !store.leftSidebarOpen;
    }
    // Ctrl+Shift+F focus search via activity bar
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
      e.preventDefault();
      store.activityView = 'search';
      store.leftSidebarOpen = true;
    }
    // Ctrl+L toggle AI chat panel
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      store.panels.chat = !store.panels.chat;
    }
    // Ctrl+P quick open (activate search in sidebar)
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      store.activityView = 'search';
      store.leftSidebarOpen = true;
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
  let showSidebar = $derived(store.leftSidebarOpen && hasProject);

  let editorComponent: Editor;

  // Bottom panel max height = 60% of viewport
  let maxBottomHeight = $derived(Math.round((globalThis.innerHeight || 800) * 0.6));
</script>

<svelte:window onkeydown={handleKeydown} />

  <TitleBar hasProject={showWorkspace} onOpenProject={openProject} />

{#if showWorkspace}
  <div class="workspace">
    <!-- Activity Bar: always visible -->
    <ActivityBar />

    <!-- Left Sidebar -->
    {#if showSidebar}
      <aside class="sidebar-left" style:width="{store.sidebarWidth}px">
        {#if store.activityView === 'explorer'}
          <div class="sidebar-header">Explorer</div>
          <FileTree />
        {:else if store.activityView === 'search'}
          <div class="sidebar-header">Search</div>
          <div class="sidebar-placeholder">Search panel (Phase 6)</div>
        {:else if store.activityView === 'source-control'}
          <div class="sidebar-header">Source Control</div>
          <div class="sidebar-placeholder">Source control (Phase 4)</div>
        {:else if store.activityView === 'settings'}
          <div class="sidebar-header">Settings</div>
          <div class="sidebar-placeholder">Settings (Phase 2)</div>
        {/if}
      </aside>
      <ResizeHandle
        direction="horizontal"
        min={180}
        max={500}
        defaultSize={260}
        value={store.sidebarWidth}
        onResize={(v) => store.sidebarWidth = v}
      />
    {/if}

    <!-- Center: Editor + Bottom Panel -->
    <main class="center-area">
      <div class="editor-pane">
        <Editor bind:this={editorComponent} />
      </div>
      {#if store.bottomPanelOpen}
        <ResizeHandle
          direction="vertical"
          min={100}
          max={maxBottomHeight}
          defaultSize={200}
          value={store.bottomPanelHeight}
          onResize={(v) => store.bottomPanelHeight = v}
        />
        <div class="bottom-pane" style:height="{store.bottomPanelHeight}px">
          <BottomPanel />
        </div>
      {/if}
    </main>

    <!-- Right Panel -->
    {#if store.panels.chat}
      <ResizeHandle
        direction="horizontal"
        min={280}
        max={600}
        defaultSize={380}
        value={store.rightPanelWidth}
        onResize={(v) => store.rightPanelWidth = v}
        reverse={true}
      />
      <aside class="sidebar-right" style:width="{store.rightPanelWidth}px">
        <div class="panel-toggle">
          <button
            class="toggle-btn"
            class:active={store.rightPanel === 'chat'}
            onclick={() => store.rightPanel = 'chat'}
          >💬 Chat</button>
          <button
            class="toggle-btn"
            class:active={store.rightPanel === 'instructor'}
            onclick={() => store.rightPanel = 'instructor'}
          >🎓 Learn</button>
        </div>

        {#if store.rightPanel === 'chat'}
          <ChatPanel getMonacoEditor={() => editorComponent?.getEditor?.()} />
        {:else}
          <InstructorPanel />
        {/if}
      </aside>
    {/if}
  </div>
{:else}
  <WelcomeScreen onOpenProject={openProject} />
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
    display: flex;
    height: calc(100vh - 38px);
    overflow: hidden;
  }

  .sidebar-left {
    background: var(--bg-surface);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .sidebar-header {
    padding: 10px 14px 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
    flex-shrink: 0;
  }

  .sidebar-placeholder {
    padding: 24px 14px;
    color: var(--text-muted);
    font-size: 12px;
    text-align: center;
  }

  .center-area {
    background: var(--bg-base);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .editor-pane {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .bottom-pane {
    flex-shrink: 0;
    overflow: hidden;
    border-top: 1px solid var(--border);
  }

  .sidebar-right {
    background: var(--bg-surface);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
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
