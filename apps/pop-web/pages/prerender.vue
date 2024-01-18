<script setup lang="ts">
const paths = getImagePaths()

const imageProps = getImageProps()
</script>

<template>
    <NuxtImg v-for="(src, i) in paths" :key="i" v-bind="imageProps.tile" :src="src" />
    <NuxtImg v-for="(src, i) in paths" :key="i" v-bind="imageProps.full" :src="src" />
</template>
