<template>
    <div>
        <LoadShow :show_id="$route.params.id" />
    </div>
</template>

<script>
import LoadShow from '@/components/LoadShow.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Show',
  computed: {
    $route() {
      return this.$router.currentRoute.value
    }
  },
})
</script>