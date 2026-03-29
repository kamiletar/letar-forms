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
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@chakra-ui/react',
    '@tanstack/react-form',
    'framer-motion',
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
    'use-mask-input',
    'zod',
    'zod/v4',
    'zod/v4/core',
  ],
  jsx: 'automatic',
  target: 'es2022',
  sourcemap: true,
})
