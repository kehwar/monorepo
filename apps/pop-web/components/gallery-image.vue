<script setup lang="ts">
defineProps<{
    src: string
}>()

const { full, tile } = getImageProps()
const tileLoaded = ref(false)
const previewLoaded = ref(false)
const hidden = ref(false)
</script>

<template>
    <PDeferredContent v-if="!hidden" class="relative">
        <PSkeleton v-if="!tileLoaded" class="!absolute left-0 top-0 !h-full !w-full" />
        <PImage preview :pt="{ previewContainer: { class: 'h-[100vh] w-[100vw]' }, root: { class: 'h-full w-full bg-gray-100' }, icon: { class: 'touch:!hidden' } }">
            <template #image>
                <NuxtImg
                    class="h-full w-full object-cover"
                    v-bind="tile"
                    :src="src"
                    @error="hidden = true"
                    @load="tileLoaded = true"
                />
            </template>
            <template #preview="slotProps">
                <PProgressSpinner v-if="!previewLoaded" class="absolute left-[calc(50%-3rem)] top-[calc(50%-3rem)] h-[6rem] w-[6rem]" />
                <NuxtImg
                    class="h-full w-full object-contain"
                    v-bind="full"
                    :src="src"
                    :style="slotProps.style"
                    @error="hidden = true"
                    @load="previewLoaded = true"
                />
            </template>
        </PImage>
    </PDeferredContent>
</template>
