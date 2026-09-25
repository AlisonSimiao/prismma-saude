import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      '.agents/**',
      '.claude/**',
      '.codex/**',
    ],
  },
  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // Imports
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-duplicate-imports': 'error',
      'import/no-cycle': 'off',

      // Correção
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'error',
      'object-shorthand': 'warn',
      'prefer-template': 'warn',

      // React
      'react/jsx-no-target-blank': ['error', { allowReferrer: false }],
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'error',

      // Node / navegador
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-throw-literal': 'error',
      'no-return-await': 'error',
      'prefer-promise-reject-errors': 'error',

      // Shadowing (bug comum)
      'no-shadow': 'warn',
      'no-param-reassign': 'error',

      // Limites de bundle
      'complexity': ['warn', 15],
      'max-depth': ['warn', 4],
      'max-lines-per-function': ['warn', { max: 80, skipBlankLines: true, skipComments: true }],
    },
  },
];

export default eslintConfig;
