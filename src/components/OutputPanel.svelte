<!--
  OutputPanel.svelte — Scrollable log viewer.
  Shell component for Phase 1; will wire to build output later.
-->

<script lang="ts">
  import { store } from '../stores/app.svelte.ts';

  let container: HTMLDivElement;

  // Auto-scroll to bottom when new entries appear
  $effect(() => {
    if (store.outputLog.length && container) {
      container.scrollTop = container.scrollHeight;
    }
  });
</script>

<div class="output-panel" bind:this={container}>
  {#if store.outputLog.length === 0}
    <div class="empty">No output</div>
  {:else}
    {#each store.outputLog as line, i}
      <div class="log-line">
        <span class="line-num">{i + 1}</span>
        <span class="line-text">{line}</span>
      </div>
    {/each}
  {/if}
</div>

<style>
  .output-panel {
    height: 100%;
    overflow-y: auto;
    padding: 4px 0;
    font-family: var(--font-mono);
    font-size: 12px;
  }

  .empty {
    color: var(--text-muted);
    padding: 16px;
    text-align: center;
    font-family: var(--font-sans);
  }

  .log-line {
    display: flex;
    gap: 12px;
    padding: 1px 12px;
    line-height: 1.6;
  }
  .log-line:hover { background: var(--bg-hover); }

  .line-num {
    color: var(--text-muted);
    min-width: 32px;
    text-align: right;
    user-select: none;
    flex-shrink: 0;
  }

  .line-text {
    color: var(--text-primary);
    white-space: pre-wrap;
    word-break: break-all;
  }
</style>
