<script lang="ts">
  import * as monaco from 'monaco-editor';
  import { confirmEdit } from '../lib/api';

  interface PendingEdit {
    file: string;
    oldContent: string;
    newContent: string;
    toolCallId: string;
  }

  let { edit, onResolved }: {
    edit: PendingEdit;
    onResolved: (id: string) => void;
  } = $props();

  let container: HTMLDivElement;
  let diffEditor: monaco.editor.IDiffEditor | null = null;

  function detectLanguage(ext: string): string {
    const map: Record<string, string> = {
      ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
      go: 'go', rs: 'rust', py: 'python', svelte: 'html', html: 'html',
      css: 'css', json: 'json', md: 'markdown', yaml: 'yaml', yml: 'yaml',
      toml: 'ini', sh: 'shell', bash: 'shell', sql: 'sql',
    };
    return map[ext] || 'plaintext';
  }

  $effect(() => {
    if (container && edit) {
      const ext = edit.file.split('.').pop() || '';
      const lang = detectLanguage(ext);

      const originalModel = monaco.editor.createModel(edit.oldContent, lang);
      const modifiedModel = monaco.editor.createModel(edit.newContent, lang);

      diffEditor = monaco.editor.createDiffEditor(container, {
        readOnly: true,
        renderSideBySide: false,
        theme: 'vs-dark',
        minimap: { enabled: false },
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      });

      diffEditor.setModel({ original: originalModel, modified: modifiedModel });

      return () => {
        diffEditor?.dispose();
        originalModel.dispose();
        modifiedModel.dispose();
        diffEditor = null;
      };
    }
  });

  async function accept() {
    await confirmEdit(edit.toolCallId, true);
    onResolved(edit.toolCallId);
  }

  async function reject() {
    await confirmEdit(edit.toolCallId, false);
    onResolved(edit.toolCallId);
  }
</script>

<div class="diff-container">
  <div class="diff-header">
    <span class="diff-file">{edit.file}</span>
    <div class="diff-actions">
      <button class="btn-accept" onclick={accept}>✓ Accept</button>
      <button class="btn-reject" onclick={reject}>✗ Reject</button>
    </div>
  </div>
  <div class="diff-editor" bind:this={container}></div>
</div>

<style>
  .diff-container {
    border: 1px solid #30363d;
    border-radius: 6px;
    overflow: hidden;
    margin: 8px 0;
  }
  .diff-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    background: #161b22;
    border-bottom: 1px solid #30363d;
  }
  .diff-file {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #8b949e;
  }
  .diff-actions { display: flex; gap: 8px; }
  .btn-accept {
    background: rgba(46, 160, 67, 0.3);
    color: #7ee787;
    border: 1px solid #2ea043;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }
  .btn-accept:hover { background: rgba(46, 160, 67, 0.5); }
  .btn-reject {
    background: rgba(218, 54, 52, 0.3);
    color: #f85149;
    border: 1px solid #da3634;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }
  .btn-reject:hover { background: rgba(218, 54, 52, 0.5); }
  .diff-editor { height: 300px; }
</style>
