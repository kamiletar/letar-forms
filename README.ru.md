# @lena/form-components

Переиспользуемая UI-библиотека компонентов форм на базе TanStack Form для монорепозитория Lena.

[English documentation](./README.en.md)

## Quick Start

```tsx
import { Form } from '@lena/form-components'
import { z } from 'zod/v4'

const Schema = z.object({
  title: z.string().min(2).meta({ ui: { title: 'Название', placeholder: 'Введите...' } }),
  rating: z.number().min(0).max(10).meta({ ui: { title: 'Рейтинг' } }),
})

<Form schema={Schema} initialValue={{ title: '', rating: 5 }} onSubmit={save}>
  <Form.Field.String name="title" />
  <Form.Field.Number name="rating" />
  <Form.Button.Submit>Сохранить</Form.Button.Submit>
</Form>
```

**Или полная автогенерация:**

```tsx
<Form.FromSchema schema={Schema} initialValue={data} onSubmit={handleSubmit} submitLabel="Создать" />
```

---

## Философия: Отделение вёрстки от логики

| Аспект            | Где определяется           | Как используется в JSX          |
| ----------------- | -------------------------- | ------------------------------- |
| **Валидация**     | Zod схема                  | `schema={Schema}`               |
| **UI метаданные** | Zod `.meta({ ui: {...} })` | Автоматически из схемы          |
| **Структура**     | TypeScript типы            | `initialValue={data}`           |
| **Вёрстка**       | JSX                        | `<HStack>`, `<VStack>`, `<Box>` |

**Результат:** JSX содержит только вёрстку и имена полей. Вся логика живёт в схеме.

---

## Документация

| Категория        | Документация                                             | Описание                                     |
| ---------------- | -------------------------------------------------------- | -------------------------------------------- |
| Field компоненты | [docs/fields.md](./docs/fields.md)                       | 40 типов полей (String, Number, Select, ...) |
| Form-level       | [docs/form-level.md](./docs/form-level.md)               | Steps, When, Errors, Middleware, Persistence |
| Schema генерация | [docs/schema-generation.md](./docs/schema-generation.md) | FromSchema, AutoFields, Builder              |
| Offline          | [docs/offline.md](./docs/offline.md)                     | Оффлайн режим, очередь синхронизации         |
| ZenStack         | [docs/zenstack.md](./docs/zenstack.md)                   | Плагин, @form.\* директивы, withUIMeta       |
| i18n             | [docs/i18n.md](./docs/i18n.md)                           | Мультиязычность, перевод ошибок валидации    |
| API Reference    | [docs/api-reference.md](./docs/api-reference.md)         | Хуки, контексты, типы                        |

---

## Основные возможности

### 40+ Field компонентов

```tsx
// Текстовые
<Form.Field.String name="title" />
<Form.Field.Textarea name="description" />
<Form.Field.RichText name="content" />

// Числовые
<Form.Field.Number name="price" />
<Form.Field.Slider name="rating" />
<Form.Field.Currency name="amount" />

// Выбор
<Form.Field.Select name="category" />
<Form.Field.RadioGroup name="type" />
<Form.Field.Checkbox name="agree" />

// Специальные
<Form.Field.Date name="birthday" />
<Form.Field.Phone name="phone" />
<Form.Field.FileUpload name="avatar" />
```

[Полный список → docs/fields.md](./docs/fields.md)

### Form-level компоненты

```tsx
<Form schema={Schema} initialValue={data} onSubmit={save}>
  {/* Условный рендеринг */}
  <Form.When field="type" is="company">
    <Form.Field.String name="companyName" />
  </Form.When>

  {/* Мультистеп формы */}
  <Form.Steps animated validateOnNext>
    <Form.Steps.Step title="Шаг 1">...</Form.Steps.Step>
    <Form.Steps.Step title="Шаг 2">...</Form.Steps.Step>
    <Form.Steps.Navigation />
  </Form.Steps>

  {/* Сводка ошибок */}
  <Form.Errors title="Исправьте ошибки:" />

  {/* JSON-инспектор значений (скрыт в production) */}
  <Form.DebugValues />

  <Form.Button.Submit />
</Form>
```

[Подробнее → docs/form-level.md](./docs/form-level.md)

### Группы и массивы

```tsx
// Вложенный объект
<Form.Group name="address">
  <Form.Field.String name="city" />    {/* → address.city */}
  <Form.Field.String name="street" />  {/* → address.street */}
</Form.Group>

// Массив
<Form.Group.List name="phones">
  <Form.Field.Phone />
  <Form.Group.List.Button.Add>Добавить телефон</Form.Group.List.Button.Add>
</Form.Group.List>
```

### Автоматические constraints из Zod

```tsx
const Schema = z.object({
  title: z.string().min(2).max(100),  // → minLength={2} maxLength={100}
  email: z.string().email(),          // → type="email"
  rating: z.number().min(1).max(10),  // → min={1} max={10}
})

// DRY: валидация и UI constraints в одном месте
<Form.Field.String name="title" />  {/* maxLength={100} из схемы */}
```

### ZenStack интеграция

