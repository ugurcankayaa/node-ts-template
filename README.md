# Node.js + TypeScript Template

A clean base template for building Node.js + TypeScript applications with a shared `core` package and generated API docs.

## Quick Start

```bash
npm install
npm run setup
```

The `setup` script prompts for:
- Application name
- Project slug
- Optional npm scope
- Description
- Author

It then updates template metadata in:
- `package.json`
- `package-lock.json`
- `core/package.json`
- `docs/package.json`
- `docs/typedoc.json`

## Available Scripts

- `npm run setup` – interactive template configuration
- `npm run build` – builds TypeScript in `core`
- `npm run docs:generate` – generates TypeDoc docs
- `npm run docs:serve` – generates and serves docs
- `npm run clean` – cleans workspace build artifacts
- `npm run format` – runs prettier in workspaces

## Environment

Copy `.env.example` to `.env` and adjust values for your app.
