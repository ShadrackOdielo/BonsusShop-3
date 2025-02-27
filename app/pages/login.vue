<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  if (error) console.log(error)
}

</script>
<template>
  <div>
    <UButton icon="i-mdi-google" variant='outline' @click="signInWithOtp">
      Sign In with E-Mail
    </UButton>
    <UInput
      v-model="email"
      type="email"
    />
  </div>
</template>