<template>
  <div>
    
    <v-row no-gutters>
      <v-col v-for="(movie, index) in listMovie" :key="index" cols="sm">
        <v-card class="mx-auto mb-5" max-width="350">
          <v-img class="white--text align-end jpgs" :src="movie.poster">
          </v-img>

          <v-card-title>{{ movie.movieName }}</v-card-title>

          <v-card-text class="text--primary">
            <div>Studio: {{ movie.studio }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text @click="goDetail(movie.id)"> Buy Now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import { auth, db } from "@/plugins/firebase1";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
export default {
  name: "Home",

  components: {
    HelloWorld,
  },

  mounted() {
    this.checkLogin();
    this.readData();
  },

  data() {
    return {
      uid: "",
      tr: false,
     
      all: null,
      listMovie: [],
      listBuy:[]
    };
  },
  methods: {
    checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          this.uid = uid;
          this.$store.commit("increment", 1);
          this.$store.commit("getUid", user);
          this.$emit("change", this.tr);

          console.log("Heloooo");
          onSnapshot(doc(db, "user", this.uid), (doc) => {
           
            this.all = doc.data();
            console.log("this is all = ", this.all.name);
            this.$store.commit("getName", doc.data());
          });

          // ...
          //this.email = user.email;
          //this.uid = user.uid;
        } 
      });
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
    goDetail(i){
      this.$router.push({name:'detail', params: { Pid: i }})
    }
  },
};
</script>

<style>
.jpgs {
  width: 100%;
  height: 100%;
}
</style>