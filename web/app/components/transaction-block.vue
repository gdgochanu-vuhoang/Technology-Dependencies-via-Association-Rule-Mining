<template>
    <div class="rounded-lg flex gap-6 items-center w-full bg-neutral-700 text-info-300 px-10 py-4">
        <div class="w-60 shrink-0">
            <p v-for="ante in transaction.antecedents" :key="ante">{{ ante }}</p>
        </div>
        <p class="text-5xl">→</p>
        <div class="w-60 shrink-0">
            <p v-for="cons in transaction.consequents" :key="cons">{{ cons }}</p>
        </div>
        <div class="w-full flex gap-4">
            <p class="ml-8">Support: {{ formatMetric(true, transaction.support) }}</p>
            <p class="ml-8">Confidence: {{ formatMetric(true, transaction.confidence) }}</p>
            <p class="ml-8">Lift: {{ formatMetric(false, transaction.lift) }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    transaction: Transaction
}>()
</script>