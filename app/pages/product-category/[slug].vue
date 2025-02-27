<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSupabaseClient } from '#imports';

const route = useRoute();
const supabase = useSupabaseClient();
const products = ref([]);
const category = ref(null);
const isLoading = ref(true);

const fetchCategory = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', route.params.slug)
    .single();
  if (!error) {
    category.value = data;
  }
};

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_name', route.params.slug);
  if (!error) {
    products.value = data;
  }
  isLoading.value = false;
};

onMounted(() => {
  fetchCategory();
  fetchProducts();
});
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <USkeleton />
  </div>
  <div v-else class="p-4">
    <h1 class="text-3xl font-bold mb-4">{{ category.name }}</h1>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="relative">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
