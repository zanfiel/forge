<!--
  App.svelte — Root Layout
  Desktop-only Tauri workspace.
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import TitleBar from './components/TitleBar.svelte';
  import FileTree from './components/FileTree.svelte';
  import Editor from './components/Editor.svelte';
  import ChatPanel from './components/ChatPanel.svelte';
  import InstructorPanel from './components/InstructorPanel.svelte';
  import WelcomeScreen from './components/WelcomeScreen.svelte';
  import Terminal from './components/Terminal.svelte';
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

  // Ctrl+` to toggle terminal
  function handleKeydown(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      store.panels.terminal = !store.panels.terminal;
    }
  }

  let hasProject = $derived(store.projectDir !== '');
  let showWorkspace = $derived(hasProject || store.rightPanel === 'instructor');

  let editorComponent: Editor;
</script>

<svelte:window onkeydown={handleKeydown} />

<TitleBar hasProject={showWorkspace} onOpenProject={openProject} />

{#if showWorkspace}
    <div class="workspace"
         class:no-tree={!store.panels.fileTree || !hasProject}
         class:no-chat={!store.panels.chat}>
      
      {#if store.panels.fileTree && hasProject}
        <aside class="sidebar-left">
          <FileTree />
        </aside>
      {/if}

      <main class="editor-area">
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
    display: grid;
    grid-template-columns: 260px 1fr 380px;
    height: calc(100vh - 38px);
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
