/**
 * @fileoverview ESLint Flat Configuration For `Internationalization (i18n)` Package
 */

import { tsFlatConfigs, tsLanguageOptions, typedTsOnly } from '@legis-link/eslint-config';
import { importX } from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';

import baseConfig from '../../eslint.config.js';

/**
 * ESLint Flat Configuration For `i18n` Package
 *
 * Extends The Base ESLint Configuration With Rules And Settings Tailored For The `i18n` Package, Enforcing Code Quality
 * And Consistency.
 *
 * @satisfies {import('typescript-eslint').ConfigArray}
 */
export default tseslint.config(
  ...baseConfig,
  ...tseslint.configs.recommended,
  ...typedTsOnly,
  importX.flatConfigs.typescript,
  tsLanguageOptions,
  ...tsFlatConfigs()
);
