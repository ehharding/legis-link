/**
 * @fileoverview ESLint flat configuration for the `@legis-link/website` package
 */

import next from '@next/eslint-plugin-next';
import * as mdx from 'eslint-plugin-mdx';
import react from 'eslint-plugin-react';
import * as hooks from 'eslint-plugin-react-hooks';

import baseConfig from '../../eslint.config.js';

/**
 * ESLint flat configuration for the `@legis-link/website` package
 * @remarks Extends the base ESLint configuration with rules and settings tailored for the package.
 */
export default baseConfig.concat([
  react.configs.flat['jsx-runtime'],
  hooks.configs.flat['recommended-latest'],
  next.configs['core-web-vitals'],
  mdx.flatCodeBlocks,
  {
    ignores: ['pages/en/blog/**/*.{md,mdx}/**', 'public', 'next-env.d.ts'],
  },
  {
    ignores: ['**/*.{md,mdx}', '**/*.{md,mdx}/**'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    settings: { react: { version: 'detect' } },
    rules: {
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      /*================================================== Disabled ==================================================*/
      'react/no-unescaped-entities': 'off', // Allow unescaped entities in JSX (e.g., apostrophes)
    },
  },
  {
    files: ['**/*.{md,mdx}/**'],
    rules: {
      /*================================================== Disabled ==================================================*/
      '@typescript-eslint/no-require-imports': 'off', // Markdown files may contain require imports
    },
  },
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: true }),
    rules: {
      '@next/next/no-html-link-for-pages': ['error', 'apps/site/pages/'],

      /*================================================== Disabled ==================================================*/
      'no-irregular-whitespace': 'off', // Markdown files may contain non-breaking spaces

      '@next/next/no-img-element': 'off', // Markdown files may contain images
    },
  },
]);
