<!--
  SearchPanel.svelte -- Project-wide file search (Ctrl+Shift+F)
  Searches file contents across the project directory.
-->

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { store, type SearchMatch } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';

  interface Props {
    onOpenFile?: (path: string, line?: number) => void;
  }

  let { onOpenFile }: Props = $props();

  let inputEl: HTMLInputElement;
  let abortController: AbortController | null = null;

  onMount(() => {
    tick().then(() => inputEl?.focus());
  });

  async function doSearch() {
    const query = store.search.query.trim();
    if (!query || !store.projectDir) return;

    // Cancel previous search
    abortController?.abort();
    abortController = new AbortController();

    store.search.isSearching = true;
    store.search.results = [];
    store.search.totalMatches = 0;
    store.search.totalFiles = 0;

    try {
      const results = await api.searchFiles(
        store.projectDir,
        query,
        store.search.caseSensitive,
        store.search.useRegex,
        store.search.includePattern,
        store.search.excludePattern,
      );

      if (results) {
        store.search.results = results.matches || [];
        store.search.totalMatches = results.totalMatches || store.search.results.length;
        store.search.totalFiles = results.totalFiles || 0;
      }
    } catch (e) {
      // Search cancelled or failed
    } finally {
      store.search.isSearching = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      doSearch();
    }
  }

  function openResult(match: SearchMatch) {
    onOpenFile?.(match.file, match.line);
  }

  function relativePath(fullPath: string): string {
    if (store.projectDir && fullPath.startsWith(store.projectDir)) {
      return fullPath.slice(store.projectDir.length).replace(/^[\\/]/, '');
    }
    return fullPath;
  }

  // Group results by file
  let groupedResults = $derived.by(() => {
    const groups = new Map<string, SearchMatch[]>();
    for (const match of store.search.results) {
      const key = match.file;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(match);
    }
    return groups;
  });

  function highlightLine(text: string, query: string, caseSensitive: boolean): string {
    if (!query) return escHtml(text);
    const flags = caseSensitive ? 'g' : 'gi';
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      return text.replace(new RegExp(`(${escaped})`, flags), '<mark>$1</mark>');
    } catch {
      return escHtml(text);
    }
  }

  function escHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
</script>

<div class="search-panel">
  <div class="search-header">
    <span class="search-title">SEARCH</span>
  </div>

  <div class="search-input-area">
    <div class="search-input-row">
      <input
        bind:this={inputEl}
        bind:value={store.search.query}
        onkeydown={handleKeydown}
        type="text"
        class="search-input"
        placeholder="Search files..."
        spellcheck="false"
      />
      <button class="search-go" onclick={doSearch} title="Search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7"/><path d="M21 21L16.5 16.5"/>
        </svg>
      </button>
    </div>

    <div class="search-options">
      <button
        class="option-btn"
        class:active={store.search.caseSensitive}
        onclick={() => store.search.caseSensitive = !store.search.caseSensitive}
        title="Match Case"
      >Aa</button>
      <button
        class="option-btn"
        class:active={store.search.useRegex}
        onclick={() => store.search.useRegex = !store.search.useRegex}
        title="Use Regular Expression"
      >.*</button>
    </div>

    <input
      bind:value={store.search.includePattern}
      type="text"
      class="search-filter"
      placeholder="files to include (e.g. *.ts, src/**)"
      spellcheck="false"
    />
    <input
      bind:value={store.search.excludePattern}
      type="text"
      class="search-filter"
      placeholder="files to exclude"
      spellcheck="false"
    />
  </div>

  <div class="search-results">
    {#if store.search.isSearching}
      <div class="search-status">Searching...</div>
    {:else if store.search.totalMatches > 0}
      <div class="search-status">
        {store.search.totalMatches} results in {store.search.totalFiles} files
      </div>
      {#each [...groupedResults] as [file, matches]}
        <div class="result-group">
          <div class="result-file">
            <span class="file-icon">📄</span>
            <span class="file-path" title={file}>{relativePath(file)}</span>
            <span class="match-count">{matches.length}</span>
          </div>
          {#each matches as match}
            <button class="result-line" onclick={() => openResult(match)}>
              <span class="line-num">{match.line}</span>
              <span class="line-content">{@html highlightLine(match.lineContent, store.search.query, store.search.caseSensitive)}</span>
            </button>
          {/each}
        </div>
      {/each}
    {:else if store.search.query && !store.search.isSearching}
      <div class="search-status muted">No results found</div>
    {:else}
      <div class="search-status muted">Type to search across files</div>
    {/if}
  </div>
</div>



<style>
  .search-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .search-header {
    padding: 12px 16px 8px;
  }

  .search-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--text-muted);
  }

  .search-input-area {
    padding: 0 10px 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-shrink: 0;
  }

  .search-input-row {
    display: flex;
    gap: 4px;
  }

  .search-input {
    flex: 1;
    padding: 6px 8px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-primary);
    font-size: 12px;
    font-family: var(--font-sans);
    outline: none;
  }
  .search-input:focus { border-color: var(--accent); }

  .search-go {
    padding: 4px 8px;
    background: var(--accent-dim);
    border-radius: 4px;
    color: var(--accent);
    display: flex;
    align-items: center;
  }
  .search-go:hover { background: var(--accent); color: white; }

  .search-options {
    display: flex;
    gap: 2px;
  }

  .option-btn {
    padding: 2px 8px;
    font-size: 11px;
    font-family: var(--font-mono);
    border-radius: 3px;
    color: var(--text-muted);
    background: var(--bg-base);
    border: 1px solid var(--border);
  }
  .option-btn:hover { color: var(--text-primary); }
  .option-btn.active {
    background: var(--accent-dim);
    color: var(--accent);
    border-color: var(--accent);
  }

  .search-filter {
    padding: 4px 8px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-secondary);
    font-size: 11px;
    font-family: var(--font-sans);
    outline: none;
  }
  .search-filter:focus { border-color: var(--accent); }

  .search-results {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 16px;
  }

  .search-status {
    padding: 6px 16px;
    font-size: 11px;
    color: var(--text-secondary);
  }
  .search-status.muted { color: var(--text-muted); }

  .result-group {
    margin-bottom: 2px;
  }

  .result-file {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    font-size: 12px;
    color: var(--text-primary);
    font-weight: 500;
  }

  .file-icon { font-size: 12px; }
  .file-path {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .match-count {
    font-size: 10px;
    padding: 0 5px;
    background: var(--accent-dim);
    color: var(--accent);
    border-radius: 8px;
    font-weight: 600;
  }

  .result-line {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 2px 12px 2px 28px;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-secondary);
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
  }
  .result-line:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }

  .line-num {
    color: var(--text-muted);
    min-width: 28px;
    text-align: right;
    flex-shrink: 0;
    font-size: 11px;
  }

  .line-content {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :global(.search-results mark) {
    background: rgba(251, 191, 36, 0.3);
    color: var(--text-primary);
    border-radius: 2px;
    padding: 0 1px;
  }
</style>
