<!--
  CommandPalette.svelte — VS Code-style Command Palette
  Ctrl+Shift+P: command mode, Ctrl+P: file mode, Ctrl+G: goto line
-->

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { store, type FileEntry } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';

  interface Props {
    onClose: () => void;
    mode?: 'command' | 'file' | 'goto';
    onOpenFile?: (path: string) => void;
    onCommand?: (command: string) => void;
  }

  let { onClose, mode = 'command', onOpenFile, onCommand }: Props = $props();

  // ─── State ─────────────────────────────────

  let inputEl: HTMLInputElement;
  let query = $state(mode === 'command' ? '>' : mode === 'goto' ? ':' : '');
  let activeIndex = $state(0);
  let listEl: HTMLDivElement;
  let visible = $state(false);

  // ─── Commands ──────────────────────────────

  interface Command {
    id: string;
    label: string;
    shortcut?: string;
    category?: string;
  }

  const commands: Command[] = [
    { id: 'toggle-file-tree', label: 'Toggle File Tree', shortcut: 'Ctrl+B', category: 'View' },
    { id: 'toggle-terminal', label: 'Toggle Terminal', shortcut: 'Ctrl+`', category: 'View' },
    { id: 'toggle-chat', label: 'Toggle Chat Panel', shortcut: 'Ctrl+L', category: 'View' },
    { id: 'toggle-search', label: 'Toggle Search Panel', shortcut: 'Ctrl+Shift+F', category: 'View' },
    { id: 'mode-chat', label: 'Switch to Chat Mode', category: 'Mode' },
    { id: 'mode-instructor', label: 'Switch to Instructor Mode', category: 'Mode' },
    { id: 'open-folder', label: 'Open Folder', shortcut: 'Ctrl+O', category: 'File' },
    { id: 'save-file', label: 'Save File', shortcut: 'Ctrl+S', category: 'File' },
    { id: 'close-tab', label: 'Close Tab', shortcut: 'Ctrl+W', category: 'File' },
    { id: 'close-all-tabs', label: 'Close All Tabs', category: 'File' },
    { id: 'reopen-closed-tab', label: 'Reopen Closed Tab', shortcut: 'Ctrl+Shift+T', category: 'File' },
    { id: 'goto-line', label: 'Go to Line', shortcut: 'Ctrl+G', category: 'Navigate' },
    { id: 'find-in-file', label: 'Find in File', shortcut: 'Ctrl+F', category: 'Edit' },
    { id: 'find-in-project', label: 'Find in Files', shortcut: 'Ctrl+Shift+F', category: 'Edit' },
    { id: 'replace-in-file', label: 'Replace in File', shortcut: 'Ctrl+H', category: 'Edit' },
    { id: 'new-file', label: 'New File', category: 'File' },
    { id: 'format-document', label: 'Format Document', category: 'Edit' },
    { id: 'toggle-word-wrap', label: 'Toggle Word Wrap', category: 'Editor' },
    { id: 'toggle-minimap', label: 'Toggle Minimap', category: 'Editor' },
    { id: 'change-theme', label: 'Change Theme', category: 'Preferences' },
    { id: 'zoom-in', label: 'Zoom In (Increase Font Size)', category: 'View' },
    { id: 'zoom-out', label: 'Zoom Out (Decrease Font Size)', category: 'View' },
  ];

  // ─── Derived Mode ─────────────────────────

  let currentMode = $derived<'command' | 'file' | 'goto'>(
    query.startsWith('>') ? 'command' :
    query.startsWith(':') ? 'goto' :
    'file'
  );

  let searchTerm = $derived(
    currentMode === 'command' ? query.slice(1).trim() :
    currentMode === 'goto' ? query.slice(1).trim() :
    query.trim()
  );

  // ─── File Flattening ──────────────────────

  interface FlatFile {
    name: string;
    path: string;
    relativePath: string;
  }

  function flattenTree(entries: FileEntry[], base = ''): FlatFile[] {
    const result: FlatFile[] = [];
    for (const entry of entries) {
      const rel = base ? `${base}/${entry.name}` : entry.name;
      if (entry.type === 'file') {
        result.push({ name: entry.name, path: entry.path, relativePath: rel });
      }
      if (entry.children) {
        result.push(...flattenTree(entry.children, rel));
      }
    }
    return result;
  }

  let allFiles = $derived(flattenTree(store.fileTree));

  // ─── Fuzzy Match ──────────────────────────

  interface MatchResult {
    score: number;
    indices: number[];
  }

  function fuzzyMatch(text: string, pattern: string): MatchResult | null {
    if (!pattern) return { score: 0, indices: [] };

    const lower = text.toLowerCase();
    const pat = pattern.toLowerCase();
    const indices: number[] = [];
    let score = 0;
    let pi = 0;
    let lastMatchIdx = -1;

    for (let i = 0; i < lower.length && pi < pat.length; i++) {
      if (lower[i] === pat[pi]) {
        indices.push(i);
        // Bonus for consecutive matches
        if (lastMatchIdx === i - 1) score += 5;
        // Bonus for matching at start or after separator
        if (i === 0 || lower[i - 1] === '/' || lower[i - 1] === '\\' || lower[i - 1] === '.' || lower[i - 1] === '-' || lower[i - 1] === '_') {
          score += 10;
        }
        // Bonus for case match
        if (text[i] === pattern[pi]) score += 1;
        score += 1;
        lastMatchIdx = i;
        pi++;
      }
    }

    if (pi < pat.length) return null;
    // Penalize longer strings
    score -= text.length * 0.1;
    return { score, indices };
  }

  // ─── Filtered Results ─────────────────────

  interface ResultItem {
    type: 'command' | 'file';
    id: string;
    label: string;
    detail?: string;
    shortcut?: string;
    matchIndices: number[];
    score: number;
  }

  let filteredResults = $derived.by((): ResultItem[] => {
    if (currentMode === 'goto') return [];

    if (currentMode === 'command') {
      const results: ResultItem[] = [];
      for (const cmd of commands) {
        const match = fuzzyMatch(cmd.label, searchTerm);
        if (match) {
          results.push({
            type: 'command',
            id: cmd.id,
            label: cmd.label,
            detail: cmd.category,
            shortcut: cmd.shortcut,
            matchIndices: match.indices,
            score: match.score,
          });
        }
      }
      results.sort((a, b) => b.score - a.score);
      return results;
    }

    // File mode
    const results: ResultItem[] = [];
    for (const file of allFiles) {
      const nameMatch = fuzzyMatch(file.name, searchTerm);
      const pathMatch = fuzzyMatch(file.relativePath, searchTerm);
      const best = (nameMatch && pathMatch)
        ? (nameMatch.score >= pathMatch.score ? nameMatch : pathMatch)
        : (nameMatch || pathMatch);

      if (best) {
        // Use name indices if name matched, otherwise recalculate for display
        const displayMatch = fuzzyMatch(file.name, searchTerm);
        results.push({
          type: 'file',
          id: file.path,
          label: file.name,
          detail: file.relativePath,
          matchIndices: displayMatch?.indices ?? [],
          score: best.score,
        });
      }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 50);
  });

  // ─── Keep activeIndex in bounds ───────────

  $effect(() => {
    const len = filteredResults.length;
    if (len > 0 && activeIndex >= len) {
      activeIndex = len - 1;
    }
  });

  // ─── Goto Mode Helper ─────────────────────

  let gotoLineNumber = $derived(
    currentMode === 'goto' ? parseInt(searchTerm, 10) : NaN
  );

  let gotoValid = $derived(!isNaN(gotoLineNumber) && gotoLineNumber > 0);

  // ─── Keyboard Navigation ──────────────────

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        onClose();
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (currentMode !== 'goto' && filteredResults.length > 0) {
          activeIndex = (activeIndex + 1) % filteredResults.length;
          scrollActiveIntoView();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (currentMode !== 'goto' && filteredResults.length > 0) {
          activeIndex = (activeIndex - 1 + filteredResults.length) % filteredResults.length;
          scrollActiveIntoView();
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (currentMode === 'goto') {
          if (gotoValid) executeGoto(gotoLineNumber);
        } else if (filteredResults.length > 0) {
          executeItem(filteredResults[activeIndex]);
        }
        break;
    }
  }

  function scrollActiveIntoView() {
    tick().then(() => {
      const el = listEl?.querySelector('.result-item.active');
      el?.scrollIntoView({ block: 'nearest' });
    });
  }

  // ─── Execution ────────────────────────────

  function executeItem(item: ResultItem) {
    if (item.type === 'file') {
      onOpenFile?.(item.id);
      onClose();
    } else {
      onCommand?.(item.id);
      onClose();
    }
  }

  function executeGoto(line: number) {
    onCommand?.(`goto-line:${line}`);
    onClose();
  }

  // ─── Highlight Matched Characters ─────────

  function highlightMatch(text: string, indices: number[]): string {
    if (!indices.length) return escapeHtml(text);
    const set = new Set(indices);
    let html = '';
    for (let i = 0; i < text.length; i++) {
      const ch = escapeHtml(text[i]);
      if (set.has(i)) {
        html += `<span class="match-char">${ch}</span>`;
      } else {
        html += ch;
      }
    }
    return html;
  }

  function escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ─── Mount ────────────────────────────────

  onMount(() => {
    requestAnimationFrame(() => {
      visible = true;
      inputEl?.focus();
      // Place cursor after prefix
      if (inputEl) {
        inputEl.selectionStart = inputEl.selectionEnd = query.length;
      }
    });
  });

  // Reset activeIndex on query change
  $effect(() => {
    const _ = query;
    activeIndex = 0;
  });

  // ─── Backdrop Click ───────────────────────

  function handleBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('palette-backdrop')) {
      onClose();
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="palette-backdrop"
  class:visible
  onmousedown={handleBackdropClick}
  onkeydown={handleKeydown}
>
  <div class="palette-container" class:visible>
    <div class="palette-input-row">
      {#if currentMode === 'command'}
        <span class="mode-badge">CMD</span>
      {:else if currentMode === 'goto'}
        <span class="mode-badge goto">LINE</span>
      {:else}
        <span class="mode-badge file">FILE</span>
      {/if}
      <input
        bind:this={inputEl}
        bind:value={query}
        type="text"
        class="palette-input"
        placeholder={
          currentMode === 'command' ? 'Type a command...' :
          currentMode === 'goto' ? 'Type a line number...' :
          'Search files by name...'
        }
        spellcheck="false"
        autocomplete="off"
      />
    </div>

    {#if currentMode === 'goto'}
      <div class="goto-hint">
        {#if gotoValid}
          <span>Press <kbd>Enter</kbd> to go to line {gotoLineNumber}</span>
        {:else if searchTerm}
          <span class="invalid">Enter a valid line number</span>
        {:else}
          <span>Type a line number to jump to</span>
        {/if}
      </div>
    {:else}
      <div class="results-list" bind:this={listEl}>
        {#if filteredResults.length === 0}
          <div class="no-results">
            {#if searchTerm}
              No matching {currentMode === 'command' ? 'commands' : 'files'} found
            {:else if currentMode === 'file'}
              {allFiles.length === 0 ? 'No project open' : 'Type to search files...'}
            {:else}
              Type to filter commands...
            {/if}
          </div>
        {:else}
          {#each filteredResults as item, i}
            <button
              class="result-item"
              class:active={i === activeIndex}
              onmouseenter={() => activeIndex = i}
              onclick={() => executeItem(item)}
            >
              <span class="result-icon">
                {#if item.type === 'file'}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13 4H8.414L6.707 2.293A1 1 0 006 2H3a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1z" opacity="0.6"/>
                  </svg>
                {:else}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1L1 5l7 4 7-4-7-4zM1 8l7 4 7-4M1 11l7 4 7-4" stroke="currentColor" fill="none" stroke-width="1.2" stroke-linejoin="round"/>
                  </svg>
                {/if}
              </span>
              <span class="result-label">{@html highlightMatch(item.label, item.matchIndices)}</span>
              {#if item.detail}
                <span class="result-detail">
                  {#if item.type === 'file'}
                    {item.detail}
                  {:else}
                    {item.detail}
                  {/if}
                </span>
              {/if}
              {#if item.shortcut}
                <kbd class="result-shortcut">{item.shortcut}</kbd>
              {/if}
            </button>
          {/each}
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .palette-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    padding-top: 15vh;
    background: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
    opacity: 0;
    transition: all 0.15s ease-out;
  }

  .palette-backdrop.visible {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    opacity: 1;
  }

  .palette-container {
    width: 560px;
    max-height: 420px;
    background: var(--bg-surface);
    border: 1px solid var(--border-bright);
    border-radius: var(--radius-lg);
    box-shadow:
      0 0 0 1px rgba(124, 92, 252, 0.08),
      0 16px 48px rgba(0, 0, 0, 0.6),
      0 4px 12px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateY(-8px) scale(0.98);
    opacity: 0;
    transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .palette-container.visible {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  .palette-input-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
  }

  .mode-badge {
    font-size: 10px;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    background: var(--accent-dim);
    color: var(--accent);
    flex-shrink: 0;
    user-select: none;
  }

  .mode-badge.goto {
    background: rgba(251, 191, 36, 0.12);
    color: var(--yellow);
  }

  .mode-badge.file {
    background: rgba(96, 165, 250, 0.12);
    color: var(--blue);
  }

  .palette-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 14px;
    caret-color: var(--accent);
  }

  .palette-input::placeholder {
    color: var(--text-muted);
  }

  .results-list {
    overflow-y: auto;
    max-height: 360px;
    padding: 4px;
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 10px;
    border-radius: var(--radius);
    color: var(--text-secondary);
    font-size: 13px;
    text-align: left;
    transition: background 0.06s, color 0.06s;
    cursor: pointer;
  }

  .result-item:hover,
  .result-item.active {
    background: var(--bg-hover);
    color: var(--text-primary);
  }

  .result-item.active {
    background: var(--accent-dim);
    color: var(--text-primary);
  }

  .result-icon {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
  }

  .result-item.active .result-icon {
    color: var(--accent);
  }

  .result-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.match-char) {
    color: var(--accent-hover);
    font-weight: 600;
  }

  .result-detail {
    font-size: 11px;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
    flex-shrink: 1;
  }

  .result-shortcut {
    flex-shrink: 0;
    padding: 2px 6px;
    font-family: var(--font-mono);
    font-size: 10px;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-muted);
  }

  .result-item.active .result-shortcut {
    border-color: var(--border-bright);
    color: var(--text-secondary);
  }

  .no-results {
    padding: 24px 16px;
    text-align: center;
    color: var(--text-muted);
    font-size: 13px;
  }

  .goto-hint {
    padding: 24px 16px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 13px;
  }

  .goto-hint kbd {
    padding: 2px 6px;
    background: var(--bg-raised);
    border: 1px solid var(--border-bright);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 11px;
  }

  .goto-hint .invalid {
    color: var(--red);
  }
</style>
