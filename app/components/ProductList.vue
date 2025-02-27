<script setup>
import { useSupabaseClient } from '#imports';

const props = defineProps({
  searchQuery: { type: String, default: '' },
  sortOption: { type: String, default: '' },
  sortOrder: { type: String, default: '' },
});

const supabase = useSupabaseClient();
const products = ref([]);
const selectedCategories = ref([]);
const router = useRouter();

// watch url query params categories and add them to selectedCategories
watch(() => router.currentRoute.value.query.categories, (newCategories) => {
  selectedCategories.value = newCategories ? newCategories.split(',') : [];
});

const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (!error) products.value = data;
};

onMounted(fetchProducts);

const filteredProducts = computed(() => {
  return products.value
    .filter(product =>
      product.name.toLowerCase().includes(props.searchQuery.toLowerCase())
    ).filter(product =>
      selectedCategories.value.length
        ? props.selectedCategories.includes(product.category)
        : true
    ).slice().sort((a, b) => {
      if (props.sortOption === 'price') {
        return props.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return props.sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
   
});
</script>

<template>
  <UContainer>
    <UBreadcrumb :items="[{ label: 'Home', to: '/' }, { label: 'Products' }]" />
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in filteredProducts" :key="product.id" class="relative">
        <ProductCard :product="product" />
      </div>
    </div>
  </UContainer>
</template>