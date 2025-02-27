<template>
    <UCard class="max-w-lg mx-auto p-6 shadow-lg">
      <h2 class="text-xl font-semibold text-center mb-4">Get in Touch</h2>
  
      <UForm :state="formState" class="space-y-4" @submit="handleSubmit">
        <UFormField label="Full Name" name="name">
          <UInput v-model="formState.name" placeholder="Enter your name" required />
        </UFormField>
  
        <UFormField label="Email Address" name="email">
          <UInput v-model="formState.email" type="email" placeholder="Enter your email" required />
        </UFormField>
  
        <UFormField label="Message" name="message">
          <UTextarea v-model="formState.message" placeholder="Type your message" required />
        </UFormField>
  
        <UButton type="submit" block variant="solid">Send Message</UButton>
      </UForm>
  
      <div class="flex justify-center gap-4 mt-6 text-lg">
        <NuxtLink to="https://facebook.com" target="_blank">
          <UIcon name="i-lucide-facebook" class="hover:text-blue-600" />
        </NuxtLink>
        <NuxtLink to="https://twitter.com" target="_blank">
          <UIcon name="i-lucide-twitter" class="hover:text-blue-400" />
        </NuxtLink>
        <NuxtLink to="https://instagram.com" target="_blank">
          <UIcon name="i-lucide-instagram" class="hover:text-pink-500" />
        </NuxtLink>
        <NuxtLink to="https://linkedin.com" target="_blank">
          <UIcon name="i-lucide-linkedin" class="hover:text-blue-700" />
        </NuxtLink>
      </div>
    </UCard>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useToast } from '#imports'
  
  const toast = useToast()
  const formState = reactive({
    name: '',
    email: '',
    message: ''
  })
  
  const handleSubmit = () => {
    toast.add({ title: 'Success', description: 'Your message has been sent!' })
    formState.name = ''
    formState.email = ''
    formState.message = ''
  }
  </script>
  