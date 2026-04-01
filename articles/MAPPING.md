# Маппинг: статьи ↔ документация ↔ примеры

Соответствие между статьями цикла, страницами docs-сайта (forms.letar.best) и примерами (forms-example.letar.best).

## Статья → Docs → Examples

| #  | Статья                          | Docs pages                                                                              | Example pages                                             |
| -- | ------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 00 | Quick Start                     | `quick-start.mdx`                                                                       | `/examples/basic`                                         |
| 01 | Формы в React — почему больно   | `index.mdx` (overview)                                                                  | — (общие ссылки)                                          |
| 02 | Zod .meta() — единый источник   | `guides/validation.mdx`                                                                 | `/examples/validation`, `/examples/constraints`           |
| 03 | Compound Components             | `guides/create-form.mdx`, `api/form-component.mdx`                                      | `/examples/basic`, `/examples/all-fields`                 |
| 04 | 40 полей                        | `fields/*.mdx` (6 страниц)                                                              | `/examples/all-fields`, `/examples/advanced-fields`       |
| 05 | Мультистеп и условный рендеринг | `guides/multi-step.mdx`, `guides/conditional-fields.mdx`                                | `/examples/multi-step`, `/examples/conditional`           |
| 06 | Массивы и группы                | `guides/groups-arrays.mdx`                                                              | `/examples/groups`                                        |
| 07 | FromSchema                      | **НЕТ отдельной страницы**                                                              | `/examples/auto-fields`, `/examples/auto-fields-advanced` |
| 08 | ZenStack pipeline               | `guides/zenstack-plugin.mdx`, `guides/relation-fields.mdx`, `guides/tanstack-query.mdx` | `/examples/zenstack`, `/products`                         |
| 09 | Offline-first                   | `guides/offline.mdx`, `guides/persistence.mdx`                                          | `/examples/offline`, `/examples/persistence`              |
| 10 | i18n                            | `guides/i18n.mdx`                                                                       | `/examples/i18n`                                          |
| 11 | MCP                             | **НЕТ страницы**                                                                        | — (npm link)                                              |
| 12 | Релиз                           | `installation.mdx`                                                                      | `/examples/recipes`                                       |

## Отсутствующие страницы docs

Следующие темы из статей не имеют отдельных страниц в документации:

### 1. FromSchema / AutoFields (Приоритет: высокий)

- **Статья:** 07-from-schema.md
- **Что нужно:** `guides/auto-fields.mdx` + `guides/auto-fields.ru.mdx`
- **Контент:** 4 уровня контроля (FromSchema → AutoFields → Field.* → useAppForm), маппинг типов, include/exclude, кастомизация

### 2. MCP сервер (Приоритет: средний)

- **Статья:** 11-mcp-ai.md
- **Что нужно:** `guides/mcp.mdx` + `guides/mcp.ru.mdx`
- **Контент:** Установка, 6 инструментов, конфигурация для Claude Code/Cursor, примеры промптов

## Docs pages без статьи

Следующие страницы docs не покрыты статьями цикла:

| Docs page                      | Покрытие в статьях                         |
| ------------------------------ | ------------------------------------------ |
| `guides/controlled-state.mdx`  | Упомянуто в статье 03 (добавлено)          |
| `guides/file-upload.mdx`       | Расширено описание в статье 04 (добавлено) |
| `guides/relation-fields.mdx`   | Добавлен раздел в статье 08                |
| `guides/tanstack-query.mdx`    | Добавлен раздел в статье 08                |
| `guides/create-form.mdx`       | Покрыто в статье 03 (createForm)           |
| `guides/advanced-patterns.mdx` | Не покрыто — слишком специфично для статей |

## Русская локаль

Все страницы docs имеют `.ru.mdx` версии. Полная русская локаль подтверждена.

## Example pages без статьи

| Example page        | Статус                                                               |
| ------------------- | -------------------------------------------------------------------- |
| `/examples/theming` | Не покрыто ни одной статьёй. Опционально: добавить абзац в статью 12 |
| `/examples/recipes` | Добавлены ссылки в статьи 01, 04, 12                                 |

---

_Обновлено: 2026-04-01_
