<template>
  <!-- Process API data in HTML rendering  -->
  <div class="flex flex-col">
    <img v-if="movie.backdrop_path" :src="'https://www.themoviedb.org/t/p/original/' + movie.backdrop_path" :alt="movie.title + ' poster'"
      class="object-cover object-top w-screen h-auto lg:h-[500px] xl:self-center">
    <div class="flex flex-row p-4 xl:justify-center">
      <div>
        <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title + ' poster'" class="hidden xl:block object-cover w-[200px] h-[300px] rounded-xl shadow-2xl" />
      </div>
      <div class="lg:p-5 xl:mr-32 xl:w-1/5">
        <div class="flex flex-row items-center">
          <h1 class="text-5xl font-[bebasneue] mr-22">
            {{ movie.title }}
            <span v-if="movie.release_date" class="font-[inter] text-sm align-middle">({{ getReleaseYear(movie.release_date) }})</span>
        </h1>
        </div>
        <div class="font-[inter]">
          <p v-if="movie.runtime"><span class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{ movie.runtime }}</span> mins</p>
          <p v-if="directors">Directed by
            <span v-if="directors.length">
              {{ directors.join(', ') }}
            </span>
          </p>
        </div>
      </div>
      <div class="hidden xl:flex flex-col p-5 w-2/5">
        <p class="font-[ibmplexmono] text-xl uppercase">{{ movie.tagline }}</p>
        <p class="font-[inter]">{{ movie.overview }}</p>
      </div>
    </div>
    <div class="flex justify-center">
      <hr class="h-[2px] bg-gray-400 border-0 w-11/12 rounded xl:hidden" />
    </div>
    <div class="p-6 lg:p-10 xl:hidden">
      <p class="font-[ibmplexmono] text-xl uppercase">{{ movie.tagline }}</p>
      <p class="font-[inter]">{{ movie.overview }}</p>
    </div>
    <div class="flex justify-center">
      <hr class="h-[2px] bg-gray-400 border-0 w-11/12 rounded xl:hidden" />
    </div>
    <div class="p-4 lg:p-10">
      <details>
        <summary class="text-3xl font-[inter] font-bold">Cast</summary>
        <ul>
          <li v-for="actor in actors" :key="actor.id" class="font-[inter] p-2">
            <NuxtLink :to="'/crew/' + actor.id" class="flex flex-row p-2 lg:p-4 rounded-lg hover:bg-gray-300 ease-in-out duration-300">
              <img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w500/' + actor.profile_path"
                :alt="actor.name + ' profile picture'" class="w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5" />
              <img v-else src="@/assets/images/placeholders/person.png" alt="No picture available"
                class="items-center w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5" />
              <div class="p-3">
                <p class="bg-[#e0e0e0] w-max uppercase font-bold p-2 rounded-lg">{{ actor.name }}</p>
                <p class="py-2">{{ actor.character }}</p>
              </div>
            </NuxtLink>
            <div class="flex justify-center p-5">
              <hr class="h-[2px] bg-gray-400 border-0 w-full rounded" />
            </div>
          </li>
        </ul>
      </details>
      <details>
        <summary class="text-3xl font-[inter] font-bold">Crew</summary>
        <ul>
          <li v-for="member in crew.crew" :key="member.id" class="font-[inter] p-2">
            <NuxtLink :href="'/crew/' + member.id" class="flex flex-row p-2 lg:p-4 rounded-lg hover:bg-gray-300 ease-in-out duration-300">
              <img v-if="member.profile_path" :src="'https://image.tmdb.org/t/p/w500/' + member.profile_path"
                :alt="member.name + ' profile picture'" class="w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5" />
              <img v-else src="@/assets/images/placeholders/person.png" alt="No picture available"
                class="items-center w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5">
              <div class="p-3">
                <p class="bg-[#e0e0e0] w-max uppercase font-bold p-2 rounded-lg">{{ member.name }}</p>
                <p class="py-2">{{ member.job }}</p>
              </div>
            </NuxtLink>
            <div class="flex justify-center p-5">
              <hr class="h-[2px] bg-gray-400 border-0 w-full rounded" />
            </div>
          </li>
        </ul>
      </details>
      <details>
        <summary class="text-3xl font-[inter] font-bold">Info</summary>
        <div class="p-2">
          <p v-if="movie.budget" class="p-1">Budget <span class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{
            formatCurrency(movie.budget) }} USD</span></p>
          <p v-if="movie.original_title" class="p-1">Original title <span class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{
            movie.original_title }}</span></p>
          <p v-if="movie.release_date" class="p-1">Release date <span class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{ movie.release_date
          }}</span></p>
          <h3 class="text-2xl font-bold">Genres</h3>
          <ul class="list-disc px-6 py-3">
            <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
          </ul>
          <h3 v-if="movie.spoken_languages" class="text-2xl font-bold">Spoken languages</h3>
          <ul v-if="movie.spoken_languages" class="list-disc px-6 py-3">
            <li v-for="language in movie.spoken_languages" :key="language.iso_639_1">{{ language.name }}</li>
          </ul>
          <h3 class="text-2xl font-bold">Production companies</h3>
          <ul class="list-disc px-6 py-3">
            <li v-for="company in movie.production_companies" :key="company.id">{{ company.name }}</li>
          </ul>
          <h3 class="text-2xl font-bold">Production countries</h3>
          <ul class="list-disc px-6 py-3">
            <li v-for="country in movie.production_countries" :key="country.iso_3166_1">{{ country.name }}</li>
          </ul>
        </div>
      </details>
    </div>
  </div>
</template>
    
<script>
import axios from 'axios'
import '@/assets/css/fonts.css'
import { getKey } from '@/components/functions/getKey.js'


export default {
  props: {
    film_id: String
  },
  data() {
    return {
      movie: {},
      crew: {},
      actors: [],
      directors: []
    }
  },
  methods: {
    getReleaseYear(date) {
      // Get release year from date string
      if (date) {
        return date.substring(0, 4);
      }
      return '';
    },
    formatCurrency(value) {
      // Format currency to USD for rendering film budget
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formatter.format(value);
    }
  },
  mounted() {
    // Fetch film data from API by ID from component props
    axios
      .get(`https://api.themoviedb.org/3/movie/${this.film_id}?api_key=${getKey()}`)
      .then(response => {
        this.movie = response.data;
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch additional filmcrew data
    axios
      .get(`https://api.themoviedb.org/3/movie/${this.film_id}/credits?api_key=${getKey()}`)
      .then(response => {
        this.crew = response.data;
        const directorMembers = response.data.crew.filter(member => member.job === 'Director');
        this.directors = directorMembers.map(member => member.name);
        this.actors = response.data.cast;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
</script>