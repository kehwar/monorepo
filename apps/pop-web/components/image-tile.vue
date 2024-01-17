<script setup lang="ts">
import { getImageProps } from '~/utils/image-props'

defineProps<{
    src: string
}>()

const { tile: imgProps } = getImageProps()
const isLoaded = ref(false)

function setIsLoaded(value: boolean) {
    isLoaded.value = value
}
</script>

<template>
    <div class="relative h-[200px] w-[200px] rounded">
        <PSkeleton v-if="!isLoaded" class="!absolute left-0 top-0 z-10 !h-full !w-full" />
        <NuxtImg
            class="h-full w-full"
            v-bind="{ ...imgProps, ...$attrs }"
            :src="src"
            @load="setIsLoaded(true)"
        />
    </div>
</template>