```zmodel
model Product {
  /// @form.title("Название продукта")
  /// @form.placeholder("Введите название")
  title String

  /// @form.title("Цена")
  /// @form.fieldType("currency")
  /// @form.props({ min: 0, currency: "RUB" })
  price Int
}
```

```tsx
import { ProductCreateFormSchema } from '@/generated/form-schemas'
;<Form.FromSchema schema={ProductCreateFormSchema} initialValue={data} onSubmit={save} />
```

[Подробнее → docs/zenstack.md](./docs/zenstack.md)

### Offline Support

```tsx
<Form
  initialValue={data}
  offline={{
    actionType: 'UPDATE_PROFILE',
    onQueued: () => toast.info('Сохранено локально'),
    onSynced: () => toast.success('Синхронизировано'),
  }}
  onSubmit={handleSubmit}
>
  <Form.OfflineIndicator />
  <Form.Field.String name="name" />
  <Form.Button.Submit />
</Form>
```

[Подробнее → docs/offline.md](./docs/offline.md)

---

## Установка

```bash
# Уже установлен в монорепозитории
import { Form } from '@lena/form-components'
```

### Опциональные зависимости (npm)

| Пакет                  | Для чего                          |
| ---------------------- | --------------------------------- |
| `@dnd-kit/*`           | Drag & drop сортировка в массивах |
| `use-mask-input`       | Phone, MaskedInput                |
| `@tiptap/*`            | RichText редактор                 |
| `@uiw/react-json-view` | Form.DebugValues (JSON инспектор) |
| `next-intl`            | i18n интеграция                   |

---

## Команды

```bash
nx build @lena/form-components    # Сборка
nx lint @lena/form-components     # Линтинг
nx test @lena/form-components     # Тесты
```

---

## Провайдер адресов

Поля Address и City поддерживают подключаемые провайдеры геокодинга. DaData (Россия) встроен:

```typescript
import { createForm, createDaDataProvider } from '@lena/form-components'

// Вариант 1: через createForm (рекомендуемый)
const AppForm = createForm({
  addressProvider: createDaDataProvider({ token: process.env.DADATA_TOKEN }),
})

<AppForm.Field.Address name="address" />
<AppForm.Field.City name="city" />

// Вариант 2: на конкретном поле
<Form.Field.Address name="address" provider={myProvider} />

// Вариант 3: обратная совместимость через token
<Form.Field.Address name="address" token="dadata-token" />
```

Для других сервисов — реализуйте интерфейс `AddressProvider`:

```typescript
const myProvider: AddressProvider = {
  async getSuggestions(query, options) {
    const res = await fetch(`/api/geocode?q=${query}`)
    return res.json() // [{ label, value, data }]
  },
}
```

---

## AI Tooling (MCP)

MCP сервер [`@letar/form-mcp`](../form-mcp/README.md) предоставляет AI-ассистентам (Claude Code, Cursor, VS Code Copilot) полный контекст о библиотеке: 40+ полей, паттерны форм, @form.\* директивы.

```json
{ "form-mcp": { "command": "npx", "args": ["-y", "@letar/form-mcp"] } }
```

## Bundle Size

Библиотека поставляется как ESM с external dependencies. Все тяжёлые зависимости (Chakra, React, Tiptap, dnd-kit) — external и не включаются в bundle.

| Модуль | Размер (brotli) | Размер (raw) |
|--------|----------------|--------------|
| `@letar/forms` (все 40 полей) | **20 KB** | 109 KB |
| `@letar/forms/fields/text` | < 1 KB | re-export |
| `@letar/forms/fields/number` | < 1 KB | re-export |
| `@letar/forms/fields/datetime` | < 1 KB | re-export |
| `@letar/forms/fields/selection` | < 1 KB | re-export |
| `@letar/forms/fields/boolean` | < 1 KB | re-export |
| `@letar/forms/fields/specialized` | < 1 KB | re-export |
| `@letar/forms/offline` | < 1 KB | 5 KB |
| `@letar/forms/i18n` | < 1 KB | 13 KB |

Категорийные entry points (`fields/*`) позволяют импортировать только нужные поля:

```typescript
// Полный импорт — все 40 полей
import { Form } from '@letar/forms'

// Категорийный импорт — только текстовые поля
import { FieldString, FieldTextarea } from '@letar/forms/fields/text'
```

Метрики проверяются в CI через [size-limit](https://github.com/ai/size-limit).

### Ре-рендеры

При вводе текста в одно поле формы из 10 полей — **остальные 9 полей НЕ ре-рендерятся** (0 лишних рендеров). TanStack Form обеспечивает field-level подписки — каждое поле изолировано.

## Связанные документы

- [/.claude/docs/forms.md](../../.claude/docs/forms.md) — документация по формам
- [/.claude/docs/pwa-offline.md](../../.claude/docs/pwa-offline.md) — оффлайн-формы
- [/libs/form-mcp](../form-mcp/) — MCP сервер для AI-ассистентов
- [PLAN.md](./PLAN.md) — план развития библиотеки
- [TESTING_PLAN.md](./TESTING_PLAN.md) — план тестирования

---

**Версия:** 0.59.0
**Последнее обновление:** 2026-04-01
