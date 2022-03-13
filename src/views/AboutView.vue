<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <br />
        <div class="text-center">
          <h2>{{ this.$store.state.userName }}</h2>
          <p>
            {{ this.$store.state.email }} <br />
            {{ this.$store.state.tel }}
          </p>

          

          <v-btn
            tile
            class="mb-8"
            color="dark"
            elevation="5"
            @click="showFix = !showFix"
            outlined
          >
            แก้ไขข้อมูลส่วนตัว
          </v-btn>
          <div class="solid" v-show="showFix">
            <v-text-field
              v-model="userName"
              :rules="[(v) => !!v || '']"
              label="User Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="tel"
              :rules="[(v) => !!v || '']"
              label="Tel."
              required
            ></v-text-field>
            <v-btn
              color="dark"
              elevation="5"
              :loading="load2"
              @click="conncectNew()"
              outlined
              >แก้ไข</v-btn
            >
          </div>
          <br />
          <v-btn
            tile
            @click="logOut()"
            class="mb-8"
            color="dark"
            elevation="5"
            outlined
          >
            Log Out
          </v-btn>
        </div>
        <List></List>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import List from "../components/OldList.vue";
import { auth, db } from "@/plugins/firebase1";
import { signOut } from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
export default {
  components: {
    List,
  },
  mounted() {
    this.checkLogin();
  },
  data() {
    return {
      tr: false,
      userName: "",
      tel: "",
      uid: "",
      load2: false,
      showFix: false,
      all: null,
    };
  },
  methods: {
    logOut() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.

          console.log("Sign-out...");
        })
        .catch((error) => {
          // An error happened.
          console.log("Error some");
        });
      this.$emit("show_hem", false);
      this.$emit("changeAdmin", false);
      this.$router.push("/");
    },
    checkLogin() {
      if (this.$store.state.age != 1) {
        this.$router.push("/");
      } else {
        this.uid = this.$store.state.uid;
      }
    },
    async conncectNew() {
      this.load2 = true;
      try {
        const docData = {
          name: this.userName,
          tel: this.tel,
        };
        await setDoc(doc(db, "user", this.uid), docData);
        console.log("Data Updated...");
        this.readReal();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      this.load2 = false;
    },
    readReal() {
      console.log("Heloooo");
      onSnapshot(doc(db, "user", this.uid), (doc) => {
        console.log("Current data: ", doc.data());
      });
    },
  },
};
</script>

<style>
.login {
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.solid {
  border-style: solid;
  padding: 20px;
}
</style>
