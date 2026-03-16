<!--
  FileTree.svelte -- Project File Browser (Tauri Edition)
  
  Identical to Electron version but uses api.readFile() from Tauri invoke.
-->

<script lang="ts">
  import { store, detectLanguage, type FileEntry, type OpenTab } from '../stores/app.svelte.ts';
  import * as api from '../lib/api';
  import ContextMenu, { type MenuItem } from './ContextMenu.svelte';

  let contextMenu = $state<{ x: number; y: number; items: MenuItem[] } | null>(null);
  let renaming = $state<{ path: string; name: string } | null>(null);
  let creating = $state<{ parentPath: string; type: 'file' | 'folder'; name: string } | null>(null);

  function showContextMenu(e: MouseEvent, entry: FileEntry) {
    e.preventDefault();
    e.stopPropagation();

    const isDir = entry.type === 'directory';
    const items: MenuItem[] = [];

    if (isDir) {
      items.push({ label: 'New File', icon: '+', action: () => startCreate(entry.path, 'file') });
      items.push({ label: 'New Folder', icon: '+', action: () => startCreate(entry.path, 'folder') });
      items.push({ label: '', action: () => {}, separator: true });
    }

    items.push({ label: 'Rename', icon: '', shortcut: 'F2', action: () => startRename(entry) });
    items.push({ label: 'Delete', icon: '', action: () => confirmDelete(entry) });

    if (!isDir) {
      items.push({ label: '', action: () => {}, separator: true });
      items.push({ label: 'Copy Path', icon: '', action: () => { navigator.clipboard.writeText(entry.path); store.notify('info', 'Path copied'); } });
      items.push({ label: 'Copy Relative Path', icon: '', action: () => {
        const rel = entry.path.replace(store.projectDir, '').replace(/^[\\/]/, '');
        navigator.clipboard.writeText(rel);
        store.notify('info', 'Relative path copied');
      }});
    }

    contextMenu = { x: e.clientX, y: e.clientY, items };
  }

  // Also allow context menu on the tree background for new file/folder in root
  function showRootContextMenu(e: MouseEvent) {
    if ((e.target as HTMLElement).closest('.tree-item')) return;
    e.preventDefault();
    contextMenu = {
      x: e.clientX, y: e.clientY,
      items: [
        { label: 'New File', icon: '+', action: () => startCreate(store.projectDir, 'file') },
        { label: 'New Folder', icon: '+', action: () => startCreate(store.projectDir, 'folder') },
      ],
    };
  }

  function startRename(entry: FileEntry) {
    renaming = { path: entry.path, name: entry.name };
  }

  function startCreate(parentPath: string, type: 'file' | 'folder') {
    creating = { parentPath, type, name: '' };
    // Ensure parent folder is expanded
    if (!expandedPaths.has(parentPath)) {
      expandedPaths.add(parentPath);
      expandedPaths = new Set(expandedPaths);
    }
  }

  async function confirmRename(e: KeyboardEvent) {
    if (e.key === 'Escape') { renaming = null; return; }
    if (e.key !== 'Enter' || !renaming) return;

    const newName = (e.target as HTMLInputElement).value.trim();
    if (!newName || newName === renaming.name) { renaming = null; return; }

    // Use both forward and backward slash for cross-platform
    const lastSep = Math.max(renaming.path.lastIndexOf('/'), renaming.path.lastIndexOf('\\'));
    const parentDir = lastSep >= 0 ? renaming.path.substring(0, lastSep) : '';
    const sep = renaming.path.includes('\\') ? '\\' : '/';
    const newPath = parentDir + sep + newName;

    const success = await api.renamePath(renaming.path, newPath);
    if (success) {
      // Update any open tabs referencing the old path
      for (const tab of store.openTabs) {
        if (tab.path === renaming.path || tab.path.startsWith(renaming.path + '/') || tab.path.startsWith(renaming.path + '\\')) {
          tab.path = tab.path.replace(renaming.path, newPath);
          tab.name = tab.path.split(/[\\/]/).pop() || tab.name;
        }
      }
      store.fileTree = await api.readDir(store.projectDir);
      store.notify('success', `Renamed to ${newName}`);
    }
    renaming = null;
  }

  async function confirmCreate(e: KeyboardEvent) {
    if (e.key === 'Escape') { creating = null; return; }
    if (e.key !== 'Enter' || !creating) return;

    const name = (e.target as HTMLInputElement).value.trim();
    if (!name) { creating = null; return; }

    const sep = creating.parentPath.includes('\\') ? '\\' : '/';
    const fullPath = creating.parentPath + sep + name;

    let success: boolean;
    if (creating.type === 'folder') {
      success = await api.createDir(fullPath);
    } else {
      success = await api.writeFile(fullPath, '');
    }

    if (success) {
      store.fileTree = await api.readDir(store.projectDir);
      if (creating.type === 'file') {
        // Open the new file
        const tab: OpenTab = {
          path: fullPath,
          name,
          content: '',
          modified: false,
          language: detectLanguage(name),
        };
        store.openTabs.push(tab);
        store.activeTabIndex = store.openTabs.length - 1;
      }
      store.notify('success', `Created ${name}`);
    }
    creating = null;
  }

  async function confirmDelete(entry: FileEntry) {
    const label = entry.type === 'directory' ? `folder "${entry.name}" and all its contents` : `file "${entry.name}"`;
    if (!confirm(`Delete ${label}?`)) return;

    const success = await api.deletePath(entry.path);
    if (success) {
      // Close any open tabs for deleted files
      store.openTabs = store.openTabs.filter(t =>
        t.path !== entry.path && !t.path.startsWith(entry.path + '/') && !t.path.startsWith(entry.path + '\\')
      );
      if (store.activeTabIndex >= store.openTabs.length) {
        store.activeTabIndex = Math.max(0, store.openTabs.length - 1);
      }
      store.fileTree = await api.readDir(store.projectDir);
      store.notify('info', `Deleted ${entry.name}`);
    }
  }

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
      ts: 'TS', tsx: 'TX', js: 'JS', jsx: 'JX',
      svelte: 'SV', vue: 'VU',
      rs: 'RS', go: 'GO', py: 'PY',
      html: 'HT', css: 'CS', scss: 'SC',
      json: 'JS', yaml: 'YM', yml: 'YM', toml: 'TM',
      md: 'MD', txt: 'TX',
      sh: 'SH', bash: 'SH',
      sql: 'SQ',
      png: 'IM', jpg: 'IM', svg: 'SV', gif: 'IM',
      lock: 'LK',
    };
    return icons[ext] || '--';
  }

  // Filter tree
  let filterQuery = $state('');
