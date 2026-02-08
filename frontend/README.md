[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)

# Mesto – Frontend

The frontend is written in JavaScript and pure React, using BEM for CSS. Rsbuild is used as the build tool.

As part of this project, it was necessary to split the monolithic frontend into micro frontends.

Architectural decisions are located in the [docs/decisions](docs/decisions) folder:

* [000-mfe-split.md](docs/decisions/000-mfe-split.md) – Splitting into micro frontends
* [000-mfe-framework.md](docs/decisions/000-mfe-framework.md) – Choosing a framework for micro frontends
* [001-shared-lib.md](docs/decisions/001-shared-lib.md) – Deciding on a shared library for micro frontends
* [002-state-store.md](docs/decisions/002-state-store.md) – Choosing a state store for shared attributes
* [003-linters.md](docs/decisions/003-linters.md) – Choosing linters for the project

# Running

The easiest way to run is through Docker Compose:

```bash
docker compose -f docker/compose.yaml up
```

Or you can run each micro frontend separately:

```bash
cd mfe/<name>
pnpm install
pnpm dev
```
