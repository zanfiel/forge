<!--
  WebAuth.svelte — Project Picker for web/PWA mode
  Auth is handled by Pangolin before you get here.
  This just lets you pick which directory to edit.
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import * as api from '../lib/api';
  import { store } from '../stores/app.svelte.ts';

  let { onAuthenticated }: { onAuthenticated: () => void } = $props();

  let projects = $state<string[]>([]);
  let customPath = $state('');
  let loading = $state(true);

  onMount(async () => {
    projects = await api.listProjects();
    loading = false;

    // Listen for project picker requests from api.ts openFolder()
    window.addEventListener('forge:pick-project', async (e: Event) => {
      const { dirs, resolve } = (e as CustomEvent).detail;
      projects = dirs;
      (window as any).__forgePickResolve = resolve;
    });
  });

  async function pickProject(dir: string) {
    await api.setProjectDir(dir);
    store.projectDir = dir;
    store.fileTree = await api.readDir(dir);

    if ((window as any).__forgePickResolve) {
      (window as any).__forgePickResolve(dir);
      (window as any).__forgePickResolve = null;
    }

    onAuthenticated();
  }

  async function openCustomPath() {
    if (!customPath.trim()) return;
    await pickProject(customPath.trim());
  }

  function skipProject() {
    onAuthenticated();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && customPath.trim()) openCustomPath();
  }

  function dirName(path: string): string {
    return path.split('/').pop() || path;
  }
</script>

<div class="auth-screen" onkeydown={handleKeydown}>
  {#if loading}
    <div class="auth-card">
      <div class="spinner">⚒️</div>
      <p>Loading projects...</p>
    </div>
  {:else}
    <div class="auth-card wide">
      <div class="picker-header">
        <div class="logo-small">⚒️</div>
        <div>
          <h2>Forge</h2>
          <p class="subtitle">Choose a directory to edit</p>
        </div>
      </div>

      <div class="project-list">
        {#each projects as dir}
          <button class="project-item" onclick={() => pickProject(dir)}>
            <span class="folder-icon">📁</span>
            <div class="project-info">
              <span class="project-name">{dirName(dir)}</span>
              <span class="project-path">{dir}</span>
            </div>
            <span class="arrow">→</span>
          </button>
        {/each}
      </div>

      <div class="custom-path">
        <input
          type="text"
          bind:value={customPath}
          placeholder="/home/zanfiel/myproject"
        />
        <button class="go-btn" onclick={openCustomPath} disabled={!customPath.trim()}>
          Open
        </button>
      </div>

      <button class="skip-btn" onclick={skipProject}>
        Skip — use Instructor Mode only
      </button>
    </div>
  {/if}
</div>

<style>
  .auth-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: var(--bg-base);
  }

  .auth-card {
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 40px;
    text-align: center;
    width: 340px;
    animation: fadeIn 0.3s ease-out;
  }

  .auth-card.wide {
    width: 480px;
    text-align: left;
    padding: 28px 32px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .logo-small { font-size: 28px; }

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .subtitle {
    color: var(--text-muted);
    font-size: 13px;
    margin-bottom: 0;
  }

  .picker-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .spinner {
    font-size: 36px;
    animation: spin 1.5s linear infinite;
  }

  .project-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
    max-height: 300px;
    overflow-y: auto;
  }

  .project-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-align: left;
    transition: all 0.15s;
  }

  .project-item:hover {
    border-color: var(--accent);
    background: var(--bg-hover);
  }

  .folder-icon { font-size: 20px; flex-shrink: 0; }

  .project-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .project-name { font-weight: 600; font-size: 13px; }

  .project-path {
    font-size: 11px;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-mono);
  }

  .arrow { color: var(--text-muted); font-size: 14px; }

  .custom-path { display: flex; gap: 8px; margin-bottom: 12px; }

  .custom-path input {
    flex: 1;
    padding: 10px 14px;
    background: var(--bg-raised);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: 14px;
    outline: none;
    font-family: var(--font-mono);
    transition: border-color 0.15s;
  }
  .custom-path input:focus { border-color: var(--accent); }
  .custom-path input::placeholder { color: var(--text-muted); font-family: var(--font-sans); }

  .go-btn {
    padding: 8px 16px;
    background: var(--accent);
    color: white;
    font-weight: 600;
    font-size: 13px;
    border-radius: 8px;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .go-btn:hover:not(:disabled) { background: var(--accent-hover); }
  .go-btn:disabled { opacity: 0.5; }

  .skip-btn {
    width: 100%;
    padding: 10px;
    font-size: 12px;
    color: var(--text-muted);
    border-radius: 8px;
    transition: all 0.15s;
  }
  .skip-btn:hover { background: var(--bg-hover); color: var(--text-primary); }

  @keyframes spin { to { transform: rotate(360deg); } }
</style>
