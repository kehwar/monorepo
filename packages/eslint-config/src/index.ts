import antfu from '@antfu/eslint-config'
import type { FlatConfigItem, StylisticConfig } from '@antfu/eslint-config'

const stylisticConfig: StylisticConfig = { indent: 4, quotes: 'single' }

export function eslintConfig(...config: FlatConfigItem[]) {
    return antfu(
        {
            stylistic: stylisticConfig,
        },
        yamlConfig(),
        // Custom
        ...config,
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
