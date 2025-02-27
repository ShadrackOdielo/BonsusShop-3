<script setup>

const openFilter = ref(false);
const searchQuery = ref('');
const sortOption = ref('name');
const sortOrder = ref('asc');
const selectList = ref(['name','price',])
const router = useRouter()
const isAsc = computed(()=>sortOrder.value === 'asc')
const selectedCategories = ref([])
const toggleOrder = ()=>{
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// update searchqquery by watching the route query for search
watch(()=>router.currentRoute.value.query.search, (newSearch)=>{
  searchQuery.value = newSearch || ''
})
// fetch categories from route query
watch(()=>router.currentRoute.value.query.categories, (newCategories)=>{
  selectedCategories.value = newCategories ? newCategories.split(',') : []
})

const clearSearch = () => {
  searchQuery.value = ''
  router.push({
    query: { ...router.currentRoute.value.query, search: undefined }
  })
}
</script>

<template>
  <div class="h-screen flex lg:flex-col-2">
    <SidebarFilter v-if="openFilter" class="flex-none max-h-screen"  :sort-option="sortOption" :sort-order="sortOrder" :search-query="searchQuery" />
    <div class="flex-1 p-4">
      <div class="flex justify-between items-center mb-4">
        <UButton icon="i-lucide-filter" @click="openFilter = !openFilter">Filter</UButton>
        <UButtonGroup>
          <UButton
            color="neutral"
            variant="subtle"
            :icon="isAsc ? 'i-lucide-arrow-down-narrow-wide' : 'i-lucide-arrow-up-narrow-wide'"
            @click="toggleOrder" />
          <USelect v-model="sortOption" :items="selectList" class="w-40" />
        </UButtonGroup>
      </div>
      <div v-if="searchQuery" class="mb-4 p-2 bg-gray-100 flex items-center justify-between">
        <div>Current search: {{ searchQuery }}</div>
        <UButton class="ml-2" @click="clearSearch">Clear Search</UButton>
      </div>
      <ProductList :search-query="searchQuery" :sort-option="sortOption" :sort-order="sortOrder" :selected-categories="selectedCategories" />
    </div>
  </div>
</template>
