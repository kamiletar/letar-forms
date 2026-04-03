'use client'

import { Checkbox, Table } from '@chakra-ui/react'
import { useTableEditorContext } from './table-editor-context'

/**
 * Заголовок таблицы TableEditor.
 * Отображает названия колонок + опциональный select-all чекбокс.
 */
export function TableEditorHeader({ selectable, sortable }: { selectable?: boolean; sortable?: boolean }) {
  const { columns, rows, selectedRows, toggleSelectAll, readOnly } = useTableEditorContext()

  const allSelected = rows.length > 0 && selectedRows.size === rows.length
  const someSelected = selectedRows.size > 0 && !allSelected

  return (
    <Table.Header>
      <Table.Row>
        {/* Drag handle колонка */}
        {sortable && !readOnly && <Table.ColumnHeader w="40px" />}

        {/* Чекбокс select-all */}
        {selectable && !readOnly && (
          <Table.ColumnHeader w="40px" textAlign="center">
            <Checkbox.Root
              checked={allSelected ? true : someSelected ? 'indeterminate' : false}
              onCheckedChange={() => toggleSelectAll()}
              size="sm"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.ColumnHeader>
        )}

        {/* Колонки данных */}
        {columns.map((col) => (
          <Table.ColumnHeader key={col.name} w={col.width} textAlign={col.align}>
            {col.label}
            {col.required && <span style={{ color: 'var(--chakra-colors-red-500)', marginLeft: '2px' }}>*</span>}
          </Table.ColumnHeader>
        ))}

        {/* Колонка действий (удаление) */}
        {!readOnly && <Table.ColumnHeader w="40px" />}
      </Table.Row>
    </Table.Header>
  )
}
