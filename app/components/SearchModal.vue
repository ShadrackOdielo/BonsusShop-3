<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const searchTerm = ref('')
const open = ref(false)
const supabase = useSupabaseClient()

const products = ref<any[]>([])
const categories = ref<any[]>([])
const status = ref('idle')
// a search filter function that emits a close event and pushes the search term to search page
const searchFilter = async () => {
  open.value = false
  const router = useRouter()
  await router.push({ path: '/products', query: { search: searchTerm.value } })
}
watch(searchTerm, async (newTerm) => {
  status.value = 'pending'

  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      slug,
      product_images ( image_url )
    `)
    .ilike('name', `%${newTerm}%`)

  const { data: categoriesData, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name,slug,image_url')
    .ilike('name', `%${newTerm}%`)

  if (productsError || categoriesError) {
    status.value = 'error'
    return
  }

  products.value = productsData?.map((product: any) => ({
    id: product.id,
    label: product.name,
    title: product.name,
    to: `/products/${product.slug}`,
    target: '_blank',
    suffix: `Ksh ${product.price}`,
    avatar: {
      src: product.product_images && product.product_images.length
        ? product.product_images[0].image_url
        : ''
    },
    onSelect: () =>{
      open.value = false 
      navigateTo(`/products/${product.slug}`)
    }
    
  })) || []

  categories.value = categoriesData?.map((category: any) => ({
    id: category.id,
    label: category.name,
    avatar: {
      src: category.image_url || '/placeholder.webp'
    },
    // to: `/products?category=${category.id}`
    to: 'https://google.com'
  })) || []

  status.value = 'done'
}, { immediate: true })

const groups = computed(() => [
  {
    id: 'products',
    label: searchTerm.value ? `Products matching “${searchTerm.value}”...` : 'Products',
    items: products.value,
    ignoreFilter: true
  },
  {
    id: 'categories',
    label: searchTerm.value ? `Categories matching “${searchTerm.value}”...` : 'Categories',
    items: categories.value,
    ignoreFilter: true
  }
])
</script>

<template>
  <UModal  v-model:open="open"  >
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-search"
    />

    <template #content>
      <UCommandPalette
        v-model:search-term="searchTerm"
        close
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search products or categories..."

        class="h-80"
        @keyup.enter="searchFilter" 
         @update:open="open = $event"
        
      />
    </template>
  </UModal>
</template>

