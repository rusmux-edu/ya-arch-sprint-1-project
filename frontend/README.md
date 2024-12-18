[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)

# Mesto – Frontend

Фронтенд написан на JS и чистом React, для написания CSS используется BEM. В качестве инструмента сборки используется
Rsbuild.

В рамках этого проекта было необходимо разбить монолитный фронтенд на микрофронтенды.

Архитектурные решения находятся в папке [docs/decisions](docs/decisions):

* [000-mfe-split.md](docs/decisions/000-mfe-split.md) – Разделение на микрофронтенды
* [000-mfe-framework.md](docs/decisions/000-mfe-framework.md) – Выбор фреймворка для микрофронтендов

# Запуск

Самый простой способ запуска – через Docker Compose:

```bash
docker compose -f docker/compose.yaml up
```

Или можно запустить каждый микрофронтенд отдельно:

```bash
cd mfe/<name>
pnpm install
pnpm dev
```
