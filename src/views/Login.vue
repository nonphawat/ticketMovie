<template>
  <div>
    <v-layout row wrap justify-center class="text-center">
      <v-flex xs6>
        <h1 class="login">Welcome</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[(v) => !!v || '']"
            label="Password"
            required
            type="password"
          ></v-text-field>
        </v-form>

        <v-btn
          color="dark"
          elevation="5"
          :disabled="!valid"
          :loading="load"
          @click="login()"
          large
          outlined
          class="mb-10"
          >Sign In</v-btn
        >

        <h4>If you are new here</h4> 
        <v-btn
          color="dark"
          elevation="5"
          
          
          @click="regiter()"
          
          outlined
          class="mb-10"
          >Register</v-btn
        >
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/plugins/firebase1";

export default {
  name:"Login",
  data() {
    return {
      valid: true,
      name: "",

      email: "",
      emailRules: [(v) => !!v || "", (v) => /.+@.+\..+/.test(v) || ""],
      data: [],

      tr: true,
      password: "",
      load: false,
      activePicker: null,

      text: `บันทึกข้อมูลของท่านแล้ว`,
      loadDta: false,
    };
  },
  mounted() {
    this.checkLogin();
    
  },
   
  methods: {
    
    login() {
      this.load=true
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User = " + user.uid);
          // ...
          this.load=false;
           if(user.uid==='xXFFXbTheXV6dH6vflcvopyO8Hk1'){
              this.$emit("changeAdmin", true);
              
          }
          this.$emit("show_hem", true);
          this.$router.push("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.load=false;
          console.log(errorCode + " " + errorMessage);
        });
    },
     checkLogin() {
      this.$emit("change", this.tr);
    },
    regiter() {
      this.$router.push("/register");
    },
    
   
  },
};
</script>

<style >
.login {
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>