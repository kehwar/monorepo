<script setup lang="ts">
const images = getImageUrls()
</script>

<template>
    <div class="flex w-full flex-wrap gap-2">
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
                <NuxtImg fit="inside" format="webp" height="60px" :src="image.src" />
            </template>
            <template #preview="slotProps">
                <NuxtImg fit="inside" format="webp" height="800px" :src="image.src" :style="slotProps.style" />
            </template>
        </PImage>
    </div>
</template>
