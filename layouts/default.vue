<template>
  <div class="flex flex-col min-h-screen font-[inter]">
    <TopNav />
    <slot />
    <BottomNav class="" />
  </div>
</template>
  
<script>
import BottomNav from '@/components/BottomNav.vue'
import TopNav from '@/components/TopNav.vue'
import { useHead } from '@unhead/vue'

export default {
  components: {
    BottomNav,
    TopNav
  },
  setup() {
    useHead({
      title: 'Cineflux',
    })
  }
}
</script>