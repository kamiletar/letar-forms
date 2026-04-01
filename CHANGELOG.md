# Changelog

Все значимые изменения в библиотеке @lena/form-components документируются в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/).

## [1.1.0] - 2026-04-01

### Added

- **size-limit** CI: bundle size проверка перед каждым npm publish (20 KB brotli full)
- **Категорийные entry points**: `@letar/forms/fields/{text,number,datetime,selection,boolean,specialized}`
- **Бенчмарк ре-рендеров**: 10 полей, ввод в одно → 0 лишних рендеров у остальных
- **FieldErrorBoundary**: ErrorBoundary для каждого field-компонента (fallback при ошибке рендеринга)
- **Type-тесты**: DeepKeys, DeepValue, useTypedFormSubscribe (vitest expectTypeOf)
- `loadingText` prop в `Form.Button.Submit` для кастомного текста при загрузке
- `City` и `sortable` в FormFieldComponents/FormGroupListComponent типах

### Fixed

- Race condition в Form.Steps — все шаги получали index=0
- Число полей "49" → "40" во всех 12 статьях и README

### Changed

- tsup entry points расширены с 3 до 9 (code splitting для categories)
- Bundle Size секция в README с актуальными метриками
- `package.publish.json` exports map с 6 category entry points

## [0.58.0] - 2026-03-31

### Added

- Pluggable `AddressProvider` interface for `Form.Field.Address` and `Form.Field.City`
- `createDaDataProvider()` — built-in DaData provider (Russia)
- `createForm({ addressProvider })` — set address provider once for all fields
- Provider resolution: field prop → createForm context → token fallback → env
- `addressProvider` prop on `Form` root component
- `CityFieldProps` exported from types
- `README.en.md`: Address Provider + createForm sections

### Changed

- All JSDoc, comments, runtime errors translated to English (118 files, ~3000 lines)
- Default UI strings: "Save", "Reset", "Unsaved changes", "Leave", "Stay", etc.
- `AddressValue.data` generalized to `Record<string, unknown>` (was DaData-specific)
- `AddressFieldProps.token` is now optional (use `provider` instead)
- `DaDataSuggestion` marked as deprecated
- `build:npm` copies `README.en.md` as `README.md` + `README.ru.md` for npm

## [0.56.0] - 2026-03-23

### Added

- `Form.DebugValues` — интерактивный JSON-инспектор значений формы (скрыт в production)
- `debug` prop на `Form` для автоматического отображения DebugValues
- Инфраструктура публикации `@letar/forms` на npm

### Fixed

- Совместимость с `@tanstack/store` 0.9+ (Subscription API)
- Исправлен баг `destroy` в `form-steps`

## [0.54.1] - 2026-01-05

### Fixed

- `FieldNumber`: для опциональных полей не передаём min/max в NumberInput когда значение пустое — убрана красная рамка для пустых опциональных полей

## [0.54.0] - 2026-01-03

### Added

- `form-from-schema.spec.tsx` — unit тесты для `FormFromSchema` (~15 тестов)
- `form-with-api.spec.tsx` — unit тесты для `FormWithApi` (~12 тестов)
- Покрытие тестами всех критичных компонентов схемогенерации

### Changed

- Deprecated type aliases централизованы в `form-fields/index.ts`
- Удалены локальные deprecated экспорты из 7 selection компонентов
- `field-select.tsx` использует `BaseOption<string | number>[]` вместо `SelectOption`

### Improved

- Общее покрытие тестами: +27 unit тестов
- Обратная совместимость сохранена через централизованный реэкспорт deprecated типов

## [0.53.0] - 2025-12-31

### Added

- Оптимизация производительности форм
- Улучшенная мемоизация в form-fields

## [0.51.0] - 2025-12-24

### Added

- `useAsyncSearch` — общий хук для async поиска с debounce (Combobox, Autocomplete)
- `AsyncQueryFn`, `AsyncQueryResult` — типы для async запросов
- Persistence TTL — опция `ttl` для времени жизни черновика
- `ClearDraftButton` — компонент кнопки очистки черновика
- `savedAt` — timestamp сохранения черновика в `FormPersistenceResult`

### Changed

- `FieldCombobox` и `FieldAutocomplete` используют `useAsyncSearch` вместо дублирования логики
- `useFormPersistence` теперь сохраняет данные в новом формате с метаданными (version, savedAt)
- Обратная совместимость со старым форматом сохранённых данных

## [0.50.0] - 2025-12-24

### Added

- `SelectionFieldLabel` — общий компонент для label+tooltip в selection полях
- `useGroupedOptions` — хук группировки опций (Combobox, Listbox, Select)
- `getOptionLabel` — утилита для получения label опции
- `zod-utils.ts` — централизованные функции `unwrapSchema`, `unwrapSchemaWithRequired`
- `LinkPopover` — модальное окно для ввода URL вместо `window.prompt()`
- Защита от циклических схем в `schema-traversal` (WeakSet + MAX_DEPTH=20)
- `SWITCH_STYLES` константы в `field-schedule.tsx`

### Changed

- `extractConstraints` рефакторинг с generic handler pattern
- `FormSteps` декомпозиция на хуки: `useStepState`, `useStepPersistence`, `useStepNavigation`
- Selection поля используют общие компоненты вместо дублирования

### Fixed

- `field-rich-text`: добавлен try/catch для JSON.parse

### Removed

- ~500 строк дублирующегося кода

## [0.49.0] и ранее

История изменений до v0.50.0 не документировалась.
