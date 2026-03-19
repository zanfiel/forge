<!--
  TitleBar.svelte - Custom Window Title Bar (Tauri Edition)
  
  Uses data-tauri-drag-region for window dragging instead of -webkit-app-region.
  Window controls use @tauri-apps/api/window.
-->

<script lang="ts">
  import { store } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';

  interface Props {
    hasProject: boolean;
    onOpenProject: () => void;
  }

  let { hasProject, onOpenProject }: Props = $props();
  let maximized = $state(false);

  $effect(() => {
    api.isMaximized().then(v => maximized = v);
  });

  async function handleClose() {
    const unsaved = store.openTabs.filter(t => t.modified);
    if (unsaved.length > 0) {
      const names = unsaved.map(t => t.name).join(", ");
      const confirmed = window.confirm(`You have unsaved changes in: ${names}. Close anyway?`);
      if (!confirmed) return;
    }
    await api.close();
  }

  function togglePanel(panel: 'fileTree' | 'chat' | 'terminal') {
    if (panel === 'fileTree') {
      store.leftSidebarOpen = !store.leftSidebarOpen;
    } else if (panel === 'terminal') {
      store.bottomPanelOpen = !store.bottomPanelOpen;
      if (store.bottomPanelOpen) store.bottomPanelTab = 'terminal';
    } else {
      store.panels[panel] = !store.panels[panel];
    }
  }
</script>

<header class="titlebar" data-tauri-drag-region>
  <div class="titlebar-left">
    <span class="logo">⚡</span>
    <span class="app-name">Forge</span>

    {#if hasProject}
      <div class="divider"></div>
      <button class="tb-btn" onclick={onOpenProject} title="Open Folder">
        📁
      </button>
      <button class="tb-btn" class:active={store.leftSidebarOpen}
              onclick={() => togglePanel('fileTree')} title="Toggle File Tree (Ctrl+B)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1 2h4l1.5 1.5H15v11H1V2zm1 1v10h12V4.5H6.2L4.7 3H2z"/>
        </svg>
      </button>
      <button class="tb-btn" class:active={store.panels.chat}
              onclick={() => togglePanel('chat')} title="Toggle AI Chat (Ctrl+L)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 2h12v9H5l-3 3V2zm1 1v8.3l1.7-1.7.3-.1H13V3H3z"/>
        </svg>
      </button>
      <button class="tb-btn" class:active={store.bottomPanelOpen}
              onclick={() => togglePanel('terminal')} title="Toggle Terminal (Ctrl+`)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 3h12v10H2V3zm1 1v8h10V4H3zm1.5 1.5l2.5 2-2.5 2-.7-.7L5.6 7.5 3.8 6.2l.7-.7zM7 10h3v1H7v-1z"/>
        </svg>
      </button>
    {/if}
  </div>

  <div class="titlebar-center" data-tauri-drag-region></div>

  <div class="titlebar-controls">
    <button class="ctrl-btn" onclick={() => api.minimize()} title="Minimize">
      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8" stroke="currentColor" stroke-width="1.5"/></svg>
    </button>
    <button class="ctrl-btn" onclick={async () => { await api.maximize(); maximized = !maximized; }} title="Maximize">
      {#if maximized}
        <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1.5" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M3.5 3V2a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H9" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
      {:else}
        <svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
      {/if}
    </button>
    <button class="ctrl-btn close" onclick={handleClose} title="Close">
      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>
    </button>
  </div>
</header>

<style>
  .titlebar {
    height: 38px;
    display: flex;
    align-items: center;
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    user-select: none;
    padding: 0 8px;
  }

  .titlebar-left {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .logo { font-size: 16px; margin-right: 4px; }

  .app-name {
    font-weight: 600;
    font-size: 12px;
    color: var(--text-secondary);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .divider {
    width: 1px;
    height: 16px;
    background: var(--border-bright);
    margin: 0 6px;
  }

  .tb-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    transition: all 0.15s;
  }
  .tb-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
  .tb-btn.active { background: var(--accent-dim); color: var(--accent); }

  .titlebar-center { flex: 1; }

  .titlebar-controls { display: flex; }

  .ctrl-btn {
    width: 46px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: background 0.1s;
  }
  .ctrl-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
  .ctrl-btn.close:hover { background: var(--red); color: white; }
</style>
