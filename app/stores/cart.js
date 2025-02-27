import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCart(product, size = null) {
      const item = this.items.find(item => item.product.id === product.id && item.size === size);
      if (item) {
        item.quantity += 1;
      } else {
        this.items.push({ product, size, quantity: 1 });
      }
      useToast().add({ title: 'Added to cart',description: `${product.name} added to cart`  ,color: 'success' });
    },
    removeFromCart(productId, size = null) {
      this.items = this.items.filter(item => item.product.id !== productId || item.size !== size);
      useToast().add({ title: 'Removed from cart',description:  'iem removed from cart' ,color: 'info' });
    },
    isInCart(productId, size = null) {
      return this.items.some(item => item.product.id === productId && item.size === size);
    },
  },
});
