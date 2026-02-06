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

- `OPENCLAW_GATEWAY_TOKEN` - Auth token required for non-loopback connections (paste this into Control UI Settings to authenticate the WebSocket)
- `OPENCLAW_ALLOW_IFRAME` - Set to "1" to allow embedding in iframes (needed for Replit preview)

## Build Steps

1. `pnpm install --no-frozen-lockfile --ignore-scripts` - Install dependencies
2. `pnpm build` - Build TypeScript source
3. `cd ui && pnpm build` - Build Control UI

## Recent Changes

- 2026-02-06: Initial Replit setup
  - Configured Node.js 22, pnpm
  - Updated packageManager field to match installed pnpm version
  - Modified `src/gateway/control-ui.ts` to conditionally skip X-Frame-Options/CSP headers when `OPENCLAW_ALLOW_IFRAME=1` (for Replit iframe compatibility)
  - Set up gateway workflow on port 5000 with LAN binding
  - Configured deployment as VM target

## User Preferences

- No specific preferences recorded yet
