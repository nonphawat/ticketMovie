<template>
  <div>
    <h1>Admin</h1>
    
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <nav class="mb-5">
          <v-btn color="dark" @click="changeComponents(1)" text>
            Add Movie
          </v-btn>
          |
          <v-btn color="dark" @click="changeComponents(2)" text>
            Delete Movie
          </v-btn>
          |
          <v-btn color="dark" @click="changeComponents(3)" text>
            Edit Movie
          </v-btn>
        </nav>
        <Add :loadins="load1" v-show="addMovie_show" @movie_doc="add"></Add>
        <Delete v-show="deleteMovie_show" :listMovie="listMovie" :loadins="load2" @movie_delete="deleteMovie"></Delete>
        <Edit v-show="editMovie_show" :listMovie="listMovie" @ok="readData"></Edit>

        <span></span>
        <span></span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { auth, db } from "@/plugins/firebase1";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Add from "../components/AddMovie.vue";
import Delete from "../components/DeleteMovie.vue";
import Edit from "../components/EditMovie.vue";
export default {
  components: {
    Add,
    Delete,
    Edit,
  },
  mounted() {
    this.readData();
  },
  data() {
    return {
      detail: null,
      movieName: null,
      poster: null,
      price: null,
      studio: null,
      addMovie_show: false,
      deleteMovie_show: false,
      editMovie_show: false,
      load1: false,
      load2:false,
      listMovie: [],
    };
  },

  methods: {
    async add(i) {
      this.load1 = true;
      try {
        const docRef = await addDoc(collection(db, "movie"), {
          detail: i.detail,
          movieName: i.movieName,
          poster: i.poster,
          studio: i.studio,
        });
        await this.readData();
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      this.load1 = false;
    },
    changeComponents(i) {
      if (i === 1) {
        this.addMovie_show = true;
        this.deleteMovie_show = false;
        this.editMovie_show = false;
      } else if (i === 2) {
        this.addMovie_show = false;
        this.deleteMovie_show = true;
        this.editMovie_show = false;
      } else {
        this.addMovie_show = false;
        this.deleteMovie_show = false;
        this.editMovie_show = true;
      }
    },
    async readData() {
      console.log("Show Data...");
      this.listMovie.splice(0, this.listMovie.length);
      const querySnapshot = await getDocs(collection(db, "movie"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        const docAll = doc.data();
        docAll.id = doc.id;
        this.listMovie.push(docAll);
      });
    },
    async deleteMovie(i) {
      this.load2 = true;
      console.log("Waiting for delete data...");
      await deleteDoc(doc(db, "movie", i)).then(
        this.load2 = false
      )
      console.log("Deleted...");
      await this.readData();
    },
    
  },
};
</script>

<style>
.solid {
  border-style: solid;
  padding: 20px;
}
</style>