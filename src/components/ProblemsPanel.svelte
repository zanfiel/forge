<!--
  ProblemsPanel.svelte — Monaco diagnostics grouped by file.
  Shell component for Phase 1; will wire to Monaco markers later.
-->

<script lang="ts">
  import { store } from '../stores/app.svelte.ts';

  interface GroupedProblems {
    file: string;
    items: typeof store.problems;
  }

  let grouped = $derived.by(() => {
    const map = new Map<string, typeof store.problems>();
    for (const p of store.problems) {
      const list = map.get(p.file) || [];
      list.push(p);
      map.set(p.file, list);
    }
    const result: GroupedProblems[] = [];
    for (const [file, items] of map) {
      result.push({ file, items });
    }
    return result;
  });

  let errorCount = $derived(store.problems.filter(p => p.severity === 'error').length);
  let warnCount = $derived(store.problems.filter(p => p.severity === 'warning').length);
</script>

<div class="problems-panel">
  {#if store.problems.length === 0}
    <div class="empty">No problems detected</div>
  {:else}
    <div class="summary">
      {#if errorCount > 0}<span class="badge error">{errorCount} error{errorCount !== 1 ? 's' : ''}</span>{/if}
      {#if warnCount > 0}<span class="badge warn">{warnCount} warning{warnCount !== 1 ? 's' : ''}</span>{/if}
    </div>
    {#each grouped as group}
      <div class="file-group">
        <div class="file-name">{group.file}</div>
        {#each group.items as problem}
          <div class="problem-row {problem.severity}">
            <span class="icon">
              {#if problem.severity === 'error'}🔴{:else if problem.severity === 'warning'}🟡{:else}🔵{/if}
            </span>
            <span class="message">{problem.message}</span>
            <span class="location">[{problem.line}:{problem.col}]</span>
          </div>
        {/each}
      </div>
    {/each}
  {/if}
</div>

<style>
  .problems-panel {
    height: 100%;
    overflow-y: auto;
    padding: 8px 12px;
    font-size: 12px;
  }

  .empty {
    color: var(--text-muted);
    padding: 16px 0;
    text-align: center;
  }

  .summary {
    display: flex;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 6px;
  }

  .badge {
    font-size: 11px;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 8px;
  }
  .badge.error { background: #f8717133; color: var(--red); }
  .badge.warn { background: #fbbf2433; color: var(--yellow); }

  .file-group {
    margin-bottom: 6px;
  }

  .file-name {
    font-weight: 600;
    color: var(--text-secondary);
    padding: 4px 0 2px;
    font-family: var(--font-mono);
    font-size: 11px;
  }

  .problem-row {
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 2px 0 2px 12px;
    cursor: pointer;
    border-radius: var(--radius-sm);
  }
  .problem-row:hover { background: var(--bg-hover); }

  .icon { font-size: 10px; flex-shrink: 0; }
  .message { flex: 1; color: var(--text-primary); }
  .location {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-muted);
    flex-shrink: 0;
  }
</style>
