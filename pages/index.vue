<template>
  <div class="flex flex-col items-center overflow-x-hidden">
    <h1 class="rounded-lg p-2 my-10 text-3xl text-white font-[ibmplexmono] ease-in-out duration-300 bg-[#1F1F1F] hover:bg-[#474747] w-min">cineflux.</h1>
    <ToggleSearchBar />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: 'cineflux',
})
import ToggleSearchBar from '@/components/ToggleSearchBar.vue';
import '@/assets/css/fonts.css'
</script>
