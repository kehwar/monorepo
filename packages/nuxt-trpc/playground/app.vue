<!-- eslint-disable unicorn/no-array-push-push -->
<!-- eslint-disable no-console -->
<!-- eslint-disable antfu/top-level-function -->
<script setup lang="ts">
import { sayTest } from './features/dev/src/say-test.trpc'
import { sayGoodbye } from './features/landing/src/say-goodbye.trpc'
import { sayHello } from './features/landing/src/say-hello.trpc'

onMounted(() => {
    console.log('Mounted')
})

const arr1 = ref<string[]>([])
async function action() {
    arr1.value.push(await sayTest())
    arr1.value.push(await sayHello())
    arr1.value.push(await sayGoodbye())
}
</script>

<template>
    <button @click="() => action()">
        Click
    </button>
    <div v-for="(message, i) of arr1" :key="i">
        {{ message }}
    </div>
</template>
