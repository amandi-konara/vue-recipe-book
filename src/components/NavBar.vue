<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <nav class="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
    
    <div class="text-4xl font-bold text-green-600 dark:text-green-400" style="margin-left: 115px;">
      Recipe Book
    </div>

    <div class="flex items-center gap-4">
      <a href="/" class="text-gray-600 dark:text-gray-300 hover:text-green-600" style="padding-right: 20px;">
        Home
      </a>
      <a href="/bookmarks" class="text-gray-600 dark:text-gray-300 hover:text-green-600" style="margin-right: 20px;">
        Bookmarks
      </a>

      <!-- Dark mode toggle -->
      <button
        @click="toggleTheme"
        class="text-xl px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        style="margin-right: 95px;"
      >
        <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-400" />
        <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>

  </nav>
</template>