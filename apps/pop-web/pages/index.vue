<script setup lang="ts">
const images = getImageUrls()
</script>

<template>
    <div class="flex w-full flex-wrap gap-2">
        <template
            v-for="(image) in images"
            :key="image.i"
        >
            <PImage
                preview
                :pt="{
                    previewContainer: {
                        class: 'h-full',
                    },
                }"
            >
                <template #image>
                    <ImageTile :src="image.src" />
                </template>
                <template #preview="slotProps">
                    <ImageFull :src="image.src" :style="slotProps.style" />
                </template>
            </PImage>
        </template>
    </div>
</template>
