// app/composables/useData.ts
export type Transaction = {
    antecedents: string[]
    consequents: string[]
    support: number
    confidence: number
    lift: number
}

export type DataStats = {
    avgSupport: number,
    maxSupport: number,
    avgConfidence: number,
    maxConfidence: number,
    avgLift: number,
    maxLift: number
}

const LIMIT = 10

export const useData = () => {
    const allData = ref<Transaction[]>([])
    const filteredData = ref<Transaction[]>([])
    const curData = ref<Transaction[]>([])
    const curPage = ref<number>(1)
    const curRole = ref<string>('')

    const loading = ref(false)
    const error = ref<string | null>(null)

    const stats = ref<DataStats>()

    const calculateStats = (transactions: Transaction[]) => {
        if (transactions.length === 0) return null

        const supports = transactions.map(t => t.support)
        const confidences = transactions.map(t => t.confidence)
        const lifts = transactions.map(t => t.lift)

        stats.value = {
            avgSupport: supports.reduce((a, b) => a + b, 0) / supports.length,
            maxSupport: Math.max(...supports),
            avgConfidence: confidences.reduce((a, b) => a + b, 0) / confidences.length,
            maxConfidence: Math.max(...confidences),
            avgLift: lifts.reduce((a, b) => a + b, 0) / lifts.length,
            maxLift: Math.max(...lifts),
        }
    }

    const filterByMode = (mode?: number, keywords?: string[]) => {
        if (!mode || !keywords || keywords.length === 0) return allData.value

        return allData.value.filter(t => {
            const relevantTechs = mode === 1 ? t.antecedents : t.consequents
            return keywords.some(keyword =>
                relevantTechs.some(tech =>
                    tech.toLowerCase().includes(keyword.toLowerCase())
                )
            )
        })
    }

    const loadMore = (from: 'all' | 'filtered') => {
        const start = (curPage.value - 1) * LIMIT
        const end = start + LIMIT
        if (from === 'all') {
            allData.value.slice(start, end).forEach(e => {
                curData.value.push(e)
            })
        }
        else {
            filteredData.value.splice(start, end).forEach(e => {
                curData.value.push(e)
            })
        }
        curPage.value++
    }

    const fetchAll = async (rolePath?: string, mode?: number, keywords?: string[]) => {
        if (!rolePath || !mode) return
        loading.value = true
        curPage.value = 1
        error.value = null
        curData.value = []
        if (rolePath === curRole.value) {
            console.log('filtering all')
            try {
                filteredData.value = filterByMode(mode, keywords)
                calculateStats(filteredData.value)
                loadMore('filtered')
            } catch (err) {
                error.value = err instanceof Error ? err.message : 'Unknown error'
            }

        finally {
            loading.value = false
            return
        }
    }
    console.log('loading all')
    curRole.value = rolePath
    filteredData.value = []
    try {
        const response = await fetch(`/roles_rules/${rolePath}`)
        if (!response.ok) throw new Error(`Failed to load ${rolePath}`)

        const rawData = await response.json()

        let transactions: Transaction[] = rawData.map((item: any) => ({
            antecedents: item.antecedents.split(',').map((s: string) => s.trim()),
            consequents: item.consequents.split(',').map((s: string) => s.trim()),
            support: item.support,
            confidence: item.confidence,
            lift: item.lift,
        }))

        calculateStats(transactions)

        allData.value = transactions

        if (keywords) {
            filteredData.value = filterByMode(mode, keywords)
            calculateStats(filteredData.value)
            loadMore('filtered')
            return
        }
        calculateStats(allData.value)
        loadMore('all')
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
        loading.value = false
    }
}

    const clearAll = () => {
        loading.value = true
        curPage.value = 1
        filteredData.value = []
        loadMore('all')
    }

return {
    loading,
    curData,
    stats,
    fetchAll
}
}