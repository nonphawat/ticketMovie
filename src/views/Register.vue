<template>
  <div>
    <v-layout row wrap justify-center class="text-center">
      <v-flex xs6>
        <h1 class="login">Register</h1>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          :rules="[(v) => !!v || '']"
          label="Password"
          required
        ></v-text-field>
        <v-text-field
          v-model="cfPassword"
          type="password"
          :rules="[(v) => !!v || '']"
          label="Confirm Password"
          required
        ></v-text-field>
        <v-btn
          color="dark"
          elevation="5"
          :loading="load1"
          @click="registerNew"
          outlined
          class="mb-10"
          >Register</v-btn
        >

        <v-snackbar v-model="snackbar">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <div v-show="form">
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
            class="mb-10"
            >Complete</v-btn
          >
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { auth, db } from "@/plugins/firebase1";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: "",
      cfPassword: "",
      emailRules: [(v) => !!v || "", (v) => /.+@.+\..+/.test(v) || ""],
      load1: false,
      load2: false,
      text: `Ok, then complete this form.`,
      snackbar: false,
      form: false,
      userName: "",
      tel: "",
      uid: null,
    };
  },
  methods: {
    async registerNew() {
      this.load1 = true;
      if (this.password === this.cfPassword) {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.uid = user.uid;
            this.load1 = false;
            // ...

            console.log("Add new user...", this.uid);
            this.text = `Ok, then complete this form.`;
            this.snackbar = true;
            this.form = true;
          })

          .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
          });
      } else {
        this.text = `Wrong Password.`;
        this.snackbar = true;
        this.load1 = false;
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
        this.$emit("show_hem", true);
        this.$router.push("/home");
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      try {
        const docData = {
          t: 1,
        };
        await setDoc(doc(db, "buyMovie", this.uid), docData);
        console.log("lebght=====", this.listbuy.length);
        console.log("Data Updated...");
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      this.load2 = false;
    },
  },
};
</script>

<style>
</style>