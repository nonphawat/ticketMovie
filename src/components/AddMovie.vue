<template>
  <div class="solid mb-5">
    <h3 class="mb-5">Add Movie</h3>
    <v-text-field v-model="objectMovie.movieName" label="Movie Name"></v-text-field>
    <v-text-field v-model="objectMovie.studio" label="Studio"></v-text-field>
    <v-text-field v-model="objectMovie.poster" label="url_poster"></v-text-field>
    <v-textarea
      outlined
      name="input-7-4"
      label="Detail Movie"
      v-model="objectMovie.detail"
    ></v-textarea>
    <v-btn color="dark" elevation="5" @click="sendAddMovie" :loading="loadins" outlined
      >Add Movie</v-btn
    >
  </div>
</template>

<script>

export default {
  
    props:['loadins'],
  data() {
    return {
      objectMovie: {
        movieName: null,
        studio: null,
        poster: null,
        detail: null,
      },

      
    };
  },
  methods: {
    sendAddMovie() {
      this.$emit("movie_doc",this.objectMovie)
    },
  },
 
};
</script>

<style>
</style>