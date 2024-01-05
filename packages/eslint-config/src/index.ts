import antfu from '@antfu/eslint-config'
import type { FlatConfigItem, OptionsConfig } from '@antfu/eslint-config'
import _ from 'lodash'

const defaultConfig: OptionsConfig = { stylistic: { indent: 4, quotes: 'single' } }

export function eslintConfig(options: OptionsConfig = {}, ...custom: FlatConfigItem[]) {
    return antfu(
        // Defaults
        _.defaultsDeep(options, defaultConfig),
        yamlConfig(),
        // Custom
        ...custom,
    )
}

function yamlConfig() {
    return {
        files: ['**/*.y?(a)ml'],
        rules: {
            'yaml/indent': ['error', 2],
        },
    }
}

export default eslintConfig
