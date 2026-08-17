import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * eslint-config-next 16 ships a ready-made flat config,
 * so the FlatCompat shim is not needed.
 */
const eslintConfig = [
  {
    ignores: ['out/**', '.next/**', 'node_modules/**', 'legacy/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // A static export has no image optimizer - <img> with pre-built
      // AVIF/WebP variants is a deliberate choice here.
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default eslintConfig;
