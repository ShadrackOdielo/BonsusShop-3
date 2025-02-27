import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [],
  }),
  actions: {
    addToWishlist(product) {
      if (!this.items.find(item => item.id === product.id)) {
        this.items.push(product);
        useToast().add({ title: 'Added to wishlist',description: `${product.name} added to wishlist`  ,color: 'success' });
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      useToast().add({ title: 'Removed from wishlist',description:  'item removed from wishlist' ,color: 'info' });
    },
    isInWishlist(productId) {
      return this.items.some(item => item.id === productId);
    },
  },
});
