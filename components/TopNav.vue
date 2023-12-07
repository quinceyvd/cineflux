<template>
    <header :class="[ scrolled ? 'w-full text-white fixed z-50 top-0 bg-gradient-to-b bg-neutral-900 bg-opacity-95 transition-bg duration-300' : 'w-full text-white fixed z-50 top-0 bg-gradient-to-b from-[#00000082] from-1% via-30% transition-bg duration-300']" >
        <nav class="flex flex-row w-full justify-between items-center px-8 sm:px-12 py-5">
            <div class="flex">
                <NuxtLink to="/">
                    <Logo color="white" />
                </NuxtLink>
            </div>
            <div class="flex justify-center items-center font-[ibmplexmono] uppercase">
                <NuxtLink to="/" class="p-2 hover:opacity-50 ease-in-out duration-300">Home</NuxtLink>
                <NuxtLink to="/about" class="p-2 hover:opacity-50 ease-in-out duration-300">About</NuxtLink>
            </div>
            <div class="flex flex-col">
                <SearchAny />
            </div>
        </nav>
    </header>
</template>
<script>
import Logo from '@/components/Logo.vue';
import SearchAny from '@/components/SearchAny.vue';

export default {
    name: 'TopNav',
    components: {
        Logo,
        SearchAny
    },
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    },
    data() {
        return {
            scrolled: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.scrolled = window.scrollY > 0;
        }
    }
}
</script>