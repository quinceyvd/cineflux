<template>
    <div class="flex items-center justify-center flex-col">
        <input type="text" v-model="searchQuery" @input="handleInput" id="searchBox" placeholder="Search..."
            class="px-2 py-1 uppercase placeholder-white font-[ibmplexmono] w-[90px] md:w-[150px] rounded-lg bg-transparent focus:outline-none focus:bg-black hover:bg-black ease-in-out duration-300 focus:bg-opacity-50 hover:bg-opacity-50" />
        <div v-if="searchQuery"
            class="overflow-y-visible w-[300px] top-[81px] right-[20px] md:right-[50px] fixed bg-white rounded-xl pt-5 shadow-xl">
            <div class="flex flex-row items-center pb-4 space-between">
                <NuxtLink to="/search" class="text-neutral-400 hover:underline ml-6">
                    Go to detailed search...
                </NuxtLink>
                <button class="ml-14" @click="clearInput">
                    <Icon name="mingcute:close-circle-fill" class="text-black hover:opacity-50 ease-in-out duration-300"
                        size="25" />
                </button>
            </div>
            <div class="flex justify-center">
                <hr class="h-[2px] bg-neutral-300 border-0 w-10/12 rounded" />
            </div>
            <ul v-for="result in results" :key="result.id">
                <li v-if="result.media_type === 'movie'" class="py-2 w-[300px]">
                    <NuxtLink :to="`/film/${result.id}`" class="flex flex-row p-5 text-black hover:underline" @click="clearInput">
                        <img :src="'https://image.tmdb.org/t/p/w500' + result.poster_path"
                            :alt="'Poster of ' + result.title" class="w-10 h-auto">
                        <div class="ml-5">
                            <p><span class="text-black font-bold">{{ result.title }}</span></p>
                            <p v-if="result.release_date">({{ getReleaseYear(result.release_date) }})</p>
                        </div>
                    </NuxtLink>
                </li>
                <li v-else-if="result.media_type === 'tv'" class="py-2 w-[300px]">
                    <NuxtLink :to="`/show/${result.id}`" class="flex flex-row p-5 text-black hover:underline" @click="clearInput">
                        <img :src="'https://image.tmdb.org/t/p/w500' + result.poster_path" :alt="'Poster of ' + result.name"
                            class="w-10 h-auto">
                        <div class="ml-5">
                            <p><span class="text-black font-bold">{{ result.name }}</span></p>
                            <p>({{ getReleaseYear(result.first_air_date) }})</p>
                        </div>
                    </NuxtLink>
                </li>
                <li v-else-if="result.media_type === 'person'" class="py-2">
                    <NuxtLink :to="`/crew/${result.id}`" class="flex flex-row p-5 text-black hover:underline" @click="clearInput">
                        <img :src="'https://image.tmdb.org/t/p/w500' + result.profile_path"
                            :alt="'Poster of ' + result.name" class="w-10 h-auto">
                            <p><span class="text-black font-bold ml-5">{{ result.name }}</span></p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { getKey } from '@/components/functions/getKey.js'

export default {
    data() {
        return {
            searchQuery: '',
            results: []
        }
    },
    methods: {
        handleInput() {
            axios
                .get(`https://api.themoviedb.org/3/search/multi?api_key=${getKey()}&query=${this.searchQuery}`)
                .then(response => {
                    this.results = response.data.results;
                    this.results = response.data.results.slice(0, 5);
                    console.log(this.results);
                })
                .catch(error => {
                    console.error('Error occurred fetching search results:', error);
                });
        },
        clearInput() {
            this.searchQuery = '';
        },
        getReleaseYear(date) {
            if (date) {
                return date.substring(0, 4);
            }
            return '';
        }
    }
}
</script>