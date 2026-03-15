# Forge

AI code editor for the desktop.

Forge is a Tauri + Svelte + Monaco desktop editor with a built-in Synapse-powered coding assistant.

## Quick Start

```bash
npm install
npm run tauri:dev
```

## Requirements

- Node.js 20+
- Rust toolchain
- Synapse running locally on `http://127.0.0.1:4300`

Start Synapse headless:

```bash
synapse serve :4300
```

## Build

```bash
npm run build
npm run tauri:build
```

## Features

- Monaco editor with multi-tab editing
- Streaming Synapse chat with tool call visualization
- Pending edit accept/reject flow
- Instructor panel and checkpoints
- Optional Engram memory integration
- Desktop-only Tauri app

## Optional Engram

Forge checks local Engram first at `http://127.0.0.1:4200`.

You can optionally configure remote Engram endpoints with environment variables:

```bash
ENGRAM_URL=http://your-engram-host:4200
ENGRAM_FALLBACK_URL=http://your-backup-engram-host:4200
ENGRAM_API_KEY=eg_your_key
```

## License

Elastic-2.0
