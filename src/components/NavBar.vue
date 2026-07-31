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
  <nav class="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
    
    <div class="text-4xl font-bold text-green-600 dark:text-green-400" style="margin-left: 115px;">
      Recipe Book
    </div>

    <div class="flex items-center gap-4">
      <RouterLink to="/" class="text-gray-600 dark:text-gray-300 hover:text-green-600" style="padding-right: 20px;">
        Home
      </RouterLink>
      <RouterLink to="/bookmarks" class="text-gray-600 dark:text-gray-300 hover:text-green-600" style="margin-right: 20px;">
        Bookmarks
      </RouterLink>

      <!-- Dark mode toggle -->
      <button
        @click="toggleTheme"
        class="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-400" />
        <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      <!-- Login / Logout button -->
      <button
        v-if="authStore.isLoggedIn"
        @click="handleLogout"
        class="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm text-gray-600 dark:text-gray-300"
        style="margin-right: 95px;"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5" /> <!-- logout -->
        Logout
      </button>

      <RouterLink
        v-else
        to="/login"
        class="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm text-gray-600 dark:text-gray-300"
        style="margin-right: 95px;"
      >
        <ArrowLeftOnRectangleIcon class="w-5 h-5" /> <!-- login -->
        Login
      </RouterLink>
    </div>

  </nav>
</template>