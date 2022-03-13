<template>
  <div class="solid mb-5">
    <h3 class="mb-5">Edit Movie</h3>
    
    <v-simple-table dark class="mb-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Movie Name</th>
            <th class="text-left">Studio</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listMovie" :key="index">
            <td>{{ item.movieName }}</td>
            <td>{{ item.studio }}</td>
            <td>
              <v-btn
                depressed
                
                @click="editMovie(item)"
                color="error"
              >
                Edit
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-text-field
      v-model="objectMovie.movieName"
      label="Movie Name"
    ></v-text-field>
    <v-text-field v-model="objectMovie.studio" label="Studio"></v-text-field>
    <v-text-field
      v-model="objectMovie.poster"
      label="url_poster"
    ></v-text-field>
    <v-textarea
      outlined
      name="input-7-4"
      label="Detail Movie"
      v-model="objectMovie.detail"
    ></v-textarea>
    <v-btn
      color="dark"
      elevation="5"
      @click="conncectNew()"
      :loading="load"
      outlined
      >Edit Movie</v-btn
    >
  </div>
</template>

<script>
import { db } from "@/plugins/firebase1";
import { doc, setDoc } from "firebase/firestore";
export default {
  props: ["listMovie"],

  data() {
    return {
      studio: null,
      poster: null,
      detail: null,
      objectMovie: {
        movieName: null,
        studio: null,
        poster: null,
        detail: null,
      },
      moId:null,
      load:false
    };
  },
  methods: {
    editMovie(i) {
      this.objectMovie.movieName=i.movieName
      this.objectMovie.studio=i.studio
      this.objectMovie.poster=i.poster
      this.objectMovie.detail=i.detail
      this.moId=i.id
    },
    sendEditMovie() {
      this.$emit("ok");
    },
    async conncectNew() {
      this.load=true
      try {
        const docData = {
          movieName: this.objectMovie.movieName,
          studio: this.objectMovie.studio,
          poster:this.objectMovie.poster,
          detail:this.objectMovie.detail
        };
        await setDoc(doc(db, "movie", this.moId), docData);
        this.sendEditMovie();
        console.log("Data Updated...");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      this.load=false
    },
    
  },
};
</script>

<style>
</style>