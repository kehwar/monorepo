import antfu from '@antfu/eslint-config'
import type { FlatConfigItem, OptionsConfig } from '@antfu/eslint-config'
import _ from 'lodash'

const defaultConfig = { stylistic: { indent: 4, quotes: 'single' } } satisfies OptionsConfig

export function eslintConfig(options: OptionsConfig = {}, ...custom: FlatConfigItem[]) {
    return antfu(

        // Defaults
        _.defaultsDeep(options, defaultConfig),
        _eslintConfig(),
        _stylisticConfig(options),
        _yamlConfig(),

        // Custom
        ...custom,
    )
}

function _eslintConfig() {
    return {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue'],
        rules: {
            // Eslint
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
    }
}
function _stylisticConfig(options: OptionsConfig) {
    const quotes = typeof options.stylistic === 'object' && options.stylistic.quotes ? options.stylistic.quotes : defaultConfig.stylistic.quotes
    const indent = typeof options.stylistic === 'object' && options.stylistic.indent ? options.stylistic.indent : defaultConfig.stylistic.indent
    return {
        files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.vue'],
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
    }
}
function _yamlConfig() {
    return {
        files: ['**/*.y?(a)ml'],
        rules: {
            'yaml/indent': ['error', 2],
        },
    }
}

export default eslintConfig
