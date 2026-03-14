<div align="center">

# Forge

### AI code editor for the desktop

A lightweight, keyboard-driven editor with integrated AI chat,
powered by Synapse and Monaco.

[Quick Start](#quick-start) · [Features](#features) · [Architecture](#architecture) · [Configuration](#configuration) · [Building](#building)
n[![License: Elastic-2.0](https://img.shields.io/badge/License-Elastic%202.0-blue)](https://www.elastic.co/licensing/elastic-license)

</div>

---

## What is Forge?

Forge is a desktop code editor with a built-in AI coding assistant. It uses [Monaco](https://microsoft.github.io/monaco-editor/) (the engine behind VS Code) for editing and [Synapse](https://github.com/zanfiel/synapse) for AI — giving you agentic coding capabilities in a standalone app.

```bash
# Install dependencies
npm install

# Start in dev mode
npm run dev

# Build for distribution
npm run package
```

**Key features:**

- ✏️ **Monaco Editor** — full VS Code editing engine with syntax highlighting for 80+ languages
- 🤖 **AI chat panel** — streaming conversation with tool call visualization
- 📂 **File explorer** — recursive directory tree with smart filtering and `.gitignore` support
- 💻 **Integrated terminal** — xterm.js with web links and fit addon
- 🎨 **Custom dark theme** — purpose-built "forge-dark" color scheme
- 🪟 **Frameless window** — custom title bar with panel toggles and window controls
- ⚡ **Synapse backend** — auto-spawns Synapse in headless mode when a project is opened
- 📑 **Multi-tab editing** — per-file Monaco models with modified state indicators
- 🔍 **Quick actions** — one-click Explain, Find bugs, Improve, Add comments, Write tests
- 💬 **Chat + Teach modes** — switch between conversational AI and targeted code teaching
- 🛡️ **Context isolation** — secure Electron preload bridge, no direct Node access from renderer

---

## Quick Start

### Prerequisites

- **Node.js 20+**
- **Synapse** binary — [build from source](https://github.com/zanfiel/synapse) or place in `~/bin/synapse.exe`

### Development

```bash
git clone https://github.com/zanfiel/forge.git
cd forge
npm install
npm run dev
```

This starts Vite in watch mode and launches Electron. Changes to Svelte components hot-reload automatically.

### Production Build

```bash
npm run build
npm run package    # → release/ directory
```

---

## Features

### Editor

- Monaco Editor with custom "forge-dark" theme
- Multi-tab interface with unsaved change indicators
- Per-file editor models (efficient memory usage)
- Syntax highlighting for 80+ languages (auto-detected)
- Save with `Ctrl+S`

### AI Chat

The chat panel connects to Synapse running in headless mode (`synapse serve`). Forge spawns Synapse automatically when you open a project folder.

- **Streaming responses** via Server-Sent Events
- **Tool call visualization** — see what the AI reads, writes, and executes
- **Quick actions** — buttons for common tasks:
  - Explain this code
  - Find bugs
  - Improve this code
  - Add comments
  - Write tests
- **Chat mode** — open-ended conversation
- **Teach mode** — focused code explanations
- **Context-aware** — messages can reference the currently open file

### File Explorer

- Recursive directory tree (depth limit: 6)
- Auto-filters: `node_modules`, `.git`, `dist`, `build`, `__pycache__`, `.venv`, `target`, etc.
- Directories first, then alphabetical sorting
- Click to open, folders expand/collapse inline

### Terminal

- xterm.js embedded terminal
- Web link detection and click-to-open
- Auto-fit to panel size

### Window

- Frameless design with custom title bar
- Panel toggle buttons (file tree, chat, terminal)
- Standard window controls (minimize, maximize, close)
- Draggable title area

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                     Forge (Electron)                   │
│                                                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Renderer (Svelte 5)                │   │
│  │                                                 │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │   │
│  │  │  Monaco  │  │   Chat   │  │   File Tree  │  │   │
│  │  │  Editor  │  │  Panel   │  │   Explorer   │  │   │
│  │  └──────────┘  └──────────┘  └──────────────┘  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │   │
│  │  │ Title Bar│  │ Terminal │  │  Welcome     │  │   │
│  │  │ (custom) │  │ (xterm)  │  │  Screen      │  │   │
│  │  └──────────┘  └──────────┘  └──────────────┘  │   │
│  │                                                 │   │
│  │  Stores: projectDir, fileTree, openTabs,        │   │
│  │          chatMessages, sessionId, panels        │   │
│  └───────────────────────┬─────────────────────────┘   │
│                          │ IPC (preload bridge)        │
│  ┌───────────────────────┴─────────────────────────┐   │
│  │              Main Process (Node.js)             │   │
│  │                                                 │   │
│  │  • Window management (frameless, custom chrome) │   │
│  │  • File system operations (read/write/stat/dir) │   │
│  │  • Synapse process management (spawn/kill)      │   │
│  │  • AI chat proxy (HTTP → Synapse → SSE)         │   │
│  │  • Dialog handling (folder picker)              │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                             │
└──────────────────────────┼─────────────────────────────┘
                           │ HTTP (localhost:4300)
                    ┌──────┴──────┐
                    │   Synapse   │
                    │  (headless) │
                    └─────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop framework | Electron 35 |
| UI framework | Svelte 5 (runes) |
| Code editor | Monaco Editor |
| Terminal | xterm.js |
| Build tool | Vite 6 |
| Language | TypeScript 5.8 (strict) |
| AI backend | Synapse (headless HTTP) |
| Packaging | electron-builder |

### Project Structure

```
src/
├── main/
│   ├── main.ts              # Electron main process, IPC, Synapse lifecycle
│   └── preload.ts           # Security bridge (contextIsolation)
│
└── renderer/
    ├── App.svelte            # Root layout (3-column grid)
    ├── main.ts               # Vite entry point
    ├── components/
    │   ├── TitleBar.svelte    # Custom window chrome + panel toggles
    │   ├── FileTree.svelte    # Recursive file explorer
    │   ├── Editor.svelte      # Monaco editor with tabs
    │   ├── ChatPanel.svelte   # AI chat with streaming + tool viz
    │   └── WelcomeScreen.svelte
    ├── stores/
    │   └── app.svelte.ts      # Reactive state (Svelte 5 runes)
    └── styles/
        └── global.css         # Theme variables + base styles
```

---

## Configuration

### Synapse Discovery

Forge looks for the Synapse binary in this order:

1. `%USERPROFILE%\bin\synapse.exe`
2. `%USERPROFILE%\bin\synapse-new.exe`
3. `synapse` (on PATH)

When a project folder is opened, Forge spawns `synapse serve` pointed at that directory. The AI chat communicates with Synapse at `http://127.0.0.1:4300`.

### App Identity

| Field | Value |
|-------|-------|
| App ID | `dev.zanverse.forge` |
| Product Name | Forge |
| Version | 0.1.0 |

---

## Building

### Development

```bash
npm run dev           # Vite watch + Electron
```

### Production

```bash
npm run build         # Compile Svelte + TypeScript
npm run package       # Build distributable (→ release/)
npm run start         # Run production build locally
```

### Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Vite in watch mode + launch Electron |
| `dev:svelte` | Vite build with watch (renderer only) |
| `dev:electron` | Wait for renderer build, then launch Electron |
| `build` | Production build (Vite + TypeScript) |
| `start` | Launch Electron from built files |
| `package` | Build + package with electron-builder |

---

## License

Elastic License 2.0 — see [LICENSE](LICENSE).
