<template>
    <div
        class="fixed bottom-0 w-max flex flex-row self-center ease-in-out duration-300 text-white bg-[#1F1F1F] rounded-full shadow-xl mb-10">
        <button @click="$router.go(-1)" class="font-bold p-2 self-center justify-between">
            <Icon name="mingcute:arrow-left-circle-line" size="30" class="text-white hover:text-blue-400 ease-in-out duration-200" />
        </button>
        <button @click="$router.push('/')" class="font-bold p-2 self-center justify-between">
            <Icon name="mingcute:home-5-line" size="30" class="text-white hover:text-blue-400 ease-in-out duration-200" />
        </button>
        <button @click="$router.push('/about')" class="p-2 self-center justify-between">
            <Icon name="mingcute:balance-line" size="30" class="text-white hover:text-blue-400 ease-in-out duration-200" />
        </button>
    </div>
</template>
  
<script>
import '@/assets/css/fonts.css'
</script>