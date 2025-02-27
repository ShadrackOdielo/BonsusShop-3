<script setup>
import { useRouter } from 'vue-router';

const min = ref(0);
const max = ref(1000);
const range = ref([min.value, max.value]);
const categories = ref([]);
const selectedCategories = ref([]);
const router = useRouter();
const supabase = useSupabaseClient();

const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('name,slug');
  if (!error) categories.value = data;
};
// define props for sort order and sort option
const props = defineProps({
  searchQuery: { type: String, default: '' },
  sortOption: { type: String, default: '' },
  sortOrder: { type: String, default: '' },
});


onMounted(fetchCategories);
watch([range, selectedCategories], () => {
  applyFilters();
});

const applyFilters = () => {
  const query = {};

  if (props.searchQuery) {
    query.search = props.searchQuery;
  }
  if (props.sortOption) {
    query.orderby = props.sortOption;
  }
  if (props.sortOrder) {
    query.order = props.sortOrder;
  }
  if (range.value[0] !== 0) {
    query.min = range.value[0];
  }
  if (range.value[1] !== 1000) {
    query.max = range.value[1];
  }
  if (selectedCategories.value.length) {
    query.categories = selectedCategories.value;
  }

  router.push({ query });
};

watch(
  () => [props.searchQuery, props.sortOption, props.sortOrder],
  applyFilters
);
const clearFilters = () => {
  range.value = [min.value, max.value];
  selectedCategories.value = [];
  applyFilters();
};

</script>

<template>
  <UCard class="w-64 h-full  overflow-scroll">
    <template #header>
    <h2>Filter Products</h2>
    </template>
    <div class="py-4">
      <h1>Filter By Price</h1>
    <USlider v-model:model-value="range" class="p-2" @update:model-value="applyFilters" />
    <UButtonGroup orientation="vertical">
      <UInputNumber v-model="range[0]" min="0" :max="max" placeholder="Min" />
      <USeparator label="To" />
      <UInputNumber v-model="range[1]" :min="min"  placeholder="Max"/>
    </UButtonGroup></div>
    <div class="py-4 ">
      <h1>Filter By Category</h1>
    <UCheckbox 
      v-for="category in categories" 
      :key="category.id"  
      :label="category.name"
      @update:model-value="(checked) => {
      if (checked) {
        selectedCategories.push(category.slug);
      } else {
        const index = selectedCategories.findIndex(c => c === category.slug);
        if (index !== -1) selectedCategories.splice(index, 1);
      }
      applyFilters()
      }"
    /></div>
    <UButton @click="clearFilters">Clear Filters</UButton>
  </UCard>
</template>
