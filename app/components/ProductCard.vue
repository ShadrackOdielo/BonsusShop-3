<script setup lang="js">
import { ref } from 'vue';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const showSizeModal = ref(false);
const selectedSize = ref(null);


// Accept props from the parent component
const props = defineProps({
    product: {
        type: Object ,
        required: true
    }
})


const toggleWishlist = () => {
  if (wishlistStore.isInWishlist(props.product.id)) {
    wishlistStore.removeFromWishlist(props.product.id);
  } else {
    wishlistStore.addToWishlist(props.product);
  }
};

const addToCart = () => {
  if (props.product.size) {
    showSizeModal.value = true;
  } else {
    cartStore.addToCart(props.product);
  }
};

const confirmAddToCart = () => {
  cartStore.addToCart(props.product, selectedSize.value);
  showSizeModal.value = false;
};
</script>
<template>
    <div class="relative ">
        <div>
        <NuxtLink :to="`/products/${props.product.slug}`">
            <img :src="props.product?.images[0] || '/placeholder.webp'" :alt="props.product.name" class="w-full h-64 object-cover rounded-lg" >
        </NuxtLink>
        <div class="absolute top-2 right-2 flex flex-col space-y-2">
            <UButton :icon="wishlistStore.isInWishlist(props.product.id) ? 'i-heroicons-heart-solid' : 'i-lucide-heart'" @click="toggleWishlist" />
            <UButton icon='i-lucide-shopping-cart' @click="addToCart" />
        </div>
        </div>
        <div class="p-4   rounded-lg">
            <NuxtLink :to="`/products/${props.product.slug}`">
                <h2 class="text-lg font-semibold">{{ props.product.name }}</h2>
            </NuxtLink>
            <p>{{ props.product.price }}</p>
        </div>
        <UModal v-model:open="showSizeModal">
            <template #header>
                <h2>Select Size</h2>
            </template>
            <template #body>
                <div v-for="size in props.product.sizes" :key="size" class="mb-2">
                    <UButton :label="size" @click="selectedSize = size" />
                </div>
            </template>
            <template #footer>
                <UButton @click="confirmAddToCart">Add to Cart</UButton>
            </template>
        </UModal>
    </div>
</template>