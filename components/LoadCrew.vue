<template>
  <div>
    <div class="flex flex-row p-4 font-[inter]">
      <img :src="'https://image.tmdb.org/t/p/w500' + person.profile_path" :alt="'Picture of ' + person.name" class="w-[113px] h-[170px] rounded-xl shadow-2xl">
      <div class="flex flex-col p-4 justify-center">
        <h1 class="text-4xl font-[bebasneue]">{{ person.name }}</h1>
        <p v-if="person.deathday" class="font-[ibmplexmono] text-sm">{{ person.birthday }} - {{ person.deathday }}</p>
        <h3 class="bg-[#e0e0e0] w-max uppercase font-bold p-2 my-1 rounded-lg">{{ person.known_for_department }}</h3>
        <p v-if="person.birthday && !person.deathday">{{ person.age }} years old <span class="font-[ibmplexmono] rounded-lg">({{ person.birthday }})</span></p>
      </div>
    </div>
    <div class="flex justify-center p-5">
      <hr class="h-[2px] bg-gray-400 border-0 w-full rounded" />
    </div>
    <div class="font-[inter] p-4">
      <p>{{ person.biography }}</p>
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
      person: {}
    };
  },
  mounted() {
    axios
      .get(`https://api.themoviedb.org/3/person/${this.person_id}?api_key=${getKey()}`)
      .then(response => {
        this.person = response.data;
        this.person.age = this.calculateAge(this.person.birthday);
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    calculateAge(birthday) {
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