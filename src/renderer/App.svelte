<!--
  App.svelte — Root Layout
  
  This is the top-level component. It arranges:
  - Title bar (custom, frameless window)
  - File tree (left sidebar)
  - Editor (center)
  - Chat panel (right sidebar)
  - Terminal (bottom)
  
  The layout uses CSS Grid — think of it as a spreadsheet where you
  define rows and columns, then place components in cells.
-->

<script lang="ts">
  import TitleBar from './components/TitleBar.svelte';
  import FileTree from './components/FileTree.svelte';
  import Editor from './components/Editor.svelte';
  import ChatPanel from './components/ChatPanel.svelte';
  import WelcomeScreen from './components/WelcomeScreen.svelte';
  import { store } from './stores/app.svelte.ts';

  // Access the Electron API we exposed in preload.ts
  // TypeScript doesn't know about window.api, so we tell it
  declare global {
    interface Window {
      api: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
        isMaximized: () => Promise<boolean>;
        openFolder: () => Promise<string | null>;
        readDir: (path?: string) => Promise<any[]>;
        readFile: (path: string) => Promise<string | null>;
        writeFile: (path: string, content: string) => Promise<boolean>;
        stat: (path: string) => Promise<any>;
        chat: (message: string, sessionId: string) => Promise<any>;
        chatStream: (message: string, sessionId: string) => Promise<any>;
        onStreamEvent: (callback: (event: any) => void) => void;
        getProjectDir: () => Promise<string>;
        openExternal: (url: string) => void;
      };
    }
  }

  /** Open a project folder */
  async function openProject() {
    const dir = await window.api.openFolder();
    if (dir) {
      store.projectDir = dir;
      const tree = await window.api.readDir(dir);
      store.fileTree = tree;
    }
  }

  // Check if a project was already open (restored from last session)
  $effect(() => {
    window.api.getProjectDir().then(async (dir) => {
      if (dir) {
        store.projectDir = dir;
        store.fileTree = await window.api.readDir(dir);
      }
    });
  });

  /** Are we showing the main workspace or the welcome screen? */
  let hasProject = $derived(store.projectDir !== '');
</script>

<!-- Custom title bar (since we removed the default one) -->
<TitleBar {hasProject} onOpenProject={openProject} />

{#if hasProject}
  <!-- Main workspace layout -->
  <div class="workspace"
       class:no-tree={!store.panels.fileTree}
       class:no-chat={!store.panels.chat}>
    
    {#if store.panels.fileTree}
      <aside class="sidebar-left">
        <FileTree />
      </aside>
    {/if}

    <main class="editor-area">
      <Editor />
    </main>

    {#if store.panels.chat}
      <aside class="sidebar-right">
        <ChatPanel />
      </aside>
    {/if}
  </div>
{:else}
  <!-- No project open — show welcome screen -->
  <WelcomeScreen onOpenProject={openProject} />
{/if}

<style>
  /*
   * CSS Grid Layout
   * 
   * This creates a 3-column layout:
   *   [file tree] [editor] [chat panel]
   * 
   * Each column can be toggled on/off.
   * The editor always takes remaining space (1fr = "1 fraction of remaining")
   */
  .workspace {
    display: grid;
    grid-template-columns: 260px 1fr 380px;
    height: calc(100vh - 38px); /* Full height minus title bar */
    overflow: hidden;
  }

  /* When file tree is hidden, it's just [editor] [chat] */
  .workspace.no-tree {
    grid-template-columns: 1fr 380px;
  }

  /* When chat is hidden, it's [tree] [editor] */
  .workspace.no-chat {
    grid-template-columns: 260px 1fr;
  }

  /* When both hidden, just [editor] */
  .workspace.no-tree.no-chat {
    grid-template-columns: 1fr;
  }

  .sidebar-left {
    background: var(--bg-surface);
    border-right: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .editor-area {
    background: var(--bg-base);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .sidebar-right {
    background: var(--bg-surface);
    border-left: 1px solid var(--border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>
