import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    offline: 'src/lib/offline/index.ts',
    i18n: 'src/lib/i18n/index.ts',
  },
  format: ['esm'],
  dts: false,
  tsconfig: 'tsconfig.publish.json',
  splitting: true,
  treeshake: true,
  clean: true,
  outDir: 'dist',
  // Все зависимости — external (потребитель устанавливает сам)
  noExternal: [],
  external: [
    // React
    'react',
    'react-dom',
    'react/jsx-runtime',
    // UI
    '@chakra-ui/react',
    'framer-motion',
    'react-icons/lu',
    // Формы
    '@tanstack/react-form',
    // Валидация
    'zod',
    'zod/v4',
    'zod/v4/core',
    // DnD (optional)
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
    // Маски (optional)
    'use-mask-input',
    // RichText (optional)
    /^@tiptap\//,
    // JSON viewer (optional, for DebugValues)
    /^@uiw\/react-json-view/,
    // Offline (optional)
    'idb-keyval',
    // i18n (optional)
    'next-intl',
    // Next.js
    'next/navigation',
  ],
  jsx: 'automatic',
  target: 'es2022',
  sourcemap: true,
})
