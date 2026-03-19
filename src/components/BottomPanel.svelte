<!--
  BottomPanel.svelte — Tabbed area below the editor.
  Contains Terminal, Problems, and Output tabs.
-->

<script lang="ts">
  import { store, type BottomPanelTab } from '../stores/app.svelte.ts';
  import Terminal from './Terminal.svelte';
  import ProblemsPanel from './ProblemsPanel.svelte';
  import OutputPanel from './OutputPanel.svelte';

  const tabs: { id: BottomPanelTab; label: string }[] = [
    { id: 'terminal', label: 'Terminal' },
    { id: 'problems', label: 'Problems' },
    { id: 'output', label: 'Output' },
  ];

  let problemCount = $derived(store.problems.length);
</script>

<div class="bottom-panel">
  <div class="tab-bar">
    <div class="tabs">
      {#each tabs as tab}
        <button
          class="tab"
          class:active={store.bottomPanelTab === tab.id}
          onclick={() => store.bottomPanelTab = tab.id}
        >
          {tab.label}
          {#if tab.id === 'problems' && problemCount > 0}
            <span class="tab-badge">{problemCount}</span>
          {/if}
        </button>
      {/each}
    </div>
    <div class="tab-actions">
      <button
        class="action-btn"
        onclick={() => store.bottomPanelOpen = false}
        title="Close Panel"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
      </button>
    </div>
  </div>

  <div class="tab-content">
    {#if store.bottomPanelTab === 'terminal'}
      <Terminal />
    {:else if store.bottomPanelTab === 'problems'}
      <ProblemsPanel />
    {:else}
      <OutputPanel />
    {/if}
  </div>
</div>

<style>
  .bottom-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg-surface);
    overflow: hidden;
  }

  .tab-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    height: 35px;
    padding: 0 8px;
  }

  .tabs {
    display: flex;
    gap: 0;
    height: 100%;
  }

  .tab {
    padding: 0 12px;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: var(--text-muted);
    border-bottom: 2px solid transparent;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.15s;
  }
  .tab:hover { color: var(--text-secondary); }
  .tab.active {
    color: var(--text-primary);
    border-bottom-color: var(--accent);
  }

  .tab-badge {
    font-size: 10px;
    font-weight: 600;
    background: var(--accent-dim);
    color: var(--accent);
    padding: 0 5px;
    border-radius: 8px;
    min-width: 16px;
    text-align: center;
  }

  .tab-actions {
    display: flex;
    align-items: center;
  }

  .action-btn {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    transition: all 0.1s;
  }
  .action-btn:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }

  .tab-content {
    flex: 1;
    overflow: hidden;
  }
</style>
