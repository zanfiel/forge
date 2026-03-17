<!--
  StatusBar.svelte - Bottom status bar like VS Code
  Shows cursor position, language, encoding, line endings, indentation, etc.
-->

<script lang="ts">
  import { store } from '../stores/app.svelte.ts';
  import { getLangMeta } from '../lib/languages';

  interface Props {
    editor?: any;
    onGotoLine?: () => void;
    onChangeLanguage?: () => void;
  }

  let { editor = null, onGotoLine, onChangeLanguage }: Props = $props();

  let line = $state(1);
  let col = $state(1);
  let selected = $state(0);
  let lineCount = $state(0);
  let wordWrap = $state(false);

  $effect(() => {
    if (!editor) return;

    const disposable = editor.onDidChangeCursorPosition((e: any) => {
      line = e.position.lineNumber;
      col = e.position.column;

      const selection = editor.getSelection();
      if (selection && !selection.isEmpty()) {
        const model = editor.getModel();
        if (model) {
          selected = model.getValueInRange(selection).length;
        }
      } else {
        selected = 0;
      }
    });

    const modelDisposable = editor.onDidChangeModel(() => {
      const model = editor.getModel();
      lineCount = model?.getLineCount() ?? 0;
    });

    const contentDisposable = editor.onDidChangeModelContent(() => {
      const model = editor.getModel();
      lineCount = model?.getLineCount() ?? 0;
    });

    // Initial
    const model = editor.getModel();
    lineCount = model?.getLineCount() ?? 0;
    const pos = editor.getPosition();
    if (pos) { line = pos.lineNumber; col = pos.column; }

    return () => {
      disposable.dispose();
      modelDisposable.dispose();
      contentDisposable.dispose();
    };
  });

  let activeTab = $derived(store.activeTab);

  let langDisplay = $derived(() => {
    if (!activeTab) return '';
    const meta = getLangMeta(activeTab.language || 'text');
    return meta.name;
  });

  let tabInfo = $derived(() => {
    return 'Spaces: 2';
  });

  let encoding = $derived(() => 'UTF-8');
  let lineEnding = $derived(() => 'LF');
</script>

{#if activeTab}
  <div class="status-bar">
    <div class="status-left">
      {#if store.git.isRepo}
        <span class="status-item git-branch" title="Git Branch">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:3px">
            <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
            <path d="M18 9a9 9 0 01-9 9"/>
          </svg>
          {store.git.branch || 'HEAD'}
          {#if store.git.ahead > 0}<span class="git-count">+{store.git.ahead}</span>{/if}
          {#if store.git.behind > 0}<span class="git-count">-{store.git.behind}</span>{/if}
          {#if store.git.modified.length + store.git.staged.length + store.git.untracked.length > 0}
            <span class="git-dirty">*</span>
          {/if}
        </span>
      {/if}
      <button class="status-item clickable" onclick={onGotoLine} title="Go to Line">
        Ln {line}, Col {col}
      </button>
      {#if selected > 0}
        <span class="status-item muted">({selected} selected)</span>
      {/if}
      <span class="status-item muted">{lineCount} lines</span>
    </div>

    <div class="status-right">
      <span class="status-item">{tabInfo()}</span>
      <span class="status-item">{encoding()}</span>
      <span class="status-item">{lineEnding()}</span>
      <button class="status-item clickable" onclick={onChangeLanguage} title="Select Language Mode">
        {langDisplay()}
      </button>
      {#if activeTab.modified}
        <span class="status-item modified">Modified</span>
      {/if}
    </div>
  </div>
{:else}
  <div class="status-bar">
    <div class="status-left">
      {#if store.git.isRepo}
        <span class="status-item git-branch">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:3px">
            <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
            <path d="M18 9a9 9 0 01-9 9"/>
          </svg>
          {store.git.branch || 'HEAD'}
        </span>
      {/if}
      <span class="status-item muted">Forge IDE</span>
    </div>
    <div class="status-right"></div>
  </div>
{/if}

<style>
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    background: var(--accent);
    color: white;
    font-size: 11px;
    font-family: var(--font-sans);
    flex-shrink: 0;
    user-select: none;
  }

  .status-left, .status-right {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .status-item {
    padding: 0 6px;
    height: 24px;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .status-item.muted { opacity: 0.7; }
  .status-item.modified { opacity: 0.85; font-weight: 600; }

  .status-item.git-branch {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .git-count {
    font-size: 10px;
    opacity: 0.8;
  }

  .git-dirty {
    color: rgba(251, 191, 36, 0.9);
    font-weight: 700;
  }

  .status-item.clickable {
    cursor: pointer;
    border-radius: 3px;
    transition: background 0.1s;
  }
  .status-item.clickable:hover {
    background: rgba(255, 255, 255, 0.15);
  }
</style>
