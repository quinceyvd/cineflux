<template>
    <div class="flex flex-row self-center justify-between p-5">
        <!-- Toggle menu for search types -->
        <button v-bind:class="(currentSearchType=='film')?'text-xl font-[inter] font-bold mx-2 p-2 ease-in-out duration-200 border-b-4 hover:border-blue-500':'text-xl font-[inter] font-bold mx-2 p-2 ease-in-out duration-200 border-b-4 border-b-white hover:border-blue-500'" @click="toggleSearchType('film')">films</button>
        <p class="text-xl text-gray-300 py-2">|</p>
        <button v-bind:class="(currentSearchType=='tv')?'text-xl font-[inter] font-bold mx-2 p-2 ease-in-out duration-200 border-b-4 hover:border-blue-500':'text-xl font-[inter] font-bold mx-2 p-2 ease-in-out duration-200 border-b-4 border-b-white hover:border-blue-500'" @click="toggleSearchType('tv')">tv</button>
        <p class="text-xl text-gray-300 py-2">|</p>
        <button v-bind:class="(currentSearchType=='crew')?'text-xl font-[inter] font-bold mx-2 p-2 ease-in-out duration-200 border-b-4 hover:border-blue-500':'text-xl font-[inter] font-bold mx-2 p-2 ease-in-out duration-200 border-b-4 border-b-white hover:border-blue-500'" @click="toggleSearchType('crew')">crew</button>
    </div>
    <div class="flex flex-col justify-between">
        <!--
            Search bars for respective search types,
            only renders search bar for 'currentSearchType',
            which gets set when pressing one of the option buttons - film is the automatically selected type. 
        -->
        <SearchFilm v-if="!currentSearchType || currentSearchType == 'film'" class="m-5" />
        <SearchShow v-if="currentSearchType == 'tv'" class="m-5" />
        <SearchCrew v-if="currentSearchType == 'crew'" class="m-5" />
    </div>
</template>

<script>
// Import searching components and custom fonts
import SearchFilm from '@/components/SearchFilm.vue';
import SearchShow from '@/components/SearchShow.vue';
import SearchCrew from '@/components/SearchCrew.vue';
import '@/assets/css/fonts.css'

export default {
    components: {
        SearchFilm,
        SearchShow,
        SearchCrew
    },
    data() {
        return {
            // Set default search type to film
            currentSearchType: 'film'
        }
    },
    methods: {
        toggleSearchType(type) {
            if (this.currentSearchType === type) {
                return;
            }
            this.currentSearchType = type;
        }
    }
}
</script>