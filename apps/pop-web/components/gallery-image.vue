<script setup lang="ts">
defineProps<{
    src: string
}>()

const { full, tile } = getImageProps()
const isLoaded = ref(false)
const hidden = ref(false)

function setIsLoaded(value: boolean) {
    isLoaded.value = value
}
</script>

<template>
    <PDeferredContent v-if="!hidden" class="relative">
        <PSkeleton v-if="!isLoaded" class="!absolute left-0 top-0 !h-full !w-full" />
        <PImage preview :pt="{ previewContainer: { class: 'h-full' } }">
            <template #image>
                <NuxtImg
                    class="h-full w-full"
                    v-bind="tile"
                    :src="src"
                    @error="hidden = true"
                    @load="setIsLoaded(true)"
                />
            </template>
            <template #preview="slotProps">
                <NuxtImg
                    class="h-[100vh]"
                    v-bind="full"
                    :src="src"
                    :style="slotProps.style"
                    @error="hidden = true"
                />
            </template>
        </PImage>
    </PDeferredContent>
</template>
