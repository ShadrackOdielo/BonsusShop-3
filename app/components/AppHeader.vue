<template>
  <header class=" shadow-md  w-full">
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Logo and Brand Name -->
       <div class="flex items-center space-x-4">
        <MobileMenu class="lg:hidden" />
      <NuxtLink to="/" class="flex items-center space-x-2">
        
        <img src="/logo.jpg" alt="Bonsus Clothing Logo" class="h-8 w-8" >
        <span class="font-bold text-lg">Bonsus Clothing</span>
      </NuxtLink>
    </div>
      <!-- Navigation Links -->
      <nav class="hidden md:flex space-x-4">
        <ULink to="/products" >Shop</ULink>
        <ULink to="/about" >About Us</ULink>
        <ULink to="/contact" >Contact</ULink>
      </nav>

      <!-- Icons -->
      <div class="flex items-center space-x-4">
        <!-- Search Icon -->
        <SearchModal />
        <!-- Wishlist Icon with Badge -->
        <UChip :text="wishlistCount" :show="wishlistCount > 0" >
          <UButton icon="i-lucide-heart" variant="ghost" to="/wishlist"/>
        </UChip>

        <!-- Account Icon -->
        <NuxtLink to="/account" aria-label="Account">
          <UIcon name="lucide:user" class="w-6 h-6" />
        </NuxtLink>

        <!-- Cart Icon with Badge -->
         <USlideover
         title="Shopping cart"
         :overlay="false"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      }">
        <UChip :text="cartCount" :show="cartCount > 0" >
          <UButton icon="i-lucide-shopping-cart" variant="ghost" :label="`ksh ${totalAmount}`"   />
        </UChip>
      <template #body>
        <div v-if="cartCount === 0" class="flex items-center justify-center h-64">
          <p class="text-gray-500">Your cart is empty</p>
          <UButton to="/products" variant="solid" class="ml-4">Shop Now</UButton>
        </div>
        <div v-for="item in cartStore.items" :key="item.product.id">
          <CartSlideoverItem :item="item" />
        </div>
      </template>
      <template #footer>
        <UButton to="/cart" variant="solid" class="w-full">View Cart</UButton>
        <UButton to="/checkout" variant="solid" class="w-full">Checkout</UButton>
        </template>
      </USlideover>
      </div>
    </div> 
  </header>
</template>

<script setup>

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
// make them computeds
const wishlistCount = computed(() => wishlistStore.items.length)
const cartCount = computed(() => cartStore.items.length)
const totalAmount = computed(() => {
  return cartStore.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 768px) {
  nav {
    display: none;
  }
}
</style>
