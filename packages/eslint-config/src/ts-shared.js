/* eslint-disable max-lines */

/**
 * @fileoverview Shared TypeScript-Specific ESLint Flat Configuration
 */

import tseslint from 'typescript-eslint';

/**
 * A Typed-Only Variant Of The Recommended TypeScript Configurations That:
 *   - Only Applies To `.ts`/`.tsx` Files
 *   - Preserves Each Original Preset Entry But Narrows The Rules To Only Apply To TypeScript
 *
 * @type {import('typescript-eslint').ConfigArray}
 */
const typedTsOnly = tseslint.configs.recommendedTypeChecked.map(config => {
  return {
    ...config,
    files: ['**/*.{ts,tsx}'],
  };
});

/**
 * Shared TypeScript Language Options
 *
 * Keeps JavaScript Parsing Available Via The TypeScript Project Service Fallback For Mixed Repositories
 *
 * @type {import('typescript-eslint').ConfigWithExtends}
 */
const tsLanguageOptions = {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.js'],
      },
    },
  },
};

const tsUnsafeOff = {
  rules: {
    // Too Strict
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
};

const tsTypedFileRules = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    /*================================================== Disabled ==================================================*/
    // Disabled In Favor Of `@typescript-eslint` Rules
    'class-methods-use-this': 'off',
    'default-param-last': 'off',
    'dot-notation': 'off',
    'init-declarations': 'off',
    'max-params': 'off',
    'no-empty-function': 'off',
    'no-loop-func': 'off',
    'no-magic-numbers': 'off',
    'no-restricted-imports': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'prefer-destructuring': 'off',

    /*============================================= @typescript-eslint =============================================*/
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
    '@typescript-eslint/class-methods-use-this': [
      'error',
      {
        enforceForClassFields: true,
        ignoreClassesThatImplementAnInterface: false,
        ignoreOverrideMethods: false,
        exceptMethods: [],
      },
    ],
    '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        arrayLiteralTypeAssertions: 'allow',
        objectLiteralTypeAssertions: 'allow',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/dot-notation': [
      'error',
      {
        allowIndexSignaturePropertyAccess: false,
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
        allowKeywords: true,
        allowPattern: '',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowExpressions: false,
        allowFunctionsWithoutTypeParameters: false,
        allowHigherOrderFunctions: true,
        allowIIFEs: false,
        allowTypedFunctionExpressions: true,
        allowedNames: [],
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        ignoredMethodNames: [],
        overrides: {
          accessors: 'explicit',
          constructors: 'explicit',
          methods: 'explicit',
          parameterProperties: 'explicit',
          properties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowHigherOrderFunctions: true,
        allowOverloadFunctions: false,
        allowTypedFunctionExpressions: true,
        allowedNames: [],
      },
    ],
    '@typescript-eslint/init-declarations': ['error', 'always'],
    '@typescript-eslint/max-params': ['error', { countVoidThis: false, max: 3 }],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: {
          optionalityOrder: 'required-first',
          order: 'as-written',
          memberTypes: [
            'signature',
            'call-signature',
            'public-static-field',
            'protected-static-field',
            'private-static-field',
            '#private-static-field',
            'public-decorated-field',
            'protected-decorated-field',
            'private-decorated-field',
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            '#private-instance-field',
            'public-abstract-field',
            'protected-abstract-field',
            'public-field',
            'protected-field',
            'private-field',
            '#private-field',
            'static-field',
            'instance-field',
            'abstract-field',
            'decorated-field',
            'field',
            'static-initialization',
            'public-constructor',
            'protected-constructor',
            'private-constructor',
            'constructor',
            'public-static-accessor',
            'protected-static-accessor',
            'private-static-accessor',
            '#private-static-accessor',
            'public-decorated-accessor',
            'protected-decorated-accessor',
            'private-decorated-accessor',
            'public-instance-accessor',
            'protected-instance-accessor',
            'private-instance-accessor',
            '#private-instance-accessor',
            'public-abstract-accessor',
            'protected-abstract-accessor',
            'public-accessor',
            'protected-accessor',
            'private-accessor',
            '#private-accessor',
            'static-accessor',
            'instance-accessor',
            'abstract-accessor',
            'decorated-accessor',
            'accessor',
            'public-static-get',
            'protected-static-get',
            'private-static-get',
            '#private-static-get',
            'public-decorated-get',
            'protected-decorated-get',
            'private-decorated-get',
            'public-instance-get',
            'protected-instance-get',
            'private-instance-get',
            '#private-instance-get',
            'public-abstract-get',
            'protected-abstract-get',
            'public-get',
            'protected-get',
            'private-get',
            '#private-get',
            'static-get',
            'instance-get',
            'abstract-get',
            'decorated-get',
            'get',
            'public-static-set',
            'protected-static-set',
            'private-static-set',
            '#private-static-set',
            'public-decorated-set',
            'protected-decorated-set',
            'private-decorated-set',
            'public-instance-set',
            'protected-instance-set',
            'private-instance-set',
            '#private-instance-set',
            'public-abstract-set',
            'protected-abstract-set',
            'public-set',
            'protected-set',
            'private-set',
            '#private-set',
            'static-set',
            'instance-set',
            'abstract-set',
            'decorated-set',
            'set',
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            '#private-static-method',
            'public-decorated-method',
            'protected-decorated-method',
            'private-decorated-method',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
            '#private-instance-method',
            'public-abstract-method',
            'protected-abstract-method',
            'public-method',
            'protected-method',
            'private-method',
            '#private-method',
            'static-method',
            'instance-method',
            'abstract-method',
            'decorated-method',
            'method',
          ],
        },
      },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'default', format: ['camelCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' },
      { selector: ['function', 'import'], format: ['camelCase', 'PascalCase'] },
      { selector: ['memberLike', 'parameter'], format: ['camelCase'] },
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'typeParameter', format: ['PascalCase'], prefix: ['T'] },
    ],
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: false, ignoreVoidOperator: false, ignoreVoidReturningFunctions: false },
    ],
    '@typescript-eslint/no-deprecated': ['error', { allow: [] }],
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': ['error', { allow: [] }],
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowConstructorOnly: false,
        allowEmpty: false,
        allowStaticOnly: false,
        allowWithDecorator: false,
      },
    ],
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: false, ignoreProperties: false }],
    '@typescript-eslint/no-invalid-void-type': [
      'error',
      { allowAsThisParameter: false, allowInGenericTypeArguments: true },
    ],
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        detectObjects: false,
        enforceConst: true,
        ignoreArrayIndexes: false,
        ignoreClassFieldInitialValues: false,
        ignoreDefaultValues: false,
        ignoreEnums: false,
        ignoreNumericLiteralTypes: false,
        ignoreReadonlyClassProperties: false,
        ignoreTypeIndexes: false,
        ignore: [],
      },
    ],
    '@typescript-eslint/no-meaningless-void-operator': ['error', { checkNever: false }],
    '@typescript-eslint/no-misused-spread': ['error', { allow: [] }],
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-restricted-imports': ['error', { paths: [], patterns: [] }],
    '@typescript-eslint/no-restricted-types': 'error',
    '@typescript-eslint/no-shadow': [
      'error',
      {
        builtinGlobals: true,
        ignoreOnInitialization: false,
        ignoreFunctionTypeParameterNameValueShadow: true,
        ignoreTypeValueShadow: true,
        hoist: 'functions-and-types',
        allow: ['resolve', 'reject', 'done', 'cb'],
      },
    ],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
      'error',
      { allowComparingNullableBooleansToTrue: false, allowComparingNullableBooleansToFalse: false },
    ],
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      { checkTypePredicates: true, allowConstantLoopConditions: 'never' },
    ],
    '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-template-expression': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-conversion': 'error',
    '@typescript-eslint/no-unnecessary-type-parameters': 'error',
    '@typescript-eslint/no-unsafe-type-assertion': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        allowNamedExports: false,
        classes: true,
        enums: true,
        functions: true,
        ignoreTypeReferences: false,
        typedefs: true,
        variables: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-useless-empty-export': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    '@typescript-eslint/parameter-properties': ['error', { prefer: 'class-property', allow: [] }],
    '@typescript-eslint/prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: true, object: false },
        AssignmentExpression: { array: true, object: false },
      },
      {
        enforceForDeclarationWithTypeAnnotation: true,
        enforceForRenamedProperties: true,
      },
    ],
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-find': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': ['error', { allowBitwiseExpressions: false }],
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      {
        ignoreBooleanCoercion: false,
        ignoreConditionalTests: true,
        ignoreMixedLogicalExpressions: false,
        ignoreTernaryTests: false,
        ignorePrimitives: { bigint: false, boolean: false, number: false, string: false },
      },
    ],
    '@typescript-eslint/prefer-optional-chain': [
      'error',
      {
        allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing: false,
        checkAny: true,
        checkBigInt: true,
        checkBoolean: true,
        checkNumber: true,
        checkString: true,
        checkUnknown: true,
        requireNullish: false,
      },
    ],
    '@typescript-eslint/prefer-readonly': ['error', { onlyInlineLambdas: false }],
    '@typescript-eslint/prefer-readonly-parameter-types': [
      'error',
      { checkParameterProperties: true, ignoreInferredTypes: false, treatMethodsAsReadonly: false, allow: [] },
    ],
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/prefer-return-this-type': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': ['error', { allowSingleElementEquality: 'never' }],
    '@typescript-eslint/promise-function-async': [
      'error',
      {
        allowAny: false,
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
        allowedPromiseNames: [],
      },
    ],
    '@typescript-eslint/related-getter-setter-pairs': 'error',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowAny: false,
        allowNullableBoolean: false,
        allowNullableEnum: false,
        allowNullableNumber: false,
        allowNullableObject: true,
        allowNullableString: false,
        allowNumber: true,
        allowString: true,
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': [
      'error',
      {
        allowDefaultCaseForExhaustiveSwitch: false,
        considerDefaultExhaustiveForUnions: false,
        requireDefaultForNonUnion: true,
        defaultCaseCommentPattern: '/^No Default$/iu',
      },
    ],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    '@typescript-eslint/unified-signatures': ['error', { ignoreDifferentlyNamedParameters: false }],
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
  },
};

const tsFlatConfigs = () => [tsUnsafeOff, tsTypedFileRules];

export { typedTsOnly, tsLanguageOptions, tsFlatConfigs };
