<template>
    <div class="flex items-center justify-center flex-col">
        <input type="text" v-model="searchQuery" @input="handleInput" id="searchBox" placeholder="Search film..."
            class="flex text-xl text-center ease-in-out duration-200 border-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50" />
        <ul v-for="result in results" :key="result.id">
            <li class="py-2">
                <NuxtLink :to="`/film/${result.id}`" class="flex flex-row p-5 text-blue-500 hover:underline">
                    <img :src="'https://image.tmdb.org/t/p/w500' + result.poster_path" :alt="'Poster of ' + result.title" class="w-20 h-auto">
                    {{ result.title }} ({{ getReleaseYear(result.release_date) }})
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export const getKey = () => {
    const config = useRuntimeConfig();
    const API_KEY = config.public.apiKey
    return API_KEY
}

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
                })
                .catch(error => {
                    console.error('Error occurred fetching search results:', error);
                });
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