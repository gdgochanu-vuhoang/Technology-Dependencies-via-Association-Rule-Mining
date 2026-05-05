<template>
    <div class="bg-neutral-800 w-full h-full min-h-screen flex">
        <div class="h-full w-80 bg-neutral-700 fixed inset-0 flex flex-col px-6 py-20 gap-10">
            <div class="mb-10">
                <h1 class="text-xl text-info-300 font-bold text-center">Technology Dependencies <span
                        class="text-sm">via</span>
                    <br>Association Rule Mining
                </h1>
            </div>
            <div class="flex flex-col">
                <h3 class="text-lg font-bold text-info-300">Select Focus:</h3>
                <USelectMenu color="info" placeholder="No role selected..." v-model="activeRole" :items="roles" />
            </div>
            <div class="flex flex-col">
                <h3 class="text-lg font-bold text-info-300">Select Technology:</h3>
                <ToggleSwich v-model="curMode"/>
                <div
                    class="h-30 border border-info-300 rounded-lg p-3 bg-white focus-within:ring-2 focus-within:ring-info-200 mt-2 overflow-y-auto">
                    <div v-if="givenTechs.length > 0" class="flex flex-wrap gap-2 mb-2">
                        <UBadge v-for="(tag, idx) in givenTechs" :key="idx" color="info" variant="soft"
                            class="cursor-pointer hover:opacity-80 transition" @click="removeTech(idx)">
                            {{ tag }}
                            <UIcon name="i-lucide-x" class="ml-1 w-3 h-3" />
                        </UBadge>
                    </div>

                    <input v-model="givenTechsInput" type="text" name="techsInput" placeholder="Enter technologies..."
                        class="w-full outline-none bg-transparent text-sm" @focusout="handleTechsInput" />
                </div>
                <div class="flex gap-2 mt-2">
                    <UButton color="error" icon="i-lucide-x" label="Clear" class="w-1/3 cursor-pointer"
                        @click="handleClear" />
                    <UButton color="info" icon="i-lucide-search" label="Search" class="w-full cursor-pointer"
                        @click="handleSearch" />
                </div>
                <p class="text-sm text-info-200 mt-2">*Select your purpose & enter the name of technologies you are
                    interested in above, seperate each with a blank space " " or press enter after each one.</p>
            </div>
        </div>
        <div class="w-80 h-full shrink-0" />
        <div class="w-full">
            {{ curData }}
        </div>
    </div>
</template>
<script lang="ts" setup>

const activeRole = ref<{
    label: string,
    rules_path: string
}>()

const roles = [
    { label: 'Academic Researcher', rules_path: 'academic_researcher_rules.json' },
    { label: 'Blockchain Developer', rules_path: 'blockchain_rules.json' },
    { label: 'Cloud Infrastructure Engineer', rules_path: 'cloud_infrastructure_engineer_rules.json' },
    { label: 'Data Engineer', rules_path: 'data_engineer_rules.json' },
    { label: 'Data/Business Analyst', rules_path: 'data_or_business_analyst_rules.json' },
    { label: 'Data Scientist/ML Specialist', rules_path: 'data_scientist_or_machine_learning_specialist_rules.json' },
    { label: 'Database Administrator', rules_path: 'database_administrator_rules.json' },
    { label: 'Designer', rules_path: 'designer_rules.json' },
    { label: 'Developer Advocate', rules_path: 'developer_advocate_rules.json' },
    { label: 'Developer: AI/ML', rules_path: 'developer_ai_rules.json' },
    { label: 'Developer: Backend', rules_path: 'developer_back_end_rules.json' },
    { label: 'Developer: Desktop/Enterprise', rules_path: 'developer_desktop_or_enterprise_applications_rules.json' },
    { label: 'Developer: Embedded', rules_path: 'developer_embedded_applications_or_devices_rules.json' },
    { label: 'Developer: Experience', rules_path: 'developer_experience_rules.json' },
    { label: 'Developer: Frontend', rules_path: 'developer_front_end_rules.json' },
    { label: 'Developer: Full Stack', rules_path: 'developer_full_stack_rules.json' },
    { label: 'Developer: Game/Graphics', rules_path: 'developer_game_or_graphics_rules.json' },
    { label: 'Developer: Mobile', rules_path: 'developer_mobile_rules.json' },
    { label: 'Developer: QA/Test', rules_path: 'developer_qa_or_test_rules.json' },
    { label: 'DevOps Specialist', rules_path: 'devops_specialist_rules.json' },
    { label: 'Educator', rules_path: 'educator_rules.json' },
    { label: 'Engineer: Data', rules_path: 'engineer_data_rules.json' },
    { label: 'Engineer: Site Reliability', rules_path: 'engineer_site_reliability_rules.json' },
    { label: 'Engineering Manager', rules_path: 'engineering_manager_rules.json' },
    { label: 'Hardware Engineer', rules_path: 'hardware_engineer_rules.json' },
    { label: 'Marketing/Sales Professional', rules_path: 'marketing_or_sales_professional_rules.json' },
    { label: 'Product Manager', rules_path: 'product_manager_rules.json' },
    { label: 'Project Manager', rules_path: 'project_manager_rules.json' },
    { label: 'R&D Role', rules_path: 'research_development_role_rules.json' },
    { label: 'Scientist', rules_path: 'scientist_rules.json' },
    { label: 'Security Professional', rules_path: 'security_professional_rules.json' },
    { label: 'Senior Executive/VP', rules_path: 'senior_executive_vp_rules.json' },
    { label: 'Student', rules_path: 'student_rules.json' },
    { label: 'System Administrator', rules_path: 'system_administrator_rules.json' },
]

const givenTechsInput = ref('')
const givenTechs = ref<string[]>([])

const curMode = ref<number>()

const handleTechsInput = () => {
    if (!givenTechsInput.value.trim()) return

    const techs = givenTechsInput.value
        .trim()
        .split(/\s+/)
        .filter(t => t.length > 0)

    techs.forEach(tech => {
        if (!givenTechs.value.includes(tech)) {
            givenTechs.value.push(tech)
        }
    })

    givenTechsInput.value = ''
}

const removeTech = (idx: number) => {
    givenTechs.value.splice(idx, 1)
}

const handleClear = () => {
    givenTechs.value = []
    givenTechsInput.value = ''
}

const handleSearch = async () => {
    handleTechsInput()
    await fetchAll()
}

defineShortcuts({
    enter: {
        usingInput: 'techsInput',
        handler: handleTechsInput
    }
})

const { curData, stats, fetchAll } = useData()
</script>
