<!--
  FileTree.svelte — Project File Browser
  
  Shows the folder structure as an expandable tree.
  Click a file to open it in the editor.
  
  This is a RECURSIVE component — a folder can contain folders,
  which contain folders, etc. The TreeNode renders itself for children.
-->

<script lang="ts">
  import { store, detectLanguage, type FileEntry, type OpenTab } from '../stores/app.svelte.ts';

  /** Open a file in the editor */
  async function openFile(entry: FileEntry) {
    const existingIndex = store.openTabs.findIndex(t => t.path === entry.path);
    if (existingIndex !== -1) {
      store.activeTabIndex = existingIndex;
      return;
    }

    const content = await window.api.readFile(entry.path);
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

  /** Track which folders are expanded */
  let expandedPaths = $state<Set<string>>(new Set());

  function toggleFolder(path: string) {
    if (expandedPaths.has(path)) {
      expandedPaths.delete(path);
    } else {
      expandedPaths.add(path);
    }
    // Trigger reactivity by reassigning
    expandedPaths = new Set(expandedPaths);
  }

  function isExpanded(path: string, depth: number): boolean {
    // Auto-expand first level
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

<!-- Search bar at top -->
<div class="tree-header">
  <span class="tree-title">EXPLORER</span>
</div>

<!-- File tree -->
<div class="tree-scroll">
  {#each store.fileTree as entry}
    {@render treeNode(entry, 0)}
  {/each}
</div>

<!-- 
  Svelte 5 snippet — a reusable template block.
  This calls itself recursively for directories.
-->
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

  .tree-item:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
  }

  .tree-item.active {
    background: var(--accent-dim);
    color: var(--accent-hover);
  }

  .chevron {
    font-size: 8px;
    transition: transform 0.15s;
    color: var(--text-muted);
    width: 12px;
    text-align: center;
  }
  .chevron.open {
    transform: rotate(90deg);
  }

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

  .folder-name {
    font-weight: 500;
  }
</style>