</script>

<div class="tree-header">
  <span class="tree-title">EXPLORER</span>
</div>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="tree-scroll" oncontextmenu={showRootContextMenu}>
  {#each store.fileTree as entry}
    {@render treeNode(entry, 0)}
  {/each}

  {#if creating && creating.parentPath === store.projectDir}
    <div class="create-input-row" style="padding-left: 12px">
      <span class="create-icon">{creating.type === 'folder' ? '>' : '~'}</span>
      <!-- svelte-ignore a11y_autofocus -->
      <input
        class="inline-input"
        type="text"
        bind:value={creating.name}
        onkeydown={confirmCreate}
        onblur={() => creating = null}
        autofocus
        placeholder={creating.type === 'folder' ? 'folder name' : 'file name'}
      />
    </div>
  {/if}
</div>

<!-- Context Menu -->
{#if contextMenu}
  <ContextMenu
    x={contextMenu.x}
    y={contextMenu.y}
    items={contextMenu.items}
    onClose={() => contextMenu = null}
  />
{/if}

{#snippet treeNode(entry: FileEntry, depth: number)}
  {#if entry.type === 'directory'}
    {@render folderNode(entry, depth)}
  {:else}
    {#if renaming && renaming.path === entry.path}
      <div class="tree-item file" style="padding-left: {12 + depth * 16}px">
        <!-- svelte-ignore a11y_autofocus -->
        <input
          class="inline-input"
          type="text"
          value={renaming.name}
          onkeydown={confirmRename}
          onblur={() => renaming = null}
          autofocus
        />
      </div>
    {:else}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <button
        class="tree-item file"
        class:active={store.openTabs[store.activeTabIndex]?.path === entry.path}
        class:modified={store.openTabs.some(t => t.path === entry.path && t.modified)}
        style="padding-left: {12 + depth * 16}px"
        onclick={() => openFile(entry)}
        oncontextmenu={(e) => showContextMenu(e, entry)}
      >
        <span class="file-name">{entry.name}</span>
        {#if store.openTabs.some(t => t.path === entry.path && t.modified)}
          <span class="mod-dot">*</span>
        {/if}
      </button>
    {/if}
  {/if}
{/snippet}

{#snippet folderNode(entry: FileEntry, depth: number)}
  {@const expanded = isExpanded(entry.path, depth)}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <button
    class="tree-item folder"
    style="padding-left: {12 + depth * 16}px"
    onclick={() => toggleFolder(entry.path)}
    oncontextmenu={(e) => showContextMenu(e, entry)}
  >
    <span class="chevron" class:open={expanded}>&#9654;</span>
    <span class="folder-name">{entry.name}</span>
  </button>
  {#if expanded && entry.children}
    {#each entry.children as child}
      {@render treeNode(child, depth + 1)}
    {/each}
    {#if creating && creating.parentPath === entry.path}
      <div class="create-input-row" style="padding-left: {12 + (depth + 1) * 16}px">
        <span class="create-icon">{creating.type === 'folder' ? '>' : '~'}</span>
        <!-- svelte-ignore a11y_autofocus -->
        <input
          class="inline-input"
          type="text"
          bind:value={creating.name}
          onkeydown={confirmCreate}
          onblur={() => creating = null}
          autofocus
          placeholder={creating.type === 'folder' ? 'folder name' : 'file name'}
        />
      </div>
    {/if}
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
  .tree-item.modified .file-name { font-style: italic; }

  .mod-dot {
    color: var(--accent);
    font-size: 10px;
    margin-left: auto;
  }

  .chevron {
    font-size: 8px;
    transition: transform 0.15s;
    color: var(--text-muted);
    width: 12px;
    text-align: center;
  }
  .chevron.open { transform: rotate(90deg); }

  .file-name, .folder-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .folder-name { font-weight: 500; }

  .inline-input {
    flex: 1;
    padding: 2px 6px;
    background: var(--bg-base);
    border: 1px solid var(--accent);
    border-radius: 3px;
    color: var(--text-primary);
    font-size: 12px;
    font-family: var(--font-sans);
    outline: none;
  }

  .create-input-row {
    display: flex;
    align-items: center;
    height: 28px;
    gap: 6px;
    padding-right: 8px;
  }

  .create-icon {
    color: var(--text-muted);
    font-size: 12px;
    width: 14px;
    text-align: center;
  }
</style>
