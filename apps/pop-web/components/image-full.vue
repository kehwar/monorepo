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
    <NuxtImg
        class="h-[100vh]"
        v-bind="$attrs"
        fit="inside"
        format="webp"
        loading="lazy"
        :modifiers="{ rotate: null }"
        sizes="100vw sm:50vw md:400px lg:800px"
        :src="src"
        @load="setIsLoaded(true)"
    />
</template>
