<template>
    <USlideover v-model:open="openMenu" side="left" title="Menu" >
      <UButton icon="i-lucide-menu" color="neutral" variant="subtle" />
  
      <template #body>
        <nav class="flex flex-col space-x-4" @click="openMenu = false">
            <ULink to="/" >Home</ULink>  
            <ULink to="/products"  >Shop</ULink>
            <ULink to="/about" >About Us</ULink>
            <ULink to="/contact" >Contact</ULink>
            <ULink to="/account" >Account</ULink>
            <ULink to="/wishlist" >Wishlist</ULink>
            <ColorModeButton />

          </nav>
              </template>
    </USlideover>
  </template>
  <script setup>
  const openMenu = ref(false)


    </script>