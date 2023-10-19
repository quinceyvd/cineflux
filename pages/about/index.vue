<template>
    <div class="font-[inter] p-10 pb-[120px] xl:self-center xl:w-[700px]">
        <Logo />
        <h2 class="text-xl font-bold mb-4">Features</h2>
        <ul class="list-disc list-inside ml-4 mb-4">
            <li>Display movie and TV show information.</li>
            <li>View details about cast and crew members.</li>
            <li>Search for movies, TV shows, and cast/crew members.</li>
        </ul>
        <h2 class="text-xl font-bold mb-4">How to use</h2>
        <p class="mb-4">Explore films, TV, and crew:</p>
        <ul class="list-disc list-inside ml-4 mb-4">
            <li>Use the search bar to find movies, TV shows and cast/crew members.</li>
            <li>Click on a search result to view its details.</li>
        </ul>
        <p class="mb-4">🛠️ Review and Rating (Coming Soon):</p>
        <ul class="list-disc list-inside ml-4 mb-4">
            <li>Features for logging, rating, and reviewing movies and TV shows are actively being worked on. Stay
                tuned for updates!</li>
        </ul>
        <p class="font-bold">Enjoy the Cineflux Experience!</p>
        <p>Use the application to discover new movies and TV shows, learn more about your favorite actors, directors, and
            crew members, and connect with other film & TV enthusiasts.
        </p>
        
        <div class="py-5">
            <hr />
        </div>
        <img draggable="false" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" class="w-[100px] py-2">
        <p>This product uses the <NuxtLink to="https://themoviedb.org/" class="text-[#01b4e4] hover:underline">TMDB API</NuxtLink> but is not endorsed or certified by TMDB.</p>
    </div>
</template>
<script>
import Logo from '@/components/Logo.vue';
import '@/assets/css/fonts.css'
</script>