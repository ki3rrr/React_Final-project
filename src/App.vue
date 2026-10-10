<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import { useAuth } from './composables/useAuth'

const route = useRoute()
const router = useRouter()
const { currentUser, isAdmin, logout } = useAuth()
const isAuthPage = computed(() => ['login', 'register'].includes(route.name))

function handleLogout() {
  logout()
  router.replace({ name: 'login' })
}
</script>

<template>
  <div class="app-shell">
    <template v-if="!isAuthPage && currentUser">
      <AppSidebar :user="currentUser" :is-admin="isAdmin" @logout="handleLogout" />
      <div class="main-column">
        <AppHeader :user="currentUser" :is-admin="isAdmin" @logout="handleLogout" />
        <main class="page-content">
          <RouterView />
        </main>
      </div>
    </template>
    <RouterView v-else />
  </div>
</template>
