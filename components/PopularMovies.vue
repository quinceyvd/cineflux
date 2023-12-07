<template>
    <div class="flex flex-row bg-black w-screen h-full">
        <div class="flex flex-row overflow-hidden w-screen" ref="scrollContainer">
            <button v-if="currentIndex !== 0" @click="scroll(-1)" class="absolute z-10 left-0 top-[45%] m-4 p-2 text-white">
                <Icon name="teenyicons:left-outline" size="30"
                    class="text-white hover:opacity-50 ease-in-out duration-200" />
            </button>
            <button v-if="currentIndex !== movies.length - 1" @click="scroll(1)" class="absolute z-10 right-0 top-[45%] m-4 p-2 text-white">
                <Icon name="teenyicons:right-outline" size="30"
                    class="text-white hover:opacity-50 ease-in-out duration-200" />
            </button>
            <ul v-for="(movie, index) in movies" :key="movie.id" class="flex flex-row w-screen animate-scroll">
                <li class="w-screen">
                    <div class="flex relative w-screen">
                        <img class="relative w-screen h-screen object-cover opacity-50"
                            :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
                            :alt="movie.title + ' poster'" />
                        <div class="absolute top-[60%] md:top-[60%] left-5 lg:left-20 w-3/4">
                            <p class="text-white text-md md:text-normal uppercase font-[ibmplexmono]">
                                <Icon name="fluent-emoji:crown" />
                                Top rated films • #{{ index + 1 }}
                            </p>
                            <NuxtLink :to="'/film/' + movie.id"
                                class="text-white text-5xl md:text-7xl lg:text-9xl font-[bebasneue] hover:opacity-60 ease-in-out duration-300">
                                {{ movie.title }}</NuxtLink>
                            <h3 class="text-white text-lg md:text-3xl uppercase font-extralight">{{
                                getReleaseYear(movie.release_date) }} • {{ movie.original_language }}</h3>
                        </div>
                    </div>
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
            movies: [],
            currentIndex: 0,
        }
    },
    mounted() {
        // Fetch popular movies data from API
        axios
            .get(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${getKey()}`)
            .then(response => {
                this.movies = response.data.results;
                console.log(this.movies)
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        getReleaseYear(date) {
            // Get release year from date string
            if (date) {
                return date.substring(0, 4)
            }
            return ''
        },
        scroll(direction) {
            const container = this.$refs.scrollContainer;
            container.scrollLeft += direction * container.offsetWidth;
            this.currentIndex += direction;  // Add this line
        },
    }
}
</script>