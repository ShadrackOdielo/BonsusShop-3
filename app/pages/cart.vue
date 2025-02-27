<script setup>
import { useCartStore } from '@/stores/cart';
import CartCard from '@/components/CartCard.vue';

const cartStore = useCartStore();

const totalAmount = computed(() => {
  return cartStore.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Cart</h1>
    <div v-if="cartStore.items.length === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CartCard v-for="item in cartStore.items" :key="item.product.id" :item="item" />
      </div>
      <div class="mt-4 text-right">
        <p class="text-xl font-bold">Total: Ksh {{ totalAmount.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>