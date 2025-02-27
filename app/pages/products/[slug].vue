<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useSupabaseClient } from '#imports';
import { USkeleton } from '#components';

const route = useRoute();
const supabase = useSupabaseClient();
const product = ref(null);
const relatedProducts = ref([]);
const images = ref([]);
const isLoading = ref(true);
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const showSizeModal = ref(false);
const selectedSize = ref(null);

const fetchProduct = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), categories(name)')
    .eq('slug', route.params.slug)
    .single();
  if (!error) {
    product.value = data;
    images.value = data.product_images;
  }
  isLoading.value = false;
};

const fetchRelatedProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .neq('slug', route.params.slug)
    .limit(4);
  if (!error) {
    relatedProducts.value = data;
  }
};

onMounted(() => {
  fetchProduct();
  fetchRelatedProducts();
});

const addToCart = () => {
  if (product.value.size) {
    showSizeModal.value = true;
  } else {
    cartStore.addToCart(product.value);
  }
};

const confirmAddToCart = () => {
  cartStore.addToCart(product.value, selectedSize.value);
  showSizeModal.value = false;
};

const addToWishlist = () => {
  if (store.wishlistStore.isInWishlist(product.value.id)) {
    wishlistStore.removeFromWishlist(product.value.id);
  } else {
    wishlistStore.addToWishlist(product.value);
  }
};

const formattedPrice = computed(() => {
  return product.value ? `Ksh ${product.value.price.toFixed(2)}` : '';
});
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <USkeleton />
  </div>
  <div v-else class="p-4">
    <div class="flex flex-col lg:flex-row">
      <div class="lg:w-1/2">
        <UCarousel v-slot="item" :items="images" :ui="{ item: 'w-full h-96' }">
          <img :src="item.item.image_url" :alt="item.id" class="w-full h-full object-cover rounded-lg" />
        </UCarousel>
      </div>
      <div class="lg:w-1/2 lg:pl-8">
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-xl text-gray-700 mb-4">{{ formattedPrice }}</p>
        <p class="text-gray-600 mb-4">{{ product.description }}</p>
        <p class="text-gray-600 mb-4">{{ product.long_description }}</p>
        <div class="flex space-x-4 mb-4">
          <UButton @click="addToCart">Add to Cart</UButton>
          <UButton :icon="wishlistStore.isInWishlist(product.id) ? 'i-heroicons-heart-solid' : 'i-lucide-heart'" variant="outline" @click="addToWishlist">Add to Wishlist</UButton>
        </div>
        <div class="text-gray-500">
          <p>Category: {{ product.categories.name }}</p>
          <p>Created: {{ new Date(product.created_at).toLocaleDateString() }}</p>
          <p>Updated: {{ new Date(product.updated_at).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-4">Other Customers Also Viewed</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id">
          <ProductCard :product="relatedProduct" />
        </div>
      </div>
    </div>
    <UModal v-model:open="showSizeModal">
      <template #header>
        <h2>Select Size</h2>
      </template>
      <template #body>
        <div v-for="size in product.sizes" :key="size" class="mb-2">
          <UButton :label="size" @click="selectedSize = size" />
        </div>
      </template>
      <template #footer>
        <UButton @click="confirmAddToCart">Add to Cart</UButton>
      </template>
    </UModal>
  </div>
</template>
