<!--
  ActivityBar.svelte — 48px vertical icon strip (VS Code style).
  Explorer, Search, Source Control, Settings.
-->

<script lang="ts">
  import { store, type ActivityView } from '../stores/app.svelte.ts';

  const items: { id: ActivityView; label: string; icon: string }[] = [
    { id: 'explorer', label: 'Explorer', icon: 'files' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'source-control', label: 'Source Control', icon: 'git' },
    { id: 'settings', label: 'Settings', icon: 'gear' },
  ];

  function handleClick(id: ActivityView) {
    if (store.activityView === id && store.leftSidebarOpen) {
      store.leftSidebarOpen = false;
    } else {
      store.activityView = id;
      store.leftSidebarOpen = true;
    }
  }
</script>

<nav class="activity-bar">
  <div class="activity-icons">
    {#each items as item}
      <button
        class="activity-btn"
        class:active={store.activityView === item.id && store.leftSidebarOpen}
        onclick={() => handleClick(item.id)}
        title={item.label}
      >
        {#if item.icon === 'files'}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 4h6l2 2h10v14H3V4z"/>
            <path d="M3 10h18"/>
          </svg>
        {:else if item.icon === 'search'}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="10.5" cy="10.5" r="6.5"/>
            <path d="M15.5 15.5L21 21"/>
          </svg>
        {:else if item.icon === 'git'}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="6" r="2.5"/>
            <circle cx="12" cy="18" r="2.5"/>
            <circle cx="18" cy="12" r="2.5"/>
            <path d="M12 8.5v7M14.5 12H15.5"/>
          </svg>
        {:else if item.icon === 'gear'}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        {/if}
      </button>
    {/each}
  </div>
</nav>

<style>
  .activity-bar {
    width: 48px;
    background: var(--bg-surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .activity-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4px;
  }

  .activity-btn {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    border-left: 2px solid transparent;
    transition: color 0.15s;
  }

  .activity-btn:hover {
    color: var(--text-primary);
  }

  .activity-btn.active {
    color: var(--text-primary);
    border-left-color: var(--accent);
  }
</style>
