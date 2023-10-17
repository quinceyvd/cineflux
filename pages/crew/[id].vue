<template>
    <div>
        <LoadCrew :person_id="$route.params.id" />
    </div>
</template>

<script>
import LoadCrew from '@/components/LoadCrew.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Person',
  computed: {
    $route() {
      return this.$router.currentRoute.value
    }
  },
})
</script>