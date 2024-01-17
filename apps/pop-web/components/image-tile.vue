<script setup lang="ts">
defineProps<{
    src: string
}>()

const isLoaded = ref(false)
function setIsLoaded(value: boolean) {
    isLoaded.value = value
}
</script>

<template>
    <PDeferredContent class="relative h-[200px] w-[200px] rounded">
        <PSkeleton v-if="!isLoaded" class="!absolute left-0 top-0 z-10 !h-full !w-full" />
        <NuxtImg
            class="h-full w-full"
            v-bind="$attrs"
            fit="cover"
            format="webp"
            :height="200"
            :modifiers="{ rotate: null }"
            :src="src"
            :width="200"
            @load="setIsLoaded(true)"
        />
    </PDeferredContent>
</template>
