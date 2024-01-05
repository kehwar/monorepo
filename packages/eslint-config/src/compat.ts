/**
 * @see https://github.com/eslint/eslintrc?tab=readme-ov-file#usage-esm
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'

// @ts-expect-error - no types
import { FlatCompat } from '@eslint/eslintrc'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const compat = new FlatCompat({
    baseDirectory: dirname,
})

export function compatExtends(name: string) {
    return compat.extends(name)
}
