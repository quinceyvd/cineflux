<template>
    <div class="self-center m-0 xl:w-10/12">
        <div class="flex items-center justify-center flex-col">
            <input type="text" v-model="searchQuery" @input="handleInput" id="searchBox" placeholder="Search cast/crew..."
                class="flex text-xl text-left font-[inter] font-bold p-3 ease-in-out duration-200 border-4 rounded-3xl border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50" />
        </div>
        <div class="bg-[#e0e0e0] mt-10 rounded-3xl shadow-2xl">
            <ul v-for="result in results" :key="result.id" class="py-5">
                <li class="py-2 w-screen xl:w-full">
                    <NuxtLink :to="`/crew/${result.id}`"
                        class="flex flex-row p-5 items-center hover:bg-gray-300 ease-in-out duration-300 xl:w-full">
                        <img v-if="result.profile_path" :src="'https://image.tmdb.org/t/p/w500' + result.profile_path"
                            :alt="'Picture of ' + result.name" class="w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5" />
                        <img v-else src="@/assets/images/placeholders/person.png" alt="No picture available"
                            class="items-center w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5" />
                        <div class="flex flex-col p-5">
                            <h3 class="text-4xl hover:underline font-[bebasneue]">{{ result.name }}</h3>
                            <h4 v-if="result.known_for_department" class="font-[inter]">{{ result.known_for_department }}
                            </h4>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
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
        // Fetch crew data from TMDB API, requests new data after each update of 'searchQuery'
            axios
                .get(`https://api.themoviedb.org/3/search/person?api_key=${getKey()}&query=${this.searchQuery}`)
                .then(response => {
                    this.results = response.data.results;
                })
                .catch(error => {
                    console.error('Error occurred fetching search results:', error);
                });
        }
    }
}
</script>