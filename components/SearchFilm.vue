<template>
  <div class="self-center m-0 xl:w-10/12">
    <div class="flex items-center justify-center flex-col">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        id="searchBox"
        placeholder="Search film..."
        class="flex text-xl text-left font-[inter] font-bold p-3 ease-in-out duration-200 border-4 rounded-3xl border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 hover:ring-1 hover:ring-blue-500 hover:ring-opacity-50"
      />
    </div>
    <div class="bg-[#e0e0e0] mt-10 rounded-3xl shadow-2xl">
      <ul v-for="result in results" :key="result.id" class="py-5">
        <li class="py-2 w-screen xl:w-full">
          <NuxtLink
            :to="`/film/${result.id}`"
            class="flex flex-row p-5 items-center hover:bg-gray-300 ease-in-out duration-300 xl:w-full"
          >
            <img
              v-if="result.poster_path"
              :src="'https://image.tmdb.org/t/p/w500' + result.poster_path"
              :alt="'Poster of ' + result.title"
              class="w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5"
            />
            <img
              v-else
              src="@/assets/images/placeholders/film.png"
              alt="No poster available"
              class="items-center w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5"
            />
            <div class="flex flex-col p-5">
              <h3 class="text-4xl hover:underline font-[bebasneue]">{{ result.title }}</h3>
              <h4 v-if="result.release_date" class="font-[inter]">{{ getReleaseYear(result.release_date) }}</h4>
            </div>
          </NuxtLink>
          <div v-if="results > 1" class="flex justify-center">
            <hr class="h-[2px] bg-gray-400 border-0 w-11/12 rounded" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/fonts.css'

export const getKey = () => {
  const config = useRuntimeConfig()
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
      // Fetch film data from TMDB API, requests new data after each update of 'searchQuery'
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${getKey()}&query=${this.searchQuery}`)
        .then(response => {
          this.results = response.data.results
        })
        .catch(error => {
          console.error('Error occurred fetching search results:', error)
        })
    },
    getReleaseYear(date) {
      // Get release year from date string
      if (date) {
        return date.substring(0, 4)
      }
      return ''
    }
  }
}
</script>
