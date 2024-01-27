import type { Nuxt } from '@nuxt/schema'

export const RemoteFunctionPatterns = {
    query: [
        '*.trqc.*',
        'access-*',
        'acquire-*',
        'download-*',
        'fetch-*',
        'get-*',
        'list-*',
        'obtain-*',
        'pull-*',
        'read-*',
        'retrieve-*',
        'select-*',
    ],
    mutation: [
        '*.trmc.*',
        'add-*',
        'append-*',
        'archive-*',
        'ban-*',
        'block-*',
        'cancel-*',
        'deactivate-*',
        'delete-*',
        'disable-*',
        'enable-*',
        'execute-*',
        'expire-*',
        'flag-*',
        'hide-*',
        'lock-*',
        'mark-*',
        'merge-*',
        'modify-*',
        'move-*',
        'pin-*',
        'post-*',
        'process-*',
        'push-*',
        'reactivate-*',
        'reject-*',
        'remove-*',
        'rename-*',
        'restore-*',
        'send-*',
        'set-*',
        'submit-*',
        'update-*',
        'upsert-*',
        'upload-*',
        'write-*',
    ],
}

export const DefaultModuleOptions = {
    pattern: ['**/*.trpc.{ts,js,mjs}', '**/*.trqc.{ts,js,mjs}', '**/*.trmc.{ts,js,mjs}'] as string | string[],
    inject: {
        context: 'server/trpc/context',
    },
    client: {
        alias: 'trpc',
    },
    server: {
        baseUrl: '/api/trpc',
    },
    remoteFunctions: {
        enabled: true as const, // TODO: allow disabling remote functions
        patterns: {
            query: ['asd'] as string[],
            mutation: [] as string[],
        },
        default: 'error' as 'query' | 'mutation' | 'error',
    },
} as const satisfies ModuleOptions

export type ModuleOptions = {
    pattern: string | string[]
    inject: {
        context: string
    }
    client: {
        alias: string
    }
    server: {
        baseUrl: string
    }
    remoteFunctions: {
        enabled: boolean
        patterns: {
            query: string[]
            mutation: string[]
        }
        default: 'query' | 'mutation' | 'error'
    }
}
export type Options = ModuleOptions & {
    cwd: string
    nuxt: Nuxt
}
