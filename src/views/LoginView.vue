<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function handleLogin() {
  error.value = null
  loading.value = true
  try {
    await authStore.login(username.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = 'Invalid username or password. Try: emilys / emilyspass'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
      
      <h1 class="text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6">
        Recipe Book
      </h1>
      <h2 class="text-xl font-semibold text-center dark:text-white mb-6">
        Sign In
      </h2>

      <!-- Error message -->
      <div v-if="error" class="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
        {{ error }}
      </div>

      <div class="flex flex-col gap-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          @click="handleLogin"
          :disabled="loading"
          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </div>

      <p class="text-center text-sm text-gray-400 dark:text-gray-500 mt-4">
        Use: <span class="font-mono">emilys</span> / <span class="font-mono">emilyspass</span>
      </p>

    </div>
  </div>
</template>