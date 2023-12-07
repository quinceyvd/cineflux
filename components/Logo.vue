<template>
  <div class="flex flex-row items-center hover:opacity-50 ease-in-out duration-300">
    <img src="@/assets/images/icon.png" alt="Popcorn icon" class="w-[28px] h-[28px] ease-in-out duration-300 hover:opacity-70" />
    <h1 :class="'hidden sm:block pl-5 text-xl sm:text-3xl hover:opacity-70 font-[inter] w-min ease-in-out duration-300 text-[' + color + ']'">Cineflux</h1>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: '#1F1F1F'
    }
  }
};
</script>