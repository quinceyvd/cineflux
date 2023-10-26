<template>
    <!-- Process API data in HTML rendering -->
    <div class="flex flex-col">
        <img :src="'https://www.themoviedb.org/t/p/original/' + show.backdrop_path" :alt="show.title + ' poster'"
            class="object-cover object-top w-screen h-auto lg:h-[500px] xl:self-center">
        <div class="flex flex-row p-4 xl:justify-center">
            <div>
                <img v-if="show.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + show.poster_path"
                    :alt="show.title + ' poster'"
                    class="hidden xl:block object-cover w-[200px] h-[300px] rounded-xl shadow-2xl" />
            </div>
            <div class="lg:p-5 xl:mr-32 xl:w-1/5">
                <div class="flex flex-row items-center xl:py-4">
                    <h1 class="text-6xl font-[bebasneue]">{{ show.name }}</h1>
                </div>
                <p><span class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{ show.first_air_date }}</span> - <span
                        class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{ show.last_air_date }}</span></p>
                <p class="font-[inter] pt-2"><span class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{
                    show.number_of_seasons }}</span> Seasons, <span
                        class="font-[ibmplexmono] bg-[#e0e0e0] p-1 rounded-lg">{{ show.number_of_episodes }}</span> Episodes
                </p>
                <p v-if="creators.length > 0" class="font-[inter] pt-2">Created by {{ getCreatorsList() }}</p>
            </div>
            <div class="hidden xl:flex flex-col p-5 w-2/5">
                <p class="font-[ibmplexmono] text-xl uppercase">{{ show.tagline }}</p>
                <p class="font-[inter]">{{ show.overview }}</p>
            </div>
        </div>
        <div class="flex justify-center">
            <hr class="h-[2px] bg-gray-400 border-0 w-11/12 rounded xl:hidden" />
        </div>
        <div class="p-6 lg:p-10 xl:hidden">
            <p class="font-[ibmplexmono] text-xl uppercase">{{ show.tagline }}</p>
            <p class="font-[inter]">{{ show.overview }}</p>
        </div>
        <div class="flex justify-center xl:hidden">
            <hr class="h-[2px] bg-gray-400 border-0 w-11/12 rounded" />
        </div>
        <div class="p-4 lg:p-10">
            <details>
                <summary class="text-3xl font-[inter] font-bold">Cast</summary>
                <ul>
                    <li v-for="actor in actors" :key="actor.id" class="font-[inter] p-2">
                        <NuxtLink :href="'/crew/' + actor.id"
                            class="flex flex-row p-2 lg:p-4 rounded-lg hover:bg-gray-300 ease-in-out duration-300">
                            <img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w500/' + actor.profile_path"
                                :alt="actor.name + ' profile picture'"
                                class="w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5" />
                            <img v-else src="@/assets/images/placeholders/person.png" alt="No picture available">
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
                        <NuxtLink :href="'/crew/' + member.id"
                            class="flex flex-row p-2 lg:p-4 rounded-lg hover:bg-gray-300 ease-in-out duration-300">
                            <img v-if="member.profile_path" :src="'https://image.tmdb.org/t/p/w500/' + member.profile_path"
                                :alt="member.name + ' profile picture'"
                                class="w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5">
                            <img v-else src="@/assets/images/placeholders/person.png" alt="No picture available"
                                class="w-[80px] h-[120px] rounded-xl shadow-2xl xl:ml-5">
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
                <div class="p-2 font-[inter]">
                    <h3 class="text-2xl font-bold">Networks</h3>
                    <ul class="list-disc px-6 py-3">
                        <li v-for="network in show.networks" :key="network.id">{{ network.name }}</li>
                    </ul>
                    <h3 class="text-2xl font-bold">Genres</h3>
                    <ul class="list-disc px-6 py-3">
                        <li v-for="genre in show.genres" :key="genre.id">{{ genre.name }}</li>
                    </ul>
                    <h3 class="text-2xl font-bold">Seasons</h3>
                    <ul class="list-disc px-6 py-3">
                        <li v-for="season in show.seasons" :key="season.id">{{ season.name }} - {{ season.air_date }} - {{
                            season.episode_count }} episodes</li>
                    </ul>
                    <h3 class="text-2xl font-bold">Spoken languages</h3>
                    <ul class="list-disc px-6 py-3">
                        <li v-for="language in show.spoken_languages" :key="language.iso_639_1">{{ language.name }}</li>
                    </ul>
                    <h3 class="text-2xl font-bold">Production companies</h3>
                    <ul class="list-disc px-6 py-3">
                        <li v-for="company in show.production_companies" :key="company.id">{{ company.name }}</li>
                    </ul>

                    <h3 class="text-2xl font-bold">Production countries</h3>
                    <ul class="list-disc px-6 py-3">
                        <li v-for="country in show.production_countries" :key="country.iso_3166_1">{{ country.name }}</li>
                    </ul>
                </div>
            </details>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/fonts.css'

export const getKey = () => {
    const config = useRuntimeConfig();
    const API_KEY = config.public.apiKey
    return API_KEY
}
function getCreatorNames(creators) {
    // Handling cases of multiple show creators
    if (creators.length > 1) {
        return creators.map(creator => creator.name).join(', ');
    } else {
        return creators[0].name;
    }
}
export default {
    props: {
        show_id: String
    },
    methods: {
        getCreatorsList() {
            return getCreatorNames(this.creators);
        }
    },
    data() {
        return {
            show: {},
            crew: {},
            actors: [],
            creators: []
        }
    },
    mounted() {
        // Fetch show data from API by ID from component props
        axios.get(`https://api.themoviedb.org/3/tv/${this.show_id}?api_key=${getKey()}`)
            .then(response => {
                this.show = response.data
                this.creators = response.data.created_by
            })

        // Fetch additional crew data
        axios.get(`https://api.themoviedb.org/3/tv/${this.show_id}/credits?api_key=${getKey()}`)
            .then(response => {
                this.crew = response.data
                response.data.crew.forEach((member) => {
                    if (member.job === 'Creator') {
                        this.creator = member.name
                    }
                })
                response.data.cast.forEach((member => {
                    this.actors.push(member)
                }))
            })
    }
}
</script>