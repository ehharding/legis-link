/**
 * @fileoverview Configuration for `lint-staged`
 */

/**
 * Configuration for `lint-staged`.
 *
 * `lint-staged` runs tasks like formatters and linters against staged Git files. This helps ensure that code style and
 * quality issues are caught before they are committed.
 *
 * @see {@link http://github.com/lint-staged/lint-staged}
 * @satisfies {import('lint-staged').Configuration}
 */
export default {
  '**/*.{js,mjs,ts,tsx,md,mdx}': ['prettier --check --write', 'eslint --fix'],
  '**/*.css': ['stylelint --allow-empty-input --fix', 'prettier --write'],
  '**/*.{json,yml}': ['prettier --check --write'],
};
