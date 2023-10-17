<template>
  <div class="flex flex-col min-h-screen">
    <slot />
    <BottomNav class="" />
  </div>
</template>
  
<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
  components: {
    BottomNav
  }
}
</script>