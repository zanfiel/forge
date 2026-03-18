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

  onMount(async () => {
    const dir = await api.getProjectDir();
    if (dir) {
      store.projectDir = dir;
      store.fileTree = await api.readDir(dir);
    }
  });

  async function openProject() {
    const dir = await api.openFolder();
    if (dir) {
      store.projectDir = dir;
      store.fileTree = await api.readDir(dir);
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
