<script setup lang="ts">
const paths = getImagePaths()
</script>

<template>
    <div class="grid grid-cols-[repeat(auto-fill,160px)] justify-center gap-2 sm:grid-cols-[repeat(auto-fill,200px)]">
        <GalleryImage
            v-for="(src, i) in paths"
            :key="i"
            class="size-[160px] overflow-hidden rounded-3xl sm:size-[200px]"
            :src="src"
        />
    </div>
</template>
