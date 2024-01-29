import _ from 'lodash'
import { loadFile } from 'magicast'
import { minimatch } from 'minimatch'
import * as path from 'pathe'
import { RemoteFunctionPatterns } from './options'
import type { Options } from './options'

export async function parseProcedurePath(file: string, options: Options) {
    const { cwd } = options
    const relativePath = path.relative(cwd, file)
    const routerPathName = path.dirname(relativePath).split(path.sep).map((dir) => _.camelCase(dir)).join('.')
    const procedureName = _.camelCase(path.basename(relativePath, path.extname(relativePath)).split('.').slice(0, -1).join('_'))
    const importPath = path.join(cwd, path.dirname(relativePath), path.basename(relativePath, path.extname(relativePath)))
    const importName = [_.camelCase(routerPathName), procedureName].join('_')
    const baseName = path.basename(relativePath)
    const action = await getASTAction(file) ?? getAction(baseName, options)
    return {
        routerPathName,
        procedureName,
        importPath,
        importName,
        action,
        baseName,
    }
}
export type TRPCProcedure = Awaited<ReturnType<typeof parseProcedurePath>>

export function getAction(baseName: string, { remoteFunctions }: Options) {
    const { patterns, default: defaultType } = remoteFunctions
    if (patterns.query.some((pattern) => minimatch(baseName, pattern)))
        return 'query'
    if (patterns.mutation.some((pattern) => minimatch(baseName, pattern)))
        return 'mutate'
    if (RemoteFunctionPatterns.query.some((pattern) => minimatch(baseName, pattern)))
        return 'query'
    if (RemoteFunctionPatterns.mutation.some((pattern) => minimatch(baseName, pattern)))
        return 'mutate'
    return defaultType === 'mutation' ? 'mutate' : defaultType
}

async function getASTAction(file: string) {
    const code = await loadFile(file, {})
    const defaultExportAST = code.exports.default.$ast
    if (defaultExportAST == null)
        throw new Error(`No default export found in ${file}`)
    const calleeName = defaultExportAST.callee.name
    if (calleeName === 'defineTRPCQuery')
        return 'query'
    if (calleeName === 'defineTRPCMutation')
        return 'mutate'
    if (calleeName === 'defineTRPCProcedure') {
        const actionName = defaultExportAST?.arguments?.[0]?.body?.callee?.property?.name
        if (actionName === 'query')
            return 'query'
        if (actionName === 'mutation')
            return 'mutate'
    }
}
