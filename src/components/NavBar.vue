<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { SunIcon, MoonIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const { isDark, toggleTheme } = useTheme()
const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm px-8 py-2 grid grid-cols-3 items-center border-b border-white/40 dark:border-gray-700 sticky top-0 z-50">

    <!-- Left spacer -->
    <div></div>

    <!-- Center — Logo -->
    <div class="flex items-center justify-center">
      <RouterLink to="/" class="flex items-center gap-2 text-4xl font-bold text-green-600 dark:text-green-400">
        <img src="@/assets/logo_recipebook.svg" alt="Recipe Book Logo" class="w-20 h-20" />
        Recipe Book
      </RouterLink>
    </div>

    <!-- Right — Nav links -->
    <div class="flex items-center justify-end gap-6 pr-8">
      <RouterLink
        to="/"
        class="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition"
        :class="$route.path === '/' ? 'bg-green-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/bookmarks"
        class="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition"
        :class="$route.path === '/bookmarks' ? 'bg-green-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
      >
        Bookmarks
      </RouterLink>

      <!-- Dark mode toggle -->
      <button
        @click="toggleTheme"
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-400" />
        <MoonIcon v-else class="w-5 h-5 text-gray-500 dark:text-gray-300" />
      </button>

      <!-- Logout button -->
      <button
        v-if="authStore.isLoggedIn"
        @click="handleLogout"
        class="flex items-center gap-1 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm text-gray-600 dark:text-gray-300 font-medium"
      >
        <ArrowRightOnRectangleIcon class="w-4 h-4" />
        Logout
      </button>

      <!-- Login button -->
      <RouterLink
        v-else
        to="/login"
        class="flex items-center gap-1 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm text-gray-600 dark:text-gray-300 font-medium"
      >
        <ArrowLeftOnRectangleIcon class="w-4 h-4" />
        Login
      </RouterLink>
    </div>

  </nav>
</template>