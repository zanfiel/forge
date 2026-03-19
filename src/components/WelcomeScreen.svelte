<!--
  WelcomeScreen.svelte - Shown when no project is open (Tauri Edition)
-->

<script lang="ts">
  import * as api from '../lib/api';
  import { store } from '../stores/app.svelte.ts';

  interface Props {
    onOpenProject: () => void;
  }

  let { onOpenProject }: Props = $props();
</script>

<div class="welcome">
  <div class="welcome-content">
    <div class="brand">
      <div class="logo-glow">
        <span class="logo-icon">⚡</span>
      </div>
      <h1>Forge</h1>
      <p class="tagline">AI-powered code editor</p>
    </div>

    <div class="actions">
      <button class="action-primary" onclick={onOpenProject}>
        <span class="action-icon">📁</span>
        <div class="action-text">
          <span class="action-label">Open Folder</span>
          <span class="action-hint">Start working on a project</span>
        </div>
        <kbd>Ctrl+O</kbd>
      </button>

      <button class="action-secondary" onclick={() => { store.rightPanel = 'instructor'; store.panels.chat = true; }}>
        <span class="action-icon">🎓</span>
        <span class="action-label">Learn to Code</span>
      </button>

      <button class="action-secondary" onclick={() => api.openExternal('https://github.com/zanfiel')}>
        <span class="action-icon">📚</span>
        <span class="action-label">Documentation</span>
      </button>
    </div>

    <div class="shortcuts">
      <h3>Keyboard Shortcuts</h3>
      <div class="shortcut-grid">
        <div class="shortcut"><kbd>Ctrl+B</kbd> Toggle file tree</div>
        <div class="shortcut"><kbd>Ctrl+L</kbd> Toggle AI chat</div>
        <div class="shortcut"><kbd>Ctrl+S</kbd> Save file</div>
        <div class="shortcut"><kbd>Ctrl+P</kbd> Quick open</div>
        <div class="shortcut"><kbd>Ctrl+`</kbd> Toggle terminal</div>
        <div class="shortcut"><kbd>Ctrl+/</kbd> Toggle comment</div>
      </div>
    </div>
  </div>

  <div class="bg-grid"></div>
</div>

<style>
  .welcome {
    height: calc(100vh - 38px);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }

  .welcome-content {
    display: flex; flex-direction: column;
    align-items: center; gap: 48px; z-index: 1;
  }

  .brand { text-align: center; }

  .logo-glow {
    width: 80px; height: 80px; margin: 0 auto 16px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 24px; background: var(--accent-dim);
    box-shadow: 0 0 60px var(--accent-dim), 0 0 120px rgba(124, 92, 252, 0.1);
  }
  .logo-icon { font-size: 40px; }

  h1 {
    font-size: 36px; font-weight: 700; letter-spacing: -0.5px;
    background: linear-gradient(135deg, var(--text-primary), var(--accent));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .tagline { color: var(--text-muted); font-size: 14px; margin-top: 4px; }

  .actions { display: flex; flex-direction: column; gap: 8px; width: 320px; }

  .action-primary {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px; background: var(--bg-raised);
    border: 1px solid var(--border); border-radius: var(--radius-lg);
    text-align: left; transition: all 0.2s;
  }
  .action-primary:hover {
    background: var(--bg-hover); border-color: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(124, 92, 252, 0.15);
  }

  .action-icon { font-size: 22px; }
  .action-text { flex: 1; display: flex; flex-direction: column; }
  .action-label { font-weight: 600; font-size: 14px; }
  .action-hint { font-size: 12px; color: var(--text-muted); }

  .action-primary kbd {
    padding: 3px 8px; background: var(--bg-surface);
    border: 1px solid var(--border-bright); border-radius: 4px;
    font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);
  }

  .action-secondary {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 20px; border-radius: var(--radius);
    color: var(--text-secondary); font-size: 13px; transition: all 0.15s;
  }
  .action-secondary:hover { background: var(--bg-hover); color: var(--text-primary); }

  .shortcuts { text-align: center; }
  .shortcuts h3 {
    font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
    color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px;
  }
  .shortcut-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; }
  .shortcut {
    font-size: 12px; color: var(--text-muted);
    display: flex; align-items: center; gap: 8px;
  }
  .shortcut kbd {
    padding: 2px 6px; background: var(--bg-raised);
    border: 1px solid var(--border); border-radius: 3px;
    font-family: var(--font-mono); font-size: 11px;
    min-width: 60px; text-align: center;
  }

  .bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px; opacity: 0.15;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
  }
</style>
