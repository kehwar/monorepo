<script setup lang="ts">
const images = getImageUrls().slice(0, 1)
</script>

<template>
    <div class="grid w-full grid-cols-2 gap-2">
        <PImage
            v-for="(image) in images"
            :key="image.i"
            preview
            :pt="{
                previewContainer: {
                    class: 'h-full',
                },
            }"
        >
            <template #image>
                <NuxtImg fit="inside" :height="200" :src="image.src" />
            </template>
            <template #preview="slotProps">
                <NuxtImg class="h-[100vh]" fit="inside" sizes="100vw sm:50vw md:400px lg:800px" :src="image.src" :style="slotProps.style" />
            </template>
        </PImage>
    </div>
</template>
