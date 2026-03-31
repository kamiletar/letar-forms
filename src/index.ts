// Form hook and contexts
export {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
  useTypedFormContext,
  useTypedFormSubscribe,
} from './lib/context'
export { useAppForm, withForm } from './lib/form-hook'

// Base form components (for naming/grouping)
export { FormField, useFormField, type FormFieldContextValue, type FormFieldProps } from './lib/form-field'
export { FormGroup, useFormGroup, type FormGroupContextValue, type FormGroupProps } from './lib/form-group'

// Components with TanStack Form integration
export {
  TanStackFormField,
  useTanStackFormField,
  type TanStackFormFieldContextValue,
  type TanStackFormFieldProps,
} from './lib/tanstack-form-field'

// Components with Chakra UI integration
export { ChakraFormField, type ChakraFormFieldProps } from './lib/chakra-form-field'

// Array field components
export {
  FormGroupList,
  FormGroupListItem,
  useFormGroupList,
  useFormGroupListItem,
  type FormGroupListContextValue,
  type FormGroupListItemContextValue,
  type FormGroupListItemProps,
  type FormGroupListProps,
} from './lib/form-group-list'

// Types
export type { BaseFieldProps, DeepKeys, DeepValue, FieldApi, FormApi } from './lib/types'

// Declarative forms API
export {
  ButtonSubmit,
  DeclarativeFormContext,
  FieldCombobox,
  FieldListbox,
  FieldNumber,
  FieldSegmentedGroup,
  FieldSelect,
  FieldString,
  Form,
  FormGroupDeclarative,
  FormGroupListDeclarative,
  // Relation field provider
  RelationFieldProvider,
  booleanMeta,
  commonMeta,
  createForm,
  dateMeta,
  enumMeta,
  numberMeta,
  // Metadata helpers
  relationMeta,
  textMeta,
  useDeclarativeField,
  useDeclarativeForm,
  useDeclarativeFormOptional,
  useRelationFieldContext,
  useRelationOptions,
  withRelations,
  // Enrich schema with UI metadata
  withUIMeta,
  withUIMetaDeep,
} from './lib/declarative'

export type {
  ComboboxFieldProps,
  ComboboxOption,
  DeclarativeFormContextValue,
  DeepUIMetaConfig,
  ExtendedForm,
  FieldTooltipMeta,
  FieldUIMeta,
  FormApiConfig,
  FormApiResult,
  FormApiState,
  FormGroupDeclarativeProps,
  FormGroupListDeclarativeProps,
  FormProps,
  FormPropsWithApi,
  ListboxFieldProps,
  ListboxOption,
  NumberFieldProps,
  // Relation provider types
  QueryHookResult,
  RelationConfig,
  RelationFieldConfig,
  RelationFieldContextValue,
  RelationOption,
  RelationState,
  SegmentedGroupFieldProps,
  SegmentedGroupOption,
  SelectFieldProps,
  SelectOption,
  SelectionFieldType,
  StringFieldProps,
  SubmitButtonProps,
  UIMetaConfig,
  UseCreateHook,
  UseQueryHook,
  UseUpdateHook,
} from './lib/declarative'

export { useFieldActions, useFormApi, useFormStepsContext, type FieldActionsResult } from './lib/declarative'

// Hooks for async search (Combobox, Autocomplete)
export { useAsyncSearch, useDebounce } from './lib/declarative'
export type { AsyncQueryFn, AsyncQueryResult, UseAsyncSearchOptions, UseAsyncSearchResult } from './lib/declarative'

// Field UI components
export { FieldLabel, FieldTooltip, type FieldLabelProps, type FieldTooltipProps } from './lib/declarative'

// Context utilities
export {
  createNamedGroupContext,
  createSafeContext,
  type NamedGroupContextValue,
  type SafeContextResult,
} from './lib/contexts'

// Offline support
export { FormOfflineIndicator, FormSyncStatus, useOfflineForm, useOfflineStatus, useSyncQueue } from './lib/offline'

export type {
  FormOfflineConfig,
  OfflineIndicatorProps,
  OfflineSubmitResult,
  SyncAction,
  SyncActionType,
  SyncStatusProps,
  UseOfflineFormOptions,
  UseOfflineFormResult,
  UseSyncQueueResult,
} from './lib/offline'

// i18n support
export { FormI18nProvider, getLocalizedValue, useFormI18n, useLocalizedOptions } from './lib/i18n'

export type { LocalizableOption, TranslateFunction, TranslateParams } from './lib/i18n'
