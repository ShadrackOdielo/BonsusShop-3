<template>
  <div class="w-screen max-w-screen p-4">
    <!-- Hero Section -->
    <section id="hero" class="relative mb-12 h-96 flex items-center justify-center overflow-hidden rounded-2xl">
      <div class="absolute inset-0">
        <img 
        v-for="(image, index) in heroImages" :key="index" :src="image" class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 fade-in"
          :class="{ 'opacity-50 ': index === currentImage }" >
      </div>
      <div class="relative text-center">
        <h1 class="text-white text-4xl bg-black/50 p-6 rounded-lg">
          Quality School Uniforms,
           <span class="typed-text"/>
        </h1>
        <div class="mt-4 flex justify-center gap-4">
          <UButton to="/products" size="lg" variant="solid">Browse Products</UButton>
          <UButton to="/about" size="lg" variant="outline">Learn More</UButton>
        </div>
      </div>
    </section>

    <!-- Services Provided Section -->
    <section id="services" class="py-12 text-center">
      <h2 class="text-3xl mb-6">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Icon name="i-heroicons-academic-cap" class="text-5xl mb-4" />
          <p class="text-lg font-medium">School Uniforms</p>
          <p class="text-gray-600">Providing high-quality, durable uniforms for all institutions.</p>
        </div>
        <div>
          <Icon name="i-lucide-package" class="text-5xl mb-4" />
          <p class="text-lg font-medium">Bulk Orders</p>
          <p class="text-gray-600">Special discounts and tailored orders for organizations and businesses.</p>
        </div>
        <div>
          <Icon name="i-lucide-shopping-cart" class="text-5xl mb-4" />
          <p class="text-lg font-medium">Retail Sales</p>
          <p class="text-gray-600">Wide variety of clothing available for individual purchases.</p>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section id="featured-products" class="py-12">
      <h2 class="text-3xl mb-6 text-center">Featured Products</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Categories Section -->
    <section id="categories" class="py-12">
      <h2 class="text-3xl mb-6 text-center">Shop by Category</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <NuxtLink 
        v-for="category in categories.filter(c => c.product_count > 0)" :key="category.id" :to="`/product-category/${category.slug}`"
          class="block text-center p-4 rounded-lg hover:grayscale transition">
          <div 
          class="h-48 w-48 rounded-lg mx-auto mb-4 bg-cover bg-center flex items-center justify-center"
            :style="{ backgroundImage: `url(${category.image_url})` }">
            <h3 class="text-white text-lg font-semibold bg-black bg-opacity-50 px-2 py-1 rounded-lg">
              {{ category.name }} ({{ category.product_count }})
            </h3>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const supabase = useSupabaseClient()
const heroImages = ref([])
const products = ref([])
const categories = ref([])
const currentImage = ref(0)

onMounted(async () => {
  const { data: heroImageData } = await supabase.from('products').select('images').limit(6)
  heroImages.value = heroImageData?.map(img => img.image_url) || ['/placeholder.webp']

  const { data: productData } = await supabase.from('products').select('*').limit(8)
  const { data: productImages } = await supabase.from('product_images').select('*')
  products.value = productData.map(product => {
    const image = productImages.find(img => img.product_id === product.id)
    return { ...product, image_url: image ? image.image_url : '/placeholder.webp' }
  })

  const { data: categoryData } = await supabase.from('categories').select('*, products (id)')
  categories.value = categoryData.map(category => ({
    ...category,
    product_count: category.products.length
  })).sort((a, b) => b.product_count - a.product_count)

  setInterval(() => {
    currentImage.value = (currentImage.value + 1) % heroImages.value.length
  }, 5000)
})
</script>

<style>
.fade-in {
  animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.typed-text::after {
  content: '|';
  animation: typing 4s steps(20) infinite;
}
@keyframes typing {
  0% { content: 'B|'; }
  10% { content: 'Bu|'; }
  20% { content: 'Bulk |'; }
  30% { content: 'Bulk O|'; }
  40% { content: 'Bulk Or|'; }
  50% { content: 'Bulk Orders|'; }
  60% { content: 'Bulk O|'; }
  70% { content: 'B|'; }
  80% { content: 'R|'; }
  90% { content: 'Retail|'; }
  100% { content: 'R|'; }
}
</style>
