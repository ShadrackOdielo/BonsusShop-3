<script setup>
import { useWishlistStore } from '@/stores/wishlist';
import { useCartStore } from '@/stores/cart';
import ProductCard from '@/components/ProductCard.vue';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const moveToCart = (product) => {
  cartStore.addToCart(product);
  wishlistStore.removeFromWishlist(product.id);
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Wishlist</h1>
    <div v-if="wishlistStore.items.length === 0" class="text-center">
      <p>Your wishlist is empty.</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in wishlistStore.items" :key="product.id">
        <ProductCard :product="product" />
        <UButton @click="moveToCart(product)" class="mt-2">Move to Cart</UButton>
      </div>
    </div>
  </div>
</template>