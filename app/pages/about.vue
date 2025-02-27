<template>
    <div class="max-w-4xl mx-auto p-6 space-y-6 text-center">
      <h1 class="text-4xl font-bold">About Us</h1>
      
      <section>
        <h2 class="text-2xl font-semibold">Who We Are</h2>
        <p class="text-gray-600 mt-2">
          Bonsus Clothing Store is dedicated to providing high-quality school uniforms and clothing solutions. 
          With a commitment to excellence, we ensure that students and institutions get the best apparel at affordable prices.
        </p>
      </section>
  
      <section>
        <h2 class="text-2xl font-semibold">What We Do</h2>
        <p class="text-gray-600 mt-2">
          We specialize in school uniforms, bulk orders for institutions, and retail sales. 
          Our goal is to provide durable, stylish, and comfortable clothing for students of all ages.
        </p>
      </section>
      
      <section>
        <h2 class="text-2xl font-semibold">Where to Find Us</h2>
        <p class="text-gray-600 mt-2">
          Visit our physical store at <strong>programme 5, Juja</strong> from <strong>Monday to Saturday, 9 AM - 6 PM</strong>. 
          You can also shop online and reach us on our social platforms.
        </p>
        <div class="flex justify-center gap-4 mt-4">
          <UButton to="https://www.facebook.com/bonsus" icon="i-lucide-facebook" variant="outline" size="lg">Facebook</UButton>
          <UButton to="https://www.instagram.com/bonsus"  variant="outline" size="lg">Instagram</UButton>
          <UButton to="/contact" variant="solid" size="lg">Contact Us</UButton>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  </script>
  