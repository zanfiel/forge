/**
 * Main entry point for the renderer (UI).
 * 
 * This is like main() in a C program — it's where everything starts.
 * We import our root Svelte component and mount it to the DOM.
 */

import App from './App.svelte';
import './styles/global.css';
import { mount } from 'svelte';

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
