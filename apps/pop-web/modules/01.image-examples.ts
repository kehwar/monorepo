import { addImports, addServerImports, addTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import dedent from 'dedent'
import fg from 'fast-glob'
import * as path from 'pathe'

export default defineNuxtModule({
    // The function holding your module logic, it can be asynchronous
    async setup(_, nuxt) {
        const cwd = nuxt.options.srcDir

        // Scan files
        const files: string[] = []
        const pattern = 'public/images/Ejemplos/**'
        async function scanFiles() {
            files.length = 0
            const updatedFiles = await fg(pattern, {
                cwd,
                absolute: true,
                onlyFiles: true,
            })
            files.push(...new Set(updatedFiles))
            return files
        }
        await scanFiles()

        addTemplate({
            filename: 'images.json',
            write: true,
            getContents: () => JSON.stringify(files.map((file) => path.relative(path.join(cwd, 'public'), file)), null, 4),
        })
        addTemplate({
            filename: 'images.ts',
            write: true,
            getContents: () => dedent`
                import images from './images.json'
                export const getImageUrls = () => images.map((src, i) => ({ src, i }))
            `,
        })
        const resolver = createResolver(nuxt.options.buildDir)
        addImports(
            [
                {
                    name: 'getImageUrls',
                    from: resolver.resolve('images'),
                },
            ],
        )
        addServerImports(
            [
                {
                    name: 'getImageUrls',
                    from: resolver.resolve('images'),
                },
            ],
        )
    },
})
