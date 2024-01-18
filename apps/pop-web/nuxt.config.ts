// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['nuxt-primevue', '@nuxt/image', 'nuxt-lodash', '@nuxt/ui', '@vueuse/nuxt'],
    css: ['primevue/resources/themes/lara-light-purple/theme.css'],
    primevue: {
        components: {
            prefix: 'P',
            include: ['DeferredContent', 'Image', 'ProgressSpinner', 'Skeleton'],
        },
        composables: {
            exclude: ['useToast'],
        },
    },
    colorMode: { preference: 'light' },
})
