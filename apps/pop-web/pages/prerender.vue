<script setup lang="ts">
const images = getImageUrls()

const imageProps = getImageProps()
</script>

<template>
    <NuxtImg v-for="(image, i) in images" :key="i" v-bind="imageProps.tile" :src="image.src" />
    <NuxtImg v-for="(image, i) in images" :key="i" v-bind="imageProps.full" :src="image.src" />
</template>
