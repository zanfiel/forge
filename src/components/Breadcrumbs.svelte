<!--
  Breadcrumbs.svelte -- File path breadcrumb navigation above editor
-->

<script lang="ts">
  interface Props {
    filePath: string;
    projectDir: string;
    onNavigate?: (path: string, line?: number) => void;
  }

  let { filePath, projectDir, onNavigate }: Props = $props();

  let segments = $derived.by(() => {
    let rel = filePath;
    if (projectDir && filePath.startsWith(projectDir)) {
      rel = filePath.slice(projectDir.length);
    }
    // Normalize separators and split
    const parts = rel.replace(/\\/g, '/').replace(/^\//, '').split('/');
    return parts;
  });
</script>

<div class="breadcrumbs">
  {#each segments as segment, i}
    {#if i > 0}
      <span class="separator">/</span>
    {/if}
    <span
      class="crumb"
      class:current={i === segments.length - 1}
    >{segment}</span>
  {/each}
</div>

<style>
  .breadcrumbs {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    font-size: 12px;
    font-family: var(--font-sans);
    color: var(--text-muted);
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    white-space: nowrap;
    flex-shrink: 0;
    min-height: 24px;
    gap: 2px;
  }

  .separator {
    color: var(--text-muted);
    opacity: 0.4;
    font-size: 11px;
    margin: 0 1px;
  }

  .crumb {
    padding: 1px 4px;
    border-radius: 3px;
    cursor: default;
    transition: all 0.1s;
  }

  .crumb:hover:not(.current) {
    background: var(--bg-hover);
    color: var(--text-secondary);
  }

  .crumb.current {
    color: var(--text-primary);
    font-weight: 500;
  }
</style>
