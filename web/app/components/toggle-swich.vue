<template>
    <button class="w-full h-full flex flex-col items-center bg-white ring ring-inset ring-accented rounded-lg relative cursor-pointer" @click="handleToggle"> 
        <div class="absolute rounded-lg bg-info-200 w-full h-10 transition-all" :class="activeLabel ===  2 ? 'translate-y-full' : 'translate-y-0'" />
        <div v-for="options in labels" :key="options.id" class="h-10 flex justify-center items-center z-2">
            <p class="w-full transition-all" :class="activeLabel === options.id ? 'text-lg font-bold' : 'text-base font-base'">{{options.label}}</p>
        </div>
    </button>
</template>
<script setup lang="ts">
const labels = [
    {
        id: 1,
        label: 'I already know',
    },
    {
        id: 2,
        label: 'I want to learn',
    }
]

const activeLabel = ref(1)

const handleToggle = throttle() => {
    activeLabel.value === 1 ? activeLabel.value = 2 : activeLabel.value = 1
}
</script>