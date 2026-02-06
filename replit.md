# OpenClaw — Personal AI Assistant

## Overview

OpenClaw is a personal AI assistant gateway that connects to messaging channels (WhatsApp, Telegram, Slack, Discord, etc.) and provides AI-powered responses. The gateway serves a Control UI dashboard for managing the assistant.

## Project Architecture

- **Language**: Node.js 22+ with TypeScript
- **Package Manager**: pnpm
- **Build System**: tsdown (TypeScript bundler)
- **UI Framework**: Lit (Web Components) with Vite
- **Entry Point**: `openclaw.mjs` → `dist/entry.js`

### Directory Structure

- `src/` - TypeScript source code
  - `src/gateway/` - Gateway server (HTTP + WebSocket)
  - `src/cli/` - CLI commands
  - `src/commands/` - Command implementations
  - `src/agents/` - AI agent logic
  - `src/channels/` - Messaging channel integrations
  - `src/config/` - Configuration management
  - `src/auto-reply/` - Auto-reply system
- `ui/` - Control UI (Vite + Lit web components)
- `dist/` - Built output
- `apps/` - Native apps (iOS, Android, macOS)
- `docs/` - Documentation
- `scripts/` - Build and dev scripts

## Running the Project

The gateway runs on port 5000 with `--bind lan` for Replit compatibility.

```bash
node openclaw.mjs gateway --port 5000 --bind lan --allow-unconfigured --verbose
```

## Environment Variables

- `OPENCLAW_GATEWAY_TOKEN` - Auth token for non-loopback connections (auto-injected into Control UI when `OPENCLAW_ALLOW_IFRAME=1`)
- `OPENCLAW_ALLOW_IFRAME` - Set to "1" to allow embedding in iframes (needed for Replit preview) and enable automatic token injection into Control UI

## Build Steps

1. `pnpm install --no-frozen-lockfile --ignore-scripts` - Install dependencies
2. `pnpm build` - Build TypeScript source
3. `cd ui && pnpm build` - Build Control UI

## Replit-Specific Modifications

### Token Auto-Injection
- `src/gateway/control-ui.ts`: When `OPENCLAW_ALLOW_IFRAME=1`, injects `window.__OPENCLAW_INJECTED_TOKEN__` into the Control UI HTML with the gateway token value
- `ui/src/ui/storage.ts`: `loadSettings()` reads the injected token as the default, so users don't need to manually paste it in Settings

### Iframe Compatibility
- `src/gateway/control-ui.ts`: Conditionally skips X-Frame-Options and CSP frame-ancestors headers when `OPENCLAW_ALLOW_IFRAME=1`

### Gateway Config
- `~/.openclaw/openclaw.json`: Sets `gateway.controlUi.dangerouslyDisableDeviceAuth: true` so that connections through Replit's proxy (which appear as non-local) can authenticate with just the token, bypassing device pairing requirements

## Recent Changes

- 2026-02-06: Complete Control UI russification
  - Translated all user-facing strings in ~60+ UI files from English to Russian
  - Covers: navigation, chat, overview, channels (WhatsApp/Telegram/Discord/Slack/Signal/iMessage/Google Chat/Nostr), sessions, agents, skills, nodes, config, usage, cron, logs, debug, exec-approval, settings, format/presenter utilities
  - Only user-visible text translated; code identifiers, CSS classes, HTML attributes, config keys preserved
  - Both main project and UI rebuilt successfully

- 2026-02-06: Initial Replit setup
  - Configured Node.js 22, pnpm
  - Updated packageManager field to match installed pnpm version
  - Modified `src/gateway/control-ui.ts` for iframe compatibility and token auto-injection
  - Modified `ui/src/ui/storage.ts` to read injected token as default
  - Created `~/.openclaw/openclaw.json` with `dangerouslyDisableDeviceAuth: true` for Replit proxy compatibility
  - Set up gateway workflow on port 5000 with LAN binding
  - Configured deployment as VM target

## User Preferences

- UI language: Russian
