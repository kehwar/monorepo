<script setup lang="ts">
const images = getImageUrls()
</script>

<template>
    <ImageFull v-for="(image) in images" :key="image.i" :src="image.src" />
    <ImageTile v-for="(image) in images" :key="image.i" :src="image.src" />
</template>
