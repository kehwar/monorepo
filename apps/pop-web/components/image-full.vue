<script setup lang="ts">
defineProps<{
    src: string
}>()

const { full: imgProps } = getImageProps()
const isLoaded = ref(false)

function setIsLoaded(value: boolean) {
    isLoaded.value = value
}
</script>

<template>
    <NuxtImg
        class="h-[100vh]"
        v-bind="{ ...imgProps, ... $attrs }"
        :src="src"
        @load="setIsLoaded(true)"
    />
</template>
