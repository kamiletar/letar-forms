'use client'

import { Box, HStack, Separator, Text, VStack } from '@chakra-ui/react'
import type { ReactElement } from 'react'

export interface FormComparisonProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Оригинальные данные (до изменений) */
  original: T
  /** Текущие данные (после изменений) */
  current: T
  /** Zod-схема для labels из .meta({ ui: { title } }) */
  schema?: { _def?: { shape?: () => Record<string, { _def?: { meta?: { ui?: { title?: string } } } }> } }
  /** Кастомные labels */
  labels?: Record<string, string>
  /** Показывать только изменённые поля */
  onlyChanged?: boolean
  /** Поля для исключения */
  exclude?: string[]
}

/**
 * Form.Comparison — diff-view формы (было → стало).
 * Подсвечивает изменённые поля жёлтым фоном.
 */
export function FormComparison<T extends Record<string, unknown>>({
  original,
  current,
  schema,
  labels = {},
  onlyChanged = false,
  exclude = [],
}: FormComparisonProps<T>): ReactElement {
  // Извлекаем labels из схемы
  const schemaLabels: Record<string, string> = {}
  if (schema?._def?.shape) {
    try {
      const shape = schema._def.shape()
      for (const [key, fieldSchema] of Object.entries(shape)) {
        const title = fieldSchema?._def?.meta?.ui?.title
        if (title) schemaLabels[key] = title
      }
    } catch {}
  }

  const allKeys = [...new Set([...Object.keys(original), ...Object.keys(current)])]
    .filter((key) => !exclude.includes(key))

  const entries = allKeys
    .map((key) => ({
      key,
      label: labels[key] ?? schemaLabels[key] ?? humanizeKey(key),
      oldValue: original[key],
      newValue: current[key],
      changed: JSON.stringify(original[key]) !== JSON.stringify(current[key]),
    }))
    .filter((entry) => !onlyChanged || entry.changed)

  if (entries.length === 0) {
    return <Text color="fg.muted" fontSize="sm">Нет изменений</Text>
  }

  return (
    <VStack gap={3} align="stretch">
      {entries.map((entry, index) => (
        <Box
          key={entry.key}
          p={3}
          borderRadius="md"
          bg={entry.changed ? 'yellow.50' : 'transparent'}
          _dark={entry.changed ? { bg: 'yellow.900/20' } : {}}
        >
          <Text fontSize="xs" color="fg.muted" fontWeight="medium" mb={1}>
            {entry.label}
            {entry.changed && <Text as="span" color="orange.500" ml={1}>●</Text>}
          </Text>
          {entry.changed ? (
            <HStack gap={4} fontSize="sm">
              <Box flex={1}>
                <Text fontSize="xs" color="red.500" mb={0.5}>Было:</Text>
                <Text textDecoration="line-through" color="fg.muted">{formatValue(entry.oldValue)}</Text>
              </Box>
              <Box flex={1}>
                <Text fontSize="xs" color="green.500" mb={0.5}>Стало:</Text>
                <Text fontWeight="medium">{formatValue(entry.newValue)}</Text>
              </Box>
            </HStack>
          ) : (
            <Text fontSize="sm">{formatValue(entry.newValue)}</Text>
          )}
          {index < entries.length - 1 && <Separator mt={2} />}
        </Box>
      ))}
    </VStack>
  )
}

function humanizeKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').trim().replace(/^\w/, (c) => c.toUpperCase())
}

function formatValue(value: unknown): string {
  if (value == null) return '—'
  if (typeof value === 'boolean') return value ? 'Да' : 'Нет'
  if (value instanceof Date) return value.toLocaleDateString('ru-RU')
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}
