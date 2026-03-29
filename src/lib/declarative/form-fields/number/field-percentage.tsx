'use client'

import { NumberInput } from '@chakra-ui/react'
import { type ReactElement, useMemo } from 'react'
import type { PercentageFieldProps } from '../../types'
import { createField, FieldWrapper } from '../base'

/**
 * Form.Field.Percentage - Поле ввода процентов
 *
 * Рендерит NumberInput с форматированием процентов и символом %.
 * Значение хранится как есть (50 = 50%), а не как десятичная дробь (0.5).
 *
 * @example Базовое использование (0-100%)
 * ```tsx
 * <Form.Field.Percentage name="discount" label="Скидка" />
 * ```
 *
 * @example С кастомным диапазоном
 * ```tsx
 * <Form.Field.Percentage name="margin" label="Маржа" min={0} max={50} />
 * ```
 *
 * @example С десятичными
 * ```tsx
 * <Form.Field.Percentage name="rate" label="Ставка" decimalScale={2} step={0.1} />
 * ```
 */
/** Состояние поля процентов */
interface PercentageFieldState {
  /** Мемоизированные опции форматирования */
  formatOptions: Intl.NumberFormatOptions
}

export const FieldPercentage = createField<PercentageFieldProps, number | undefined, PercentageFieldState>({
  displayName: 'FieldPercentage',

  useFieldState: (props) => {
    const { decimalScale = 0 } = props

    // Используем 'unit' стиль с percent, чтобы хранить целые числа (50 = 50%)
    // Стиль 'percent' от Chakra ожидает десятичные (0.5 = 50%)
    const formatOptions = useMemo(
      () => ({
        style: 'unit' as const,
        unit: 'percent',
        unitDisplay: 'short' as const,
        minimumFractionDigits: decimalScale,
        maximumFractionDigits: decimalScale,
      }),
      [decimalScale]
    )

    return { formatOptions }
  },

  render: ({ field, fullPath, resolved, hasError, errorMessage, componentProps, fieldState }): ReactElement => {
    const value = field.state.value as number | undefined

    const { min = 0, max = 100, step = 1, size } = componentProps

    const { formatOptions } = fieldState

    return (
      <FieldWrapper resolved={resolved} hasError={hasError} errorMessage={errorMessage} fullPath={fullPath}>
        <NumberInput.Root
          value={value?.toString() ?? ''}
          onValueChange={(details: { valueAsNumber: number }) => {
            const num = details.valueAsNumber
            field.handleChange(Number.isNaN(num) ? undefined : num)
          }}
          onBlur={field.handleBlur}
          min={min}
          max={max}
          step={step}
          formatOptions={formatOptions}
          clampValueOnBlur
          size={size}
        >
          <NumberInput.Control>
            <NumberInput.IncrementTrigger />
            <NumberInput.DecrementTrigger />
          </NumberInput.Control>
          <NumberInput.Input placeholder={resolved.placeholder} data-field-name={fullPath} />
        </NumberInput.Root>
      </FieldWrapper>
    )
  },
})
