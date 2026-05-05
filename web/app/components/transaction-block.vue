<template>
    <div class="rounded-lg flex gap-6 items-center w-full bg-neutral-700 text-info-300 px-10 py-4">
        <div class="w-60 shrink-0">
            <p v-for="ante in transaction.antecedents" :key="ante" 
               :class="isMatching(ante, mode === 1) ? 'bg-info-500 text-neutral-800 px-2 py-1 rounded w-max my-1' : ''">
                {{ ante }}
            </p>
        </div>
        <p class="text-5xl">→</p>
        <div class="w-60 shrink-0">
            <p v-for="cons in transaction.consequents" :key="cons"
               :class="isMatching(cons, mode === 2) ? 'bg-info-500 text-neutral-800 px-2 py-1 rounded w-max my-1' : ''">
                {{ cons }}
            </p>
        </div>
        <div class="w-full flex gap-4">
            <p class="ml-8">Support: {{ formatMetric(true, transaction.support) }}</p>
            <p class="ml-8">Confidence: {{ formatMetric(true, transaction.confidence) }}</p>
            <p class="ml-8">Lift: {{ formatMetric(false, transaction.lift) }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    transaction: Transaction,
    givenTechs: string[],
    mode: number
}>()

const isMatching = (tech: string, shouldCheck: boolean) => {
    if (!shouldCheck || !props.givenTechs || props.givenTechs.length === 0) return false
    
    return props.givenTechs.some(given =>
        tech.toLowerCase().includes(given.toLowerCase())
    )
}
</script>