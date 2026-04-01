'use client'

import type { ReactElement, ReactNode } from 'react'
import type { OfflineIndicatorProps, SyncStatusProps } from '../../offline'
import type { AutoFieldsProps } from '../form-auto-fields'
import type {
  AutocompleteFieldProps,
  CheckboxCardFieldProps,
  ColorPickerFieldProps,
  ComboboxFieldProps,
  DateRangeFieldProps,
  EditableFieldProps,
  FileUploadFieldProps,
  ListboxFieldProps,
  NativeSelectFieldProps,
  PinInputFieldProps,
  RadioCardFieldProps,
  RadioGroupFieldProps,
  RatingFieldProps,
  RichTextFieldProps,
  ScheduleFieldProps,
  SegmentedGroupFieldProps,
  SelectFieldProps,
  SliderFieldProps,
  TagsFieldProps,
} from '../form-fields'
import type { FormFromSchemaProps } from '../form-from-schema'
import type {
  FormStepsCompletedContentProps,
  FormStepsIndicatorProps,
  FormStepsNavigationProps,
  FormStepsProps,
  FormStepsStepProps,
} from '../form-steps'
import type {
  CheckboxFieldProps,
  DateFieldProps,
  FormPropsWithApi,
  NumberFieldProps,
  NumberInputFieldProps,
  PasswordFieldProps,
  StringFieldProps,
  SubmitButtonProps,
  SwitchFieldProps,
  TextareaFieldProps,
  TimeFieldProps,
} from '../types'

/**
 * Typeы componentов для кнопок Form.Group.List
 * (Add, Remove, DragHandle)
 */
export interface ListButtonComponents {
  /** Add new element to array */
  Add: (props: { children?: ReactNode; defaultValue?: unknown }) => ReactElement
  /** Remove текущий element из arrayа */
  Remove: (props: { children?: ReactNode }) => ReactElement
  /** Ручка для drag-and-drop сортировки */
  DragHandle: (props: { children?: ReactNode }) => ReactElement
}

/**
 * Compound component for working with arrayами (Form.Group.List)
 */
export interface FormGroupListComponent {
  (props: {
    name: string
    children: ReactNode
    emptyContent?: ReactNode
    wrapper?: (props: { children: ReactNode }) => ReactNode
    /** Включить drag-and-drop сортировку элементов */
    sortable?: boolean
  }): ReactElement
  Button: ListButtonComponents
}

/**
 * Compound component for grouping fields (Form.Group)
 */
export interface FormGroupComponent {
  (props: { name: string; children: ReactNode }): ReactElement
  List: FormGroupListComponent
}

/**
 * Typeы всех Field componentов (Form.Field.*)
 */
export interface FormFieldComponents {
  // Текстовые поля
  String: (props: StringFieldProps) => ReactElement
  Textarea: (props: TextareaFieldProps) => ReactElement
  Password: (props: PasswordFieldProps) => ReactElement
  PasswordStrength: (props: {
    name?: string
    label?: string
    requirements?: string[]
    showRequirements?: boolean
  }) => ReactElement
  Editable: (props: EditableFieldProps) => ReactElement
  RichText: (props: RichTextFieldProps) => ReactElement
  MaskedInput: (props: { name?: string; label?: string; mask: string; placeholder?: string }) => ReactElement

  // Numberвые поля
  Number: (props: NumberFieldProps) => ReactElement
  NumberInput: (props: NumberInputFieldProps) => ReactElement
  Slider: (props: SliderFieldProps) => ReactElement
  Rating: (props: RatingFieldProps) => ReactElement
  Currency: (props: { name?: string; label?: string; currency?: string; decimalScale?: number }) => ReactElement
  Percentage: (props: { name?: string; label?: string; min?: number; max?: number }) => ReactElement

  // Date и time
  Date: (props: DateFieldProps) => ReactElement
  Time: (props: TimeFieldProps) => ReactElement
  DateRange: (props: DateRangeFieldProps) => ReactElement
  DateTimePicker: (props: { name?: string; label?: string; minDateTime?: Date; maxDateTime?: Date }) => ReactElement
  Duration: (props: { name?: string; label?: string; format?: string; min?: number; max?: number }) => ReactElement
  Schedule: (props: ScheduleFieldProps) => ReactElement

