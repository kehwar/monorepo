<script setup lang="ts">
const images = getImageUrls()
</script>

<template>
    <div class="grid grid-cols-[repeat(auto-fill,160px)] justify-center gap-2 sm:grid-cols-[repeat(auto-fill,200px)]">
        <template v-for="(image) in images" :key="image.i">
            <GalleryImage
                class="h-[160px] w-[160px] overflow-hidden rounded-3xl sm:h-[200px] sm:w-[200px]"
                :src="image.src"
            />
        </template>
    </div>
</template>
