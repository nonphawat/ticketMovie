<template>
  <div>
    <v-layout wrap justify-center class="text-center">
      <v-flex xs6>
        <br /><br />
        
        <div v-for="(movie, index) in listMovie" :key="index">
          <div v-if="movie.id === data1" class="">
            <v-img
              contain
              max-height="400"
              max-width="400"
              :src="movie.poster"
              class="center"
            ></v-img>

            <h2 class="position_text">
              {{ movie.movieName }}
            </h2>
            <p class="">{{ movie.studio }}</p>
            <p class="mb-5">Detail : {{ movie.detail }}</p>

            <v-text-field
              readonly
              class="fild center"
              suffix="Ticket"
              type="number"
              v-model="buy"
            ></v-text-field>

            <v-btn
              color="dark"
              class="mb-5"
              elevation="5"
              @click="buyTicket(1)"
              outlined
              >+</v-btn
            >
            <v-btn
              color="dark"
              class="mb-5"
              elevation="5"
              @click="buyTicket(-1)"
              outlined
              >-</v-btn
            >
            <br />
            <v-btn
              color="dark"
              elevation="5"
              @click="getToUser(movie.movieName)"
              outlined
              :loading="load"
              >BUY</v-btn
            >

            <br /><br />
            <v-snackbar v-model="snackbar">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase1";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
export default {
  data() {
    return {
      data1: this.$route.params.Pid,
      listMovie: [],
      buy: 1,
      uid: this.$store.state.uid,
      toUser: {},
      listbuy: [],
      load:false,
      text: `OK,you bought it.`,
      snackbar: false,
    };
  },
  mounted() {
    this.readData();
    this.readBuy();
  },
  methods: {
    async readData() {
      console.log("Show Data...");

      this.listMovie.splice(0, this.listMovie.length);
      const querySnapshot = await getDocs(collection(db, "movie"));
      querySnapshot.forEach((doc) => {
        const docAll = doc.data();
        docAll.id = doc.id;
        this.listMovie.push(docAll);
      });
    },
    buyTicket(i) {
      if (this.buy >= 1 && i != -1 && this.buy < 30) {
        this.buy = this.buy + i;
      } else if (this.buy >= 2 && i == -1) {
        this.buy = this.buy + i;
      }
    },

    async getToUser(name) {
      
      this.load=true
      this.toUser.movieName = name;
      this.toUser.buy = this.buy;
      const washingtonRef = doc(db, "buyMovie", this.uid);

      await updateDoc(washingtonRef, {
        regions: arrayUnion(this.toUser),
      });
      console.log("Done!!!");
      this.load=false
      this.snackbar = true;
    },
    async readBuy() {
      console.log("Show Data...");

      this.listbuy.splice(0, this.listMovie.length);
      const querySnapshot = await getDocs(collection(db, "buyMovie"));
      querySnapshot.forEach((doc) => {
        this.listbuy.push(doc.id);
      });
    },
    
  },
};
</script>

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.fild {
  width: 100px;
}
</style>