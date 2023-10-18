# 🍿 cineflux
Cineflux is a web application that allows users to explore information about movies, TV shows, and their respective cast and crew. The web-app is built using Vue.js & Nuxt, and utilizes The Movie Database (TMDB) API, enabling users to view details about their favorite films and TV series, as well as the people behind them. Additionally, Cineflux provides the functionality to log and rate/review movies and TV shows.

Please note that Cineflux is under active development, and core features such as user authentication, logging, and rating/reviewing are actively being worked on. This README provides a brief overview of the application, its setup, and how to use it.

##  Features
As of the current version, Cineflux offers the following features:

- Display movie and TV show information.
- View details about cast and crew members.
- Search for movies, TV shows and cast/crew members.

## Usage
Cineflux is designed to be intuitive and user-friendly. Here's how to use the application:

#### Explore Movies and TV Shows:
Use the search bar to find movies and TV shows.
Click on a movie or TV show to view its details.

#### View Cast and Crew:
Use the search bar to find crew members.

Also when viewing a movie or TV show, you can click on cast and crew members to see their profiles.

#### Review and Rating (Coming Soon):
Features for logging, rating, and reviewing movies and TV shows are actively being worked on. Stay tuned for updates!


### Enjoy the Cineflux Experience!
Use the application to discover new movies and TV shows, learn more about your favorite actors, directors, and crew members, and connect with other film enthusiasts.


## 🛠️ Technologies Used
Cineflux is built with the following technologies and libraries:

- [Vue.js](https://vuejs.org/)
- [Nuxt](https://nuxt.com/)
    - [@nuxt/icons](https://nuxt.com/modules/icon): A module for Nuxt.js that provides a wide range of icons.
- [TMDB API](https://themoviedb.org/)
- [Axios](https://axios-http.com/)
- [Vercel](https://vercel.com/)

## 🔗 Production deployment
Check out the live production version by clicking [here](https://cineflux.vercel.app).

## ⬇️ Installation
To run Cineflux locally on your machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/quinceyvd/cineflux
    ```
2. Install required dependencies:
    ```bash
    npm install
    ``` 
3. Create a TMDB API key
    - Visit the TMDB website and create an account.
    - Generate an API key in your TMDB account settings.
    - Store the API key in a .env file stored in the root directory like this: `API_KEY: <key>`
4. Start the development server
    ```bash
    npm run dev
    ```
    You can now view Cineflux locally by visiting `localhost:3000` in the browser. 