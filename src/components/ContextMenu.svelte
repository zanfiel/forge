<!--
  ContextMenu.svelte - Right-click context menu
  Reusable context menu positioned at cursor location.
-->

<script lang="ts">
  import { onMount, tick } from 'svelte';

  export interface MenuItem {
    label: string;
    icon?: string;
    shortcut?: string;
    action: () => void;
    separator?: boolean;
    disabled?: boolean;
  }

  interface Props {
    x: number;
    y: number;
    items: MenuItem[];
    onClose: () => void;
  }

  let { x, y, items, onClose }: Props = $props();
  let menuEl: HTMLDivElement;
  let adjustedX = $state(x);
  let adjustedY = $state(y);

  onMount(async () => {
    await tick();
    if (!menuEl) return;

    const rect = menuEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Keep menu within viewport
    adjustedX = x + rect.width > vw ? vw - rect.width - 4 : x;
    adjustedY = y + rect.height > vh ? vh - rect.height - 4 : y;
  });

  function handleClick(item: MenuItem) {
    if (item.disabled) return;
    item.action();
    onClose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window onclick={onClose} onkeydown={handleKeydown} />

<div
  class="context-menu"
  bind:this={menuEl}
  style="left: {adjustedX}px; top: {adjustedY}px"
  onclick={(e: MouseEvent) => e.stopPropagation()}
  oncontextmenu={(e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); }}
  role="menu"
>
  {#each items as item}
    {#if item.separator}
      <div class="separator"></div>
    {:else}
      <button
        class="menu-item"
        class:disabled={item.disabled}
        onclick={() => handleClick(item)}
        role="menuitem"
      >
        <span class="menu-icon">{item.icon || ''}</span>
        <span class="menu-label">{item.label}</span>
        {#if item.shortcut}
          <span class="menu-shortcut">{item.shortcut}</span>
        {/if}
      </button>
    {/if}
  {/each}
</div>

<style>
  .context-menu {
    position: fixed;
    z-index: 10000;
    min-width: 180px;
    max-width: 280px;
    padding: 4px;
    background: var(--bg-raised);
    border: 1px solid var(--border-bright);
    border-radius: 6px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    animation: menu-in 0.1s ease-out;
  }

  @keyframes menu-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 5px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: var(--text-primary);
    text-align: left;
    transition: background 0.08s;
  }

  .menu-item:hover:not(.disabled) {
    background: var(--accent);
    color: white;
  }
  .menu-item:hover:not(.disabled) .menu-shortcut {
    color: rgba(255, 255, 255, 0.6);
  }

  .menu-item.disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .menu-icon {
    width: 18px;
    text-align: center;
    font-size: 13px;
    flex-shrink: 0;
  }

  .menu-label { flex: 1; }

  .menu-shortcut {
    font-size: 10px;
    color: var(--text-muted);
    font-family: var(--font-mono);
    margin-left: auto;
  }

  .separator {
    height: 1px;
    margin: 4px 8px;
    background: var(--border);
  }
</style>
