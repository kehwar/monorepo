/* eslint-disable sonarjs/no-duplicate-string */

import antfu from '@antfu/eslint-config'
import _ from 'lodash'
import { compatExtends } from './compat'
import type { OptionsConfig, UserConfigItem } from '@antfu/eslint-config'

const defaultConfig = { stylistic: { indent: 4, quotes: 'single' } } satisfies OptionsConfig

export function eslintConfig(options: OptionsConfig = {}, ...custom: UserConfigItem[]) {
    return antfu(

        // Options
        _.defaultsDeep(options, defaultConfig),

        // Native
        ..._eslintConfig(),
        ..._importsConfig(),
        ..._stylisticConfig(options),
        ..._testConfig(),
        ..._typescriptConfig(),
        ..._unicornConfig(),
        ..._yamlConfig(),

        // Plugins
        ..._lodashConfig(),
        ..._promiseConfig(),
        ..._sonarjsConfig(),
        ..._tailwindConfig(),

        // Custom
        ...custom,
    )
}
export function eslintVueConfig(options: OptionsConfig = {}, ...custom: UserConfigItem[]) {
    return eslintConfig(options, _vueConfig(), ...custom)
}

function _eslintConfig() {
    return [
        {
            files: ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
            rules: {
                'camelcase': [
                    'error',
                    {
                        allow: ['^UNSAFE_', '^U_', '^_', '^__'],
                        ignoreDestructuring: false,
                        ignoreGlobals: true,
                        ignoreImports: false,
                        properties: 'never',
                    },
                ],
                'no-multi-assign': 'error',
            },
        } satisfies UserConfigItem,
    ]
}
function _importsConfig() {
    return [
        {
            files: ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
            rules: {
                'import/newline-after-import': ['error', { considerComments: false } ],
                'import/order': [
                    'error',
                    {
                        alphabetize: {
                            caseInsensitive: true,
                            order: 'asc',
                        },
                        groups: [
                            'builtin',
                            'external',
                            'internal',
                            'unknown',
                            'parent',
                            'index',
                            'sibling',
                            'object',
                            'type',
                        ],
                    },
                ],
            },
        } satisfies UserConfigItem,
    ]
}
function _lodashConfig() {
    return [
        ...compatExtends('plugin:lodash/recommended'),
        {
            rules: {
                'lodash/chain-style': ['error', 'explicit'],
                'lodash/chaining': ['error', 'always', 2],
                'lodash/import-scope': ['error', 'full'],
                'lodash/matches-prop-shorthand': ['error', 'never'],
                'lodash/prefer-constant': 'off',
                'lodash/prefer-lodash-method': 'off',
                'lodash/prefer-lodash-typecheck': 'off',
                'lodash/prop-shorthand': ['error', 'never'],
            },
        } satisfies UserConfigItem,
    ]
}
function _promiseConfig() {
    return compatExtends('plugin:promise/recommended')
}
function _sonarjsConfig() {
    return [
        ...compatExtends('plugin:sonarjs/recommended'),
        {
            rules: {
                'sonarjs/prefer-immediate-return': 'off',
                'sonarjs/prefer-single-boolean-return': 'off',
            },
        } satisfies UserConfigItem,
    ]
}
function _stylisticConfig(options: OptionsConfig) {
    const quotes = typeof options.stylistic === 'object' && options.stylistic.quotes ? options.stylistic.quotes : defaultConfig.stylistic.quotes
    const indent = typeof options.stylistic === 'object' && options.stylistic.indent ? options.stylistic.indent : defaultConfig.stylistic.indent
    return [
        {
            files: ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
            rules: {
                'style/array-bracket-newline': ['error', { multiline: true } ],
                'style/array-bracket-spacing': [
                    'error',
                    'never',
                    { arraysInArrays: true, objectsInArrays: true, singleValue: false },
                ],
                'style/array-element-newline': ['error', 'consistent'],
                'style/arrow-parens': ['error', 'always'],
                'style/func-call-spacing': 'error',
                'style/indent': [
                    'error',
                    indent,
                    {
                        ArrayExpression: 1,
                        CallExpression: { arguments: 1 },
                        FunctionDeclaration: { body: 1, parameters: 1 },
                        FunctionExpression: { body: 1, parameters: 1 },
                        ImportDeclaration: 1,
                        MemberExpression: 1,
                        ObjectExpression: 1,
                        SwitchCase: 1,
                        VariableDeclarator: 1,
                        flatTernaryExpressions: false,
                        ignoreComments: false,
                        ignoredNodes: [
                            'TemplateLiteral *',
                            'JSXElement',
                            'JSXElement > *',
                            'JSXAttribute',
                            'JSXIdentifier',
                            'JSXNamespacedName',
                            'JSXMemberExpression',
                            'JSXSpreadAttribute',
                            'JSXExpressionContainer',
                            'JSXOpeningElement',
                            'JSXClosingElement',
                            'JSXFragment',
                            'JSXOpeningFragment',
                            'JSXClosingFragment',
                            'JSXText',
                            'JSXEmptyExpression',
                            'JSXSpreadChild',
                            'TSTypeParameterInstantiation',
                            'FunctionExpression > .params[decorators.length > 0]',
                            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
                            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
                        ],
                        offsetTernaryExpressions: false,
                        outerIIFEBody: 1,
                    },
                ],
                'style/lines-around-comment': [
                    'error',
                    {
                        afterBlockComment: false,
                        beforeBlockComment: true,

                        afterLineComment: false,
                        beforeLineComment: true,

                        allowArrayStart: true,
                        allowBlockStart: true,
                        allowClassStart: true,
                        allowEnumStart: true,
                        allowInterfaceStart: true,
                        allowModuleStart: true,
                        allowObjectStart: true,
                        allowTypeStart: true,
                        applyDefaultIgnorePatterns: true,
                        ignorePattern: '^\\s*@.*$',
                    },
                ],
                'style/quotes': ['error', quotes, { allowTemplateLiterals: true, avoidEscape: true } ],
            },
        } satisfies UserConfigItem,
    ]
}
function _tailwindConfig() {
    return [
        ...compatExtends('plugin:tailwindcss/recommended'),
        {
            rules: {
                'tailwindcss/no-custom-classname': [
                    'warn',
                    {
                        cssFiles: [],
                        whitelist: ['pi', 'pi-.+', 'p-.+', 'i-.+'],
                    },
                ],
            },
        },
        {
            files: ['tailwind.config.js'],
            rules: {
                'unicorn/prefer-module': 'off',
            },
        },
    ] satisfies UserConfigItem[]
}
function _testConfig() {
    return [
        {
            files: ['**/*.test.?([cm])[jt]s?(x)'],
            rules: {
                'no-console': 'off',
                'test/consistent-test-it': ['error', { fn: 'test' } ],
            },
        } satisfies UserConfigItem,
    ]
}
function _typescriptConfig() {
    return [
        {
            files: ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
            rules: {
                'ts/ban-ts-comment': [
                    'error',
                    {
                        'ts-expect-error': false,
                    },
                ],
                'ts/consistent-type-definitions': 'off',
                'ts/no-redeclare': 'off',
                'ts/no-use-before-define': 'off',
            },
        } satisfies UserConfigItem,
    ]
}
function _vueConfig() {
    return [
        {
            files: ['**/*.vue'],
            rules: {
                'vue/attributes-order': [
                    'error',
                    {
                        alphabetical: true,
                        order: [
                            'DEFINITION',
                            'LIST_RENDERING',
                            'CONDITIONALS',
                            'RENDER_MODIFIERS',
                            'GLOBAL',
                            ['UNIQUE', 'SLOT'],
                            'TWO_WAY_BINDING',
                            'OTHER_DIRECTIVES',
                            'OTHER_ATTR',
                            'EVENTS',
                            'CONTENT',
                        ],
                    },
                ],
                'vue/block-lang': ['error', { script: { lang: 'ts' } } ],
                'vue/component-api-style': ['error', ['script-setup'] ],
                'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] } ],
                'vue/define-emits-declaration': ['error', 'type-based'],
                'vue/define-props-declaration': ['error', 'type-based'],
            },
        },
    ]
}
function _yamlConfig() {
    return [
        {
            files: ['**/*.y?(a)ml'],
            rules: {
                'yaml/indent': ['error', 2],
            },
        } satisfies UserConfigItem,
    ]
}
function _unicornConfig() {
    return [
        {
            files: ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
            rules: {
                'unicorn/better-regex': ['error', { sortCharacterClasses: false } ],
                'unicorn/catch-error-name': 'error',
                'unicorn/consistent-destructuring': 'error',
                'unicorn/consistent-function-scoping': 'error',
                'unicorn/explicit-length-check': 'error',
                'unicorn/filename-case': ['error', { case: 'kebabCase' } ],
                'unicorn/new-for-builtins': 'error',
                'unicorn/no-array-callback-reference': 'error',
                'unicorn/no-array-push-push': 'error',
                'unicorn/no-array-reduce': 'error',
                'unicorn/no-await-expression-member': 'error',
                'unicorn/no-empty-file': 'error',
                'unicorn/no-lonely-if': 'error',
                'unicorn/no-useless-fallback-in-spread': 'error',
                'unicorn/no-useless-undefined': 'error',
                'unicorn/numeric-separators-style': 'error',
                'unicorn/prefer-date-now': 'error',
                'unicorn/prefer-module': 'error',
                'unicorn/prefer-optional-catch-binding': 'error',
                'unicorn/prefer-set-has': 'error',
                'unicorn/prefer-string-slice': 'error',
                'unicorn/prefer-ternary': 'error',
                'unicorn/switch-case-braces': ['error', 'always'],
            },
        } satisfies UserConfigItem,
    ]
}

export default eslintConfig
