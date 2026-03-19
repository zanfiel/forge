<!--
  Terminal.svelte - Integrated terminal using xterm.js
  Desktop: spawns shell via Tauri shell plugin
  Web: connects to /api/terminal WebSocket (placeholder for now)
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { store } from '../stores/app.svelte.ts';

  let container: HTMLDivElement;
  let term: any = null;
  let fitAddon: any = null;
  let resizeObserver: ResizeObserver | null = null;
  let shellProcess: any = null;

  const IS_TAURI = typeof window !== 'undefined' && !!(window as any).__TAURI_INTERNALS__;

  onMount(async () => {
    const { Terminal } = await import('@xterm/xterm');
    const { FitAddon } = await import('@xterm/addon-fit');
    const { WebLinksAddon } = await import('@xterm/addon-web-links');

    // Import xterm CSS
    await import('@xterm/xterm/css/xterm.css');

    term = new Terminal({
      fontFamily: "'JetBrains Mono', 'Cascadia Code', Consolas, monospace",
      fontSize: 13,
      lineHeight: 1.4,
      cursorBlink: true,
      cursorStyle: 'bar',
      theme: {
        background: '#0a0a0f',
        foreground: '#e4e4ed',
        cursor: '#7c5cfc',
        selectionBackground: '#7c5cfc33',
        black: '#0a0a0f',
        red: '#f7768e',
        green: '#9ece6a',
        yellow: '#e0af68',
        blue: '#7aa2f7',
        magenta: '#bb9af7',
        cyan: '#7dcfff',
        white: '#e4e4ed',
        brightBlack: '#444466',
        brightRed: '#f7768e',
        brightGreen: '#9ece6a',
        brightYellow: '#e0af68',
        brightBlue: '#7aa2f7',
        brightMagenta: '#bb9af7',
        brightCyan: '#7dcfff',
        brightWhite: '#ffffff',
      },
    });

    fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());
    term.open(container);

    // Small delay to ensure container is sized
    requestAnimationFrame(() => {
      fitAddon.fit();
    });

    // Auto-resize
    resizeObserver = new ResizeObserver(() => {
      if (fitAddon) {
        try { fitAddon.fit(); } catch {}
      }
    });
    resizeObserver.observe(container);

    if (IS_TAURI) {
      await setupTauriShell();
    } else {
      setupWebTerminal();
    }
  });

  async function setupTauriShell() {
    try {
      const { Command } = await import('@tauri-apps/plugin-shell');

      // Detect platform shell
      const isWin = navigator.platform.toLowerCase().includes('win');
      const shell = isWin ? 'powershell' : 'bash';
      const args = isWin ? ['-NoLogo'] : [];

      const cmd = Command.create(shell, args, {
        cwd: store.projectDir || undefined,
      });

      cmd.on('close', () => {
        term?.writeln('\r\n[Process exited]');
      });

      cmd.on('error', (err: string) => {
        term?.writeln(`\r\n[Error: ${err}]`);
      });

      cmd.stdout.on('data', (data: string) => {
        term?.write(data);
      });

      cmd.stderr.on('data', (data: string) => {
        term?.write(data);
      });

      shellProcess = await cmd.spawn();

      // Pipe terminal input to shell stdin
      term.onData((data: string) => {
        shellProcess?.write(data);
      });
    } catch (err) {
      term?.writeln(`[Shell unavailable: ${err}]`);
      term?.writeln('[Add "shell" to Tauri allowlist to enable terminal]');
    }
  }

  function setupWebTerminal() {
    term?.writeln('Terminal available in desktop mode only.');
    term?.writeln('Use Ctrl+` to toggle.');
  }

  onDestroy(() => {
    resizeObserver?.disconnect();
    shellProcess?.kill();
    term?.dispose();
  });
</script>

<div class="terminal-wrapper">
  <div bind:this={container} class="terminal-container"></div>
</div>

<style>
  .terminal-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #0a0a0f;
  }

  .terminal-container {
    flex: 1;
    padding: 4px;
    overflow: hidden;
  }

  /* Override xterm scrollbar to match theme */
  .terminal-container :global(.xterm-viewport::-webkit-scrollbar) {
    width: 6px;
  }
  .terminal-container :global(.xterm-viewport::-webkit-scrollbar-thumb) {
    background: #2e2e42;
    border-radius: 3px;
  }
</style>
