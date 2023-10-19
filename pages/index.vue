<template>
  <div class="flex flex-col items-center overflow-x-hidden">
    <Logo />
    <ToggleSearchBar />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'cineflux',
})
import ToggleSearchBar from '@/components/ToggleSearchBar.vue';
import Logo from '@/components/Logo.vue';
import '@/assets/css/fonts.css'
</script>
