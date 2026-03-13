/**
 * Preload Script — The Security Bridge
 * 
 * This runs BEFORE the web page loads, in a special context that has
 * access to both Node.js APIs and the browser window.
 * 
 * We use contextBridge to expose a SAFE, limited API to the renderer.
 * The renderer can only call these specific functions — it can't
 * access the file system, spawn processes, etc. directly.
 * 
 * In the renderer (Svelte), you access these as: window.api.readFile(...)
 */

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  // Window controls
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

  // File dialog
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),

  // File system
  readDir: (path?: string) => ipcRenderer.invoke('fs:readDir', path),
  readFile: (path: string) => ipcRenderer.invoke('fs:readFile', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('fs:writeFile', path, content),
  stat: (path: string) => ipcRenderer.invoke('fs:stat', path),

  // AI
  chat: (message: string, sessionId: string) => ipcRenderer.invoke('ai:chat', message, sessionId),
  chatStream: (message: string, sessionId: string) => ipcRenderer.invoke('ai:chatStream', message, sessionId),
  onStreamEvent: (callback: (event: any) => void) => {
    ipcRenderer.on('ai:streamEvent', (_event, data) => callback(data));
  },

  // Project
  getProjectDir: () => ipcRenderer.invoke('project:getDir'),
  openExternal: (url: string) => ipcRenderer.invoke('project:openExternal', url),
});
