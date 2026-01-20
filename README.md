# @jsw/vite-plugin-jsw

A Vite plugin that compiles AssemblyScript/JSW modules and generates the JavaScript/wasm glue required to run them in the browser (integration examples use `as-bind`).

## What it is

- A Vite plugin that automates the build steps for AssemblyScript modules so they can be consumed from regular web code.
- Produces the WebAssembly binary and lightweight runtime glue that wires exports and memory access to JavaScript callers.

## How it works

- Source discovery: plugin watches and collects AssemblyScript/JSW sources in your project.
- Compilation: on build (or on change during dev) the plugin runs the AssemblyScript compilation step to emit a `.wasm` and associated JS glue.
- Glue generation: the plugin emits helper code that instantiates the wasm and exposes typed bindings; the project uses `as-bind`-style helpers to marshal arguments and memory.
- Vite integration: artifacts are emitted into the plugin's output (served by the dev server during `dev`, bundled during `build`). The plugin triggers rebuilds on source changes so the dev server reloads with the new module.

## Development

- Build the plugin bundle: `npm run build` (see `package.json`).
- Watch mode for iterative development: `npm run dev`.

## Usage

```typescript
import jsw from '@jsw/vite-plugin-jsw'

export default {
  plugins: [jsw()]
}
```

## Project layout

- `src/` — plugin source; primary entry is `src/index.ts` (see `src/compiler.ts`, `src/glue.ts`).
- `playground/` — example app and quick tests.
- `package.json` — build scripts (`dev`, `build`, `release`).

## Notes

- This project uses AssemblyScript and `as-bind` (see `devDependencies` / `dependencies` in `package.json`).

## Publishing status

- Not published to npm yet.

## License

ISC

## Local installation

- Install directly from the repository folder (recommended for local testing):

```bash
# with pnpm
pnpm add -D /path/to/vite-plugin-jsw

# with npm
npm install --save-dev /path/to/vite-plugin-jsw
```

## Release and Versioning

This project uses `standard-version` for automated versioning and changelog management.

```bash
# Create a patch release (1.0.1)
npm run release:patch

# Create a minor release (1.1.0)
npm run release:minor

# Create a major release (2.0.0)
npm run release:major
```

These commands will:
1. Update the version in `package.json`.
2. Generate/update `CHANGELOG.md`.
3. Create a git tag for the version.

## License

ISC
