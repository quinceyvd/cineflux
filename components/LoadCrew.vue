<template>
  <!-- Process API data in HTML rendering -->
  <div class="px-5">
    <div class="flex flex-row p-4 pt-24 lg:pt-28 font-[inter]">
      <img :src="'https://image.tmdb.org/t/p/w500' + person.profile_path" :alt="'Picture of ' + person.name"
        class="w-[113px] h-[170px] rounded-xl shadow-2xl">
      <div class="flex flex-col p-4 justify-center">
        <h1 class="text-4xl font-[bebasneue]">{{ person.name }}</h1>
        <p v-if="person.birthday && !person.deathday">{{ person.age }} years old <span
            class="font-[ibmplexmono] rounded-lg">({{ person.birthday }})</span></p>
        <p v-if="person.deathday" class="font-[ibmplexmono] text-sm">{{ person.birthday }} - {{ person.deathday }}</p>
        <h3 class="bg-[#e0e0e0] w-max uppercase font-bold p-2 my-1 rounded-lg">{{ person.known_for_department }}</h3>
      </div>
    </div>
    <div class="flex justify-center p-5">
      <hr class="h-[2px] bg-gray-400 border-0 w-full rounded" />
    </div>
    <div class="font-[inter] p-4">
      <p>{{ person.biography }}</p>
    </div>
<!--     
    <div class="flex justify-center p-5">
      <hr class="h-[2px] bg-gray-400 border-0 w-full rounded" />
    </div>

    <div class="flex flex-col font-[inter]">
      <h2 class="text-3xl font-[inter] font-bold p-4">Known for</h2>
      <div v-if="Object.keys(movie_credit_types).length > 0">
        <ul>
          <li v-for="(value, key) in movie_credit_types" :key="key" class="font-[inter] py-2">
            <details>
              <summary class="bg-[#e0e0e0] w-full uppercase p-3"><span class="font-bold">{{ key }}</span> ({{ value }})</summary>
              <div v-if="key === 'Acting'" class="grid grid-cols-4 gap-4 p-4">
                <li v-for="movie in movie_credits.cast">
                  <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="'Poster of ' + movie.title"
                    class="w-[80px] h-[120px] rounded-lg shadow-2xl xl:ml-5">
                </li>
              </div>
              <div v-if="movie.job === key" class="p-4">
                <li v-for="movie in movie_credits.crew">
                  <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" :alt="'Poster of ' + movie.title"
                    class="w-[80px] h-[120px] rounded-lg shadow-2xl xl:ml-5">
                </li>
              </div>
            </details>
          </li>
        </ul>
    </div>
  </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/fonts.css'
import { getKey } from '@/components/functions/getKey.js'

export default {
  props: {
    person_id: String
  },
  data() {
    return {
      person: {},
      movie_credits: {},
      movie_credit_types: {},
      tv_credits: {},
      tv_credit_types: {}
    };
  },
  mounted() {
    // Fetch crew member data from API by ID from component props
    axios
      .get(`https://api.themoviedb.org/3/person/${this.person_id}?api_key=${getKey()}`)
      .then(response => {
        this.person = response.data;
        this.person.age = this.calculateAge(this.person.birthday);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch movie credits data from API by ID from component props
    axios
      .get(`https://api.themoviedb.org/3/person/${this.person_id}/movie_credits?api_key=${getKey()}`)
      .then(response => {
        this.movie_credits = response.data;
        console.log('Film credits: ', this.movie_credits)

        // Store each type and amount of instances of job, including acting credits in array
        let actingCredits = this.movie_credits.cast.length;
        let jobArray = [];
        this.movie_credits.crew.forEach((job) => {
          jobArray.push(job.job);
        });
        // Add amount of acting credits to array
        for (let i = 0; i < actingCredits; i++) {
          jobArray.push("Acting");
        }
        let jobCount = {};
        jobArray.forEach(function (i) { jobCount[i] = (jobCount[i] || 0) + 1; });

        // Convert jobCount to an array and sort it by value
        let sortedJobCountArray = Object.entries(jobCount).sort((a, b) => b[1] - a[1]);

        // If you need to convert it back to an object
        let sortedJobCount = {};
        sortedJobCountArray.forEach(([key, value]) => {
          sortedJobCount[key] = value;
        });

        this.movie_credit_types = sortedJobCount;
        console.log('Film credits types: ', this.movie_credit_types);
      })
      .catch(error => {
        console.error(error);
      });

    // Fetch tv credits data from API by ID from component props
    axios
      .get(`https://api.themoviedb.org/3/person/${this.person_id}/tv_credits?api_key=${getKey()}`)
      .then(response => {
        this.tv_credits = response.data;
        console.log('TV credits: ', this.tv_credits)

        // Store each type and amount of instances of job, including acting credits in array
        let actingCredits = this.tv_credits.cast.length;
        let jobArray = [];
        this.tv_credits.crew.forEach((job) => {
          jobArray.push(job.job);
        });
        // Add amount of acting credits to array
        for (let i = 0; i < actingCredits; i++) {
          jobArray.push("Acting");
        }
        let jobCount = {};
        jobArray.forEach(function (i) { jobCount[i] = (jobCount[i] || 0) + 1; });

        // Convert jobCount to an array and sort it by value
        let sortedJobCountArray = Object.entries(jobCount).sort((a, b) => b[1] - a[1]);

        // If you need to convert it back to an object
        let sortedJobCount = {};
        sortedJobCountArray.forEach(([key, value]) => {
          sortedJobCount[key] = value;
        });

        this.tv_credit_types = sortedJobCount;
        console.log('TV credits types: ', this.tv_credit_types);
      })

  },
  methods: {
    calculateAge(birthday) {
      // Calculate age from birthday string
      const birthDate = new Date(birthday);
      const currentDate = new Date();
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
};
</script>