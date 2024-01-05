import antfu from '@antfu/eslint-config'
import type { FlatConfigItem, StylisticConfig } from '@antfu/eslint-config'

const stylisticConfig: StylisticConfig = { indent: 2, quotes: 'single' }

export default function (...config: FlatConfigItem[]) {
  return antfu(
    {
      stylistic: stylisticConfig,
    },
    // Custom
    ...config,
  )
}