  // Выбор из списка
  Select: (props: SelectFieldProps) => ReactElement
  NativeSelect: <T extends string = string>(props: NativeSelectFieldProps<T>) => ReactElement
  Combobox: <T extends string = string, TData = unknown>(props: ComboboxFieldProps<T, TData>) => ReactElement
  Listbox: <T extends string = string>(props: ListboxFieldProps<T>) => ReactElement
  RadioGroup: <T extends string = string>(props: RadioGroupFieldProps<T>) => ReactElement
  RadioCard: <T extends string = string>(props: RadioCardFieldProps<T>) => ReactElement
  SegmentedGroup: <T extends string = string>(props: SegmentedGroupFieldProps<T>) => ReactElement
  Autocomplete: <TData = unknown>(props: AutocompleteFieldProps<TData>) => ReactElement
  CascadingSelect: (props: {
    name?: string
    label?: string
    dependsOn: string
    loadOptions: (parentValue: unknown) => Promise<unknown[]>
  }) => ReactElement
  Tags: (props: TagsFieldProps) => ReactElement

  // Чекбоксы и переkeyатели
  Checkbox: (props: CheckboxFieldProps) => ReactElement
  CheckboxCard: <T extends string = string>(props: CheckboxCardFieldProps<T>) => ReactElement
  Switch: (props: SwitchFieldProps) => ReactElement

  // Специализированные
  ColorPicker: (props: ColorPickerFieldProps) => ReactElement
  PinInput: (props: PinInputFieldProps) => ReactElement
  OTPInput: (props: {
    name?: string
    label?: string
    length?: number
    resendTimeout?: number
    onResend?: () => void
    autoSubmit?: boolean
  }) => ReactElement
  FileUpload: (props: FileUploadFieldProps) => ReactElement
  Phone: (props: { name?: string; label?: string; country?: string; showFlag?: boolean }) => ReactElement
  Address: (props: { name?: string; label?: string; provider?: string; apiKey?: string }) => ReactElement
  City: (props: { name?: string; label?: string }) => ReactElement
  Auto: (props: { name: string; label?: string }) => ReactElement
}

/**
 * Typeы кнопок form (Form.Button.*)
 */
export interface FormButtonComponents {
  /** Submit button form */
  Submit: (props: SubmitButtonProps) => ReactElement
  /** Кнопка сброса form к начальным значениям */
  Reset: (props: { children?: ReactNode; colorPalette?: string; variant?: string }) => ReactElement
}

/**
 * Compound component для stepов form (Form.Steps)
 */
export interface FormStepsComponent {
  (props: FormStepsProps): ReactElement
  /** Отдельный step form */
  Step: (props: FormStepsStepProps) => ReactElement
  /** Индикатор текущего stepа */
  Indicator: (props: FormStepsIndicatorProps) => ReactElement
  /** Buttons navigation between steps */
  Navigation: (props: FormStepsNavigationProps) => ReactElement
  /** Контент after завершения всех stepов */
  CompletedContent: (props: FormStepsCompletedContentProps) => ReactElement
}

/**
 * Главный compound component Form со всеми подкомпоненthereи
 */
export interface FormComponent {
  /** Корневой component form */
  <TData extends object>(props: FormPropsWithApi<TData>): ReactElement

  /** Grouping fields (namespace) */
  Group: FormGroupComponent

  /** Componentы fields */
  Field: FormFieldComponents

  /** Buttons form */
  Button: FormButtonComponents

  /** Отображение всех ошибок form */
  Errors: (props: { title?: ReactNode }) => ReactElement | null

  /** Интерактивный JSON-инспектор значений form (скрыт в production) */
  DebugValues: (props: { title?: string; collapsed?: number; showInProduction?: boolean }) => ReactElement | null

  /** Защита от потери несохранённых данных */
  DirtyGuard: (props: { message?: string; enabled?: boolean; onBlock?: () => boolean | void }) => ReactElement | null

  /** Условный рендеринг based on значения поля */
  When: <TValue = unknown>(props: {
    field: string
    is?: TValue
    isNot?: TValue
    in?: TValue[]
    notIn?: TValue[]
    condition?: (value: TValue) => boolean
    children: ReactNode
    fallback?: ReactNode
  }) => ReactNode

  /** Componentы for multi-step forms */
  Steps: FormStepsComponent

  /** Индикатор оффлайн-режима */
  OfflineIndicator: (props: OfflineIndicatorProps) => ReactElement | null

  /** Статус синхронизации оффлайн-данных */
  SyncStatus: (props: SyncStatusProps) => ReactElement | null

  /** Генерация form из JSON-конфига */
  Builder: (props: { config: unknown; children?: ReactNode }) => ReactElement

  /** Автоматическая генерация fields from Zod schema */
  AutoFields: (props: AutoFieldsProps) => ReactElement

  /** Полностью автоматическая form from Zod schema */
  FromSchema: <TData extends object>(props: FormFromSchemaProps<TData>) => ReactElement
}
