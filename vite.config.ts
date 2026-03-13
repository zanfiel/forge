import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const host = process.env.TAURI_DEV_HOST;
const isWebBuild = process.env.BUILD_TARGET === 'web';

export default defineConfig({
  plugins: [
    svelte(),
    // In web builds, replace @tauri-apps imports with empty stubs
    isWebBuild ? {
      name: 'tauri-stub',
      resolveId(id: string) {
        if (id.startsWith('@tauri-apps/')) return id;
        return null;
      },
      load(id: string) {
        if (id.startsWith('@tauri-apps/')) {
          return 'export default {}; export const invoke = () => {}; export const listen = () => {}; export const getCurrentWindow = () => ({}); export const open = () => {};';
        }
        return null;
      },
    } : null,
  ].filter(Boolean),
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host ? { protocol: 'ws', host, port: 1421 } : undefined,
    watch: { ignored: ['**/src-tauri/**'] },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 4000,
  },
  resolve: {
    alias: { '$lib': '/src/lib' },
  },
});
