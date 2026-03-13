<!--
  FileTree.svelte — Project File Browser (Tauri Edition)
  
  Identical to Electron version but uses api.readFile() from Tauri invoke.
-->

<script lang="ts">
  import { store, detectLanguage, type FileEntry, type OpenTab } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';

  async function openFile(entry: FileEntry) {
    const existingIndex = store.openTabs.findIndex(t => t.path === entry.path);
    if (existingIndex !== -1) {
      store.activeTabIndex = existingIndex;
      return;
    }

    const content = await api.readFile(entry.path);
    if (content === null) return;

    const tab: OpenTab = {
      path: entry.path,
      name: entry.name,
      content,
      modified: false,
      language: detectLanguage(entry.name),
    };

    store.openTabs.push(tab);
    store.activeTabIndex = store.openTabs.length - 1;
  }

  let expandedPaths = $state<Set<string>>(new Set());

  function toggleFolder(path: string) {
    if (expandedPaths.has(path)) {
      expandedPaths.delete(path);
    } else {
      expandedPaths.add(path);
    }
    expandedPaths = new Set(expandedPaths);
  }

  function isExpanded(path: string, depth: number): boolean {
    if (depth < 1 && !expandedPaths.has('__init')) return true;
    return expandedPaths.has(path);
  }

  function fileIcon(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const icons: Record<string, string> = {
      ts: '🔷', tsx: '⚛️', js: '🟨', jsx: '⚛️',
      svelte: '🔶', vue: '💚',
      rs: '🦀', go: '🐹', py: '🐍',
      html: '🌐', css: '🎨', scss: '🎨',
      json: '📋', yaml: '📋', yml: '📋', toml: '📋',
      md: '📝', txt: '📄',
      sh: '🖥️', bash: '🖥️',
      sql: '🗄️',
      png: '🖼️', jpg: '🖼️', svg: '🖼️', gif: '🖼️',
      lock: '🔒',
    };
    if (name === 'Dockerfile') return '🐳';
    if (name === '.gitignore') return '🙈';
    if (name === 'Cargo.toml') return '📦';
    if (name === 'package.json') return '📦';
    return icons[ext] || '📄';
  }
</script>

<div class="tree-header">
  <span class="tree-title">EXPLORER</span>
</div>

<div class="tree-scroll">
  {#each store.fileTree as entry}
    {@render treeNode(entry, 0)}
  {/each}
</div>

{#snippet treeNode(entry: FileEntry, depth: number)}
  {#if entry.type === 'directory'}
    {@render folderNode(entry, depth)}
  {:else}
    <button
      class="tree-item file"
      class:active={store.openTabs[store.activeTabIndex]?.path === entry.path}
      style="padding-left: {12 + depth * 16}px"
      onclick={() => openFile(entry)}
    >
      <span class="file-icon">{fileIcon(entry.name)}</span>
      <span class="file-name">{entry.name}</span>
    </button>
  {/if}
{/snippet}

{#snippet folderNode(entry: FileEntry, depth: number)}
  {@const expanded = isExpanded(entry.path, depth)}
  <button
    class="tree-item folder"
    style="padding-left: {12 + depth * 16}px"
    onclick={() => toggleFolder(entry.path)}
  >
    <span class="chevron" class:open={expanded}>▶</span>
    <span class="folder-icon">{expanded ? '📂' : '📁'}</span>
    <span class="folder-name">{entry.name}</span>
  </button>
  {#if expanded && entry.children}
    {#each entry.children as child}
      {@render treeNode(child, depth + 1)}
    {/each}
  {/if}
{/snippet}

<style>
  .tree-header {
    padding: 12px 16px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tree-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    color: var(--text-muted);
  }

  .tree-scroll {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 24px;
  }

  .tree-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    padding-right: 8px;
    gap: 6px;
    border-radius: 0;
    font-size: 13px;
    color: var(--text-secondary);
    transition: all 0.1s;
    text-align: left;
  }

  .tree-item:hover { background: var(--bg-hover); color: var(--text-primary); }
  .tree-item.active { background: var(--accent-dim); color: var(--accent-hover); }

  .chevron {
    font-size: 8px;
    transition: transform 0.15s;
    color: var(--text-muted);
    width: 12px;
    text-align: center;
  }
  .chevron.open { transform: rotate(90deg); }

  .file-icon, .folder-icon {
    font-size: 14px;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
  }

  .file-name, .folder-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .folder-name { font-weight: 500; }
</style>
