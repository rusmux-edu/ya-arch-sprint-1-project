# Выбор линтеров и форматтеров

## Context and Problem Statement

В проекте необходимо выбрать линтеры и форматтеры для поддержания единого стиля кода. Это значительно упростит чтение и
поддержку кода.

## Considered Options

* ESLint – linter
* Prettier – formatter
* StandardJS – linter
* Biome – linter & formatter
* Oxc – linter & formatter
* XO – linter

## Decision Outcome

Выбраны Biome и ESLint. Biome работает быстро, так как написан на Rust, и заменяет Prettier (совместимость 97%). Есть
поддержка в IDE. Однако проверок Biome недостаточно, поэтому также используется ESLint. У ESLint много недостатков
(медленный, ломающие изменения при обновлении), но он позволяет настроить множество правил и плагинов.

StandardJS/XO работают поверх ESLint, они менее гибкие. Oxc не так популярен как Biome, нет поддержки в IDE.
