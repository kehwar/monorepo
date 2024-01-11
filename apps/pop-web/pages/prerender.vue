<script setup lang="ts">
const images = getImageUrls().slice(0, 1)
</script>

<template>
    <NuxtImg v-for="(image) in images" :key="image.i" fit="inside" :height="200" :src="image.src" />
    <NuxtImg v-for="(image) in images" :key="image.i" class="h-[100vh]" fit="inside" sizes="100vw sm:50vw md:400px lg:800px" :src="image.src" />
</template>
