<template>
    <div class="flex flex-col static overflow-x-hidden">
        <LoadFilm :film_id="$route.params.id" />
    </div>
</template>

<script>
import LoadFilm from '@/components/LoadFilm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Film',
  computed: {
    $route() {
      return this.$router.currentRoute.value
    }
  },
})
</script>