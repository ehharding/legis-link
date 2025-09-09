/**
 * @fileoverview ESLint Flat Configuration For `Application` Package
 */

import { FlatCompat } from '@eslint/eslintrc';
import { tsFlatConfigs, tsLanguageOptions, typedTsOnly } from '@legis-link/eslint-config';
import { importX } from 'eslint-plugin-import-x';
import * as mdx from 'eslint-plugin-mdx';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

import baseConfig from '../../eslint.config.js';

const compat = new FlatCompat();

const compatConfig = compat.config({
  extends: [
    // https://github.com/vercel/next.js/discussions/49337
    'plugin:@next/eslint-plugin-next/core-web-vitals',
    // https://github.com/facebook/react/issues/28313
    'plugin:react-hooks/recommended',
  ],
});

/**
 * ESLint Flat Configuration For `Application` Package
 *
 * Extends The Base ESLint Configuration With Rules And Settings Tailored For The `Application` Package, Enforcing Code
 * Quality And Consistency.
 *
 * @satisfies {import('typescript-eslint').ConfigArray}
 */
export default tseslint.config(
  ...baseConfig,
  ...tseslint.configs.recommended,
  ...typedTsOnly,
  importX.flatConfigs.typescript,
  tsLanguageOptions,
  { ignores: ['pages/en/blog/**/*.{md,mdx}/**', 'public'] },
  {
    files: ['**/*.{js,mjs,ts,tsx,md,mdx}'],
    extends: [react.configs.flat['jsx-runtime'], ...compatConfig],
    settings: { react: { version: 'detect' } },
    rules: {
      /*================================================== Disabled ==================================================*/
      '@next/next/no-duplicate-head': 'off',

      '@typescript-eslint/no-require-imports': 'off',

      'import-x/no-duplicates': 'off',
    },
  },
  {
    files: ['**/*.{md,mdx}'],
    extends: [mdx.flat],
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: true }),
    rules: {
      /*================================================== Disabled ==================================================*/
      'no-irregular-whitespace': 'off',

      '@next/next/no-img-element': 'off',

      /*========================================== @next/eslint-plugin-next ==========================================*/
      '@next/next/no-html-link-for-pages': ['error', 'pages/'],
    },
  },
  {
    files: ['**/*.{mdx,tsx}'],
    rules: {
      /*================================================== Disabled ==================================================*/
      'react/no-unescaped-entities': 'off',

      /*=================================================== ESLint ===================================================*/
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
          message:
            'Default React import not allowed since we use the TypeScript jsx-transform. If you need a global type that collides with a React named export (such as `MouseEvent`), try using `globalThis.MouseHandler`',
        },
        {
          selector: "ImportDeclaration[source.value='react'] :matches(ImportNamespaceSpecifier)",
          message: 'Named * React import is not allowed. Please import what you need from React with Named Imports',
        },
      ],

      /*============================================ eslint-plugin-react =============================================*/
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
  mdx.flatCodeBlocks,
  ...tsFlatConfigs()
);
