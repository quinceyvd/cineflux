<template>
  <!-- Process API data in HTML rendering -->
  <div>
    <div class="flex flex-row p-4 font-[inter]">
      <img :src="'https://image.tmdb.org/t/p/w500' + person.profile_path" :alt="'Picture of ' + person.name" class="w-[113px] h-[170px] rounded-xl shadow-2xl">
      <div class="flex flex-col p-4 justify-center">
        <h1 class="text-4xl font-[bebasneue]">{{ person.name }}</h1>
        <p v-if="person.birthday && !person.deathday">{{ person.age }} years old <span class="font-[ibmplexmono] rounded-lg">({{ person.birthday }})</span></p>
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
    <div class="flex justify-center p-5">
      <hr class="h-[2px] bg-gray-400 border-0 w-full rounded" />
    </div>
    <div v-if="movie_credits.crew">
      <ul>
        <li v-for="job in movie_credits.crew" :key="job.id" class="font-[inter] p-2">
          <p>{{ job.title }} - {{ job.job }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@/assets/css/fonts.css'

export const getKey = () => {
  const config = useRuntimeConfig();
  const API_KEY = config.public.apiKey
  return API_KEY
}

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
        jobArray.forEach(function(i) { jobCount[i] = (jobCount[i]||0) + 1;});
        console.log('Film credits: ', jobCount);
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
        jobArray.forEach(function(i) { jobCount[i] = (jobCount[i]||0) + 1;});
        console.log('TV credits: ', jobCount);
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