/* eslint-disable max-lines, no-magic-numbers */

/**
 * @fileoverview Project-Wide ESLint Flat Configuration
 */

import js from '@eslint/js';
import { importX } from 'eslint-plugin-import-x';
import globals from 'globals';

/**
 * Project-Wide ESLint Flat Configuration
 *
 * Defines The ESLint Configuration For The Entire Monorepo, Enforcing Code Quality And Consistency Across All Packages.
 *
 * @satisfies {Array<import('eslint').Linter.Config>}
 */
export default [
  js.configs.recommended,
  importX.flatConfigs.recommended,
  {
    ignores: [
      '.next',
      '**/.open-next',
      '.turbo',
      '**/.wrangler',
      'build',
      'dist',
      'node_modules',
      'playwright-report',
      'storybook-static/**',
      'test-results',
      'global.d.ts',
      'junit.xml',
      'lcov.info',
    ],
  },
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },
    rules: {
      /*=================================================== ESLint ===================================================*/
      'array-callback-return': ['error', { allowImplicit: false, allowVoid: true, checkForEach: true }],
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': ['error', { includeExports: true }],
      'no-inner-declarations': ['error', 'functions', { blockScopedFunctions: 'disallow' }],
      'no-promise-executor-return': ['error', { allowVoid: false }],
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unassigned-vars': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': ['error', { ignore: [] }],
      'no-use-before-define': ['error', { allowNamedExports: false, classes: true, functions: true, variables: true }],
      'no-useless-assignment': 'error',
      'require-atomic-updates': ['error', { allowProperties: false }],

      'accessor-pairs': ['error', { setWithoutGet: true, getWithoutSet: false, enforceForClassMembers: true }],
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
      'block-scoped-var': 'error',
      camelcase: [
        'error',
        {
          properties: 'always',
          ignoreDestructuring: false,
          ignoreImports: false,
          ignoreGlobals: false,
          allow: [],
        },
      ],
      'capitalized-comments': [
        'error',
        'always',
        {
          line: {
            ignoreConsecutiveComments: true,
            ignoreInlineComments: false,
            ignorePattern: 'pragma|ignored',
          },
          block: {
            ignoreConsecutiveComments: false,
            ignoreInlineComments: false,
            ignorePattern: 'pragma|ignored',
          },
        },
      ],
      'class-methods-use-this': [
        'error',
        {
          exceptMethods: [],
          enforceForClassFields: true,
          ignoreOverrideMethods: false,
          ignoreClassesWithImplements: 'public-fields',
        },
      ],
      complexity: ['error', { max: 20, variant: 'modified' }],
      'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
      'consistent-this': ['error', 'that'],
      curly: ['error', 'all'],
      'default-case': ['error', { commentPattern: '/^No Default$/i' }],
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': ['error', { allowKeywords: true, allowPattern: '' }],
      eqeqeq: ['error', 'smart'],
      'func-name-matching': [
        'error',
        'always',
        {
          considerPropertyDescriptor: false,
          includeCommonJSModuleExports: false,
        },
      ],
      'func-names': ['error', 'always', { generators: 'always' }],
      'func-style': [
        'error',
        'expression',
        {
          allowArrowFunctions: true,
          allowTypeAnnotation: false,
          overrides: { namedExports: 'expression' },
        },
      ],
      'grouped-accessor-pairs': ['error', 'getBeforeSet'],
      'guard-for-in': 'error',
      'id-denylist': ['error', 'cb', 'e', 'err', 'ev'],
      'id-length': ['error', { min: 2, max: Infinity, properties: 'always', exceptions: [], exceptionPatterns: [] }],
      'init-declarations': ['error', 'always'],
      'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
      'max-classes-per-file': ['error', { max: 1, ignoreExpressions: false }],
      'max-depth': ['error', { max: 4 }],
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true, IIFEs: false }],
      'max-nested-callbacks': ['error', { max: 10 }],
      'max-params': ['error', { max: 3, countVoidThis: false }],
      'max-statements': ['error', 30, { ignoreTopLevelFunctions: false }],
      'new-cap': [
        'error',
        {
          newIsCap: true,
          capIsNew: true,
          newIsCapExceptions: [],
          capIsNewExceptions: [],
          newIsCapExceptionPattern: '',
          capIsNewExceptionPattern: '',
          properties: true,
        },
      ],
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': ['error', { allow: [], int32Hint: true }],
      'no-caller': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-continue': 'error',
      'no-div-regex': 'error',
      'no-else-return': ['error', { allowElseIf: true }],
      'no-empty-function': ['error', { allow: [] }],
      'no-eq-null': 'error',
      'no-eval': ['error', { allowIndirect: false }],
      'no-extend-native': ['error', { exceptions: [] }],
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-implicit-coercion': [
        'error',
        {
          boolean: true,
          number: true,
          string: true,
          disallowTemplateShorthand: true,
          allow: [],
        },
      ],
      'no-implicit-globals': ['error', { lexicalBindings: false }],
      'no-implied-eval': 'error',
      'no-invalid-this': ['error', { capIsConstructor: false }],
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': [
        'error',
        {
          ignore: [],
          ignoreArrayIndexes: false,
          ignoreDefaultValues: false,
          ignoreClassFieldInitialValues: false,
          enforceConst: true,
          detectObjects: false,
        },
      ],
      'no-multi-assign': ['error', { ignoreNonDeclaration: false }],
      'no-multi-str': 'error',
      'no-negated-condition': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-object-constructor': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [],
          ignorePropertyModificationsForRegex: [],
        },
      ],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-proto': 'error',
      'no-restricted-exports': [
        'error',
        {
          restrictedNamedExports: [],
          restrictedNamedExportsPattern: '',
          restrictDefaultExports: {
            direct: false,
            named: false,
            defaultFrom: false,
            namedFrom: false,
            namespaceFrom: false,
          },
        },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'event', message: 'Use local parameter instead.' },
        { name: 'fdescribe', message: 'Do not commit focused tests.' },
        { name: 'fit', message: 'Do not commit focused tests.' },
        { name: 'xdescribe', message: 'Do not commit skipped tests.' },
        { name: 'xit', message: 'Do not commit skipped tests.' },
      ],
      'no-restricted-imports': ['error', { paths: [], patterns: [] }],
      'no-restricted-properties': [
        'error',
        {
          object: 'arguments',
          property: 'callee',
          message: 'Use local parameter instead.',
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'BinaryExpression[operator="in"]',
          message: 'Use `hasOwnProperty` instead.',
        },
        {
          selector: 'CallExpression[callee.name="setInterval"][arguments.length!=2]',
          message: 'setInterval must always be invoked with two arguments.',
        },
        {
          selector: 'CallExpression[callee.name="setTimeout"][arguments.length!=2]',
          message: 'setTimeout must always be invoked with two arguments.',
        },
        {
          selector: 'FunctionExpression',
          message: 'Use arrow function instead.',
        },
        {
          selector: 'WithStatement',
          message: 'Use `await` instead.',
        },
      ],
      'no-return-assign': ['error', 'except-parens'],
      'no-script-url': 'error',
      'no-sequences': ['error', { allowInParentheses: true }],
      'no-shadow': [
        'error',
        {
          builtinGlobals: true,
          hoist: 'functions',
          allow: ['resolve', 'reject', 'done', 'cb'],
          ignoreOnInitialization: false,
        },
      ],
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-undefined': 'error',
      'no-underscore-dangle': [
        'error',
        {
          allow: [],
          allowAfterThis: false,
          allowAfterSuper: false,
          allowAfterThisConstructor: false,
          enforceInMethodNames: true,
          enforceInClassFields: true,
          allowInArrayDestructuring: false,
          allowInObjectDestructuring: false,
          allowFunctionParams: true,
        },
      ],
      'no-unneeded-ternary': ['error', { defaultAssignment: true }],
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false,
          enforceForJSX: true,
          ignoreDirectives: false,
        },
      ],
      'no-useless-call': 'error',
      'no-useless-computed-key': ['error', { enforceForClassMembers: true }],
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': ['error', { ignoreImport: false, ignoreExport: false, ignoreDestructuring: false }],
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': ['error', { allowAsStatement: false }],
      'no-warning-comments': [
        'error',
        {
          terms: ['TODO', 'FIXME', 'XXX'],
          location: 'start',
          decoration: ['/', '*', '='],
        },
      ],
      'object-shorthand': [
        'error',
        'always',
        {
          avoidQuotes: false,
          ignoreConstructors: false,
          methodsIgnorePattern: '',
          avoidExplicitReturnArrows: true,
        },
      ],
      'one-var': ['error', { var: 'never', let: 'never', const: 'never', separateRequires: true }],
      'operator-assignment': ['error', 'always'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: true,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: true,
          },
        },
        {
          enforceForRenamedProperties: true,
        },
      ],
      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: false }],
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      radix: ['error', 'as-needed'],
      'require-await': 'error',
      'require-unicode-regexp': ['error', { requireFlag: 'v' }],
      'sort-vars': ['error', { ignoreCase: false }],
      strict: ['error', 'safe'],
      'symbol-description': 'error',
      'vars-on-top': 'error',
      yoda: ['error', 'never', { exceptRange: false, onlyEquality: false }],

      'unicode-bom': ['error', 'never'],

      /*=========================================== eslint-plugin-import-x ===========================================*/
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/exports-last': 'error',
      'import-x/first': 'error',
      'import-x/group-exports': 'error',
      'import-x/max-dependencies': ['error', { max: 10, ignoreTypeImports: false }],
      'import-x/newline-after-import': ['error', { count: 1, exactCount: true, considerComments: true }],
      'import-x/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: true }],
      'import-x/no-amd': 'error',
      'import-x/no-commonjs': [
        'error',
        {
          allowRequire: false,
          allowConditionalRequire: false,
          allowPrimitiveModules: false,
        },
      ],
      'import-x/no-cycle': [
        'error',
        {
          allowUnsafeDynamicCyclicDependency: false,
          ignoreExternal: false,
          maxDepth: Infinity,
        },
      ],
      'import-x/no-deprecated': 'error',
      'import-x/no-dynamic-require': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: true,
          peerDependencies: true,
          bundledDependencies: true,
          includeInternal: false,
          includeTypes: false,
          whitelist: [],
        },
      ],
      'import-x/no-import-module-exports': ['error', { exceptions: [] }],
      'import-x/no-mutable-exports': 'error',
      'import-x/no-named-default': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-unassigned-import': ['error', { allow: [] }],
      'import-x/no-unused-modules': ['error', { missingExports: true, src: ['./'], ignoreExports: [] }],
      'import-x/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import-x/no-webpack-loader-syntax': 'error',
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          warnOnUnassignedImports: true,
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
        },
      ],
      'import-x/prefer-default-export': ['error', { target: 'single' }],
      'import-x/unambiguous': 'error',

      /*================================================== Disabled ==================================================*/
      'no-ternary': 'off', // Too Strict, Can Be Useful For Readability
      'sort-imports': 'off', // Handled By `eslint-plugin-import-x`
      'sort-keys': 'off', // Too Strict, Can Be Useful For Readability

      'import-x/namespace': 'off', // False Positives & Performance Issues
      'import-x/no-named-as-default-member': 'off', // Too Strict, Can Be Useful For Readability
      'import-x/no-unresolved': 'off', // Handled By TypeScript
    },
  },
];
