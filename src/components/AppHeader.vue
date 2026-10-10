<script setup>
import { Bell, LogOut, Search } from 'lucide-vue-next'
defineProps({ user: { type: Object, required: true }, isAdmin: { type: Boolean, default: false } })
defineEmits(['logout'])
</script>

<template>
  <header class="topbar">
    <div class="topbar-search"><Search :size="17" /><span>Welcome back, {{ user.name.split(' ')[0] }}</span></div>
    <div class="topbar-actions">
      <span class="role-pill">{{ isAdmin ? 'Administrator' : 'Library member' }}</span>
      <button class="icon-button" aria-label="Notifications" title="Notifications"><Bell :size="18" /></button>
      <div class="avatar">{{ user.name.split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase() }}</div>
      <button class="icon-button" aria-label="Log out" title="Log out" @click="$emit('logout')"><LogOut :size="18" /></button>
    </div>
  </header>
</template>
