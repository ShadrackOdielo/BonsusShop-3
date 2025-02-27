<script setup>
import { useCartStore } from '@/stores/cart';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const increaseQuantity = () => {
  cartStore.addToCart(props.item.product, props.item.size);
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.items = cartStore.items.map(item => {
      if (item.product.id === props.item.product.id && item.size === props.item.size) {
        item.quantity -= 1;
      }
      return item;
    });
  } else {
    cartStore.removeFromCart(props.item.product.id, props.item.size);
  }
};
</script>

<template>
  <div class="flex items-center space-x-4 p-4 border rounded-lg">
    <img :src="props.item.product.image_url" alt="Product Image" class="w-16 h-16 object-cover rounded-lg">
    <div class="flex-1">
      <h2 class="text-lg font-semibold">{{ props.item.product.name }}</h2>
      <p>Ksh {{ props.item.product.price.toFixed(2) }}</p>
      <div class="flex items-center space-x-2">
        <UButton @click="decreaseQuantity">-</UButton>
        <span>{{ props.item.quantity }}</span>
        <UButton @click="increaseQuantity">+</UButton>
      </div>
    </div>
  </div>
</template>