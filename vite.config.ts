import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    ignorePatterns: [
      'packages/sdk/**',
      'apps/web/**/*.svelte',
      '**/dist/**',
      '**/build/**',
      '**/.svelte-kit/**',
    ],
    options: {
      typeAware: true,
      typeCheck: false,
    },
  },
  fmt: {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 80,
    ignorePatterns: [
      'packages/sdk/**',
      'apps/api/openapi/**',
      '**/dist/**',
      '**/build/**',
      '**/.svelte-kit/**',
    ],
  },
});
