<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-btn v-show="hem" icon @click="drawer = !drawer" :disabled="dis">
          <span class="material-icons"> list </span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-switch v-model="$vuetify.theme.dark" class="position"></v-switch>
    </v-app-bar>
    <br />
    <br /><br />
    <div >
      <v-navigation-drawer v-model="drawer"  app temporary dark>
        <v-sheet dark color="lighten-4" class="pa-4">
          <h4 class="mb-4">{{this.$store.state.userName}}</h4>
         

          <div>
            {{this.$store.state.email}} <br>
            <v-btn v-show="adminBtn" color="dark" elevation="5"   outlined
            to="/admin"  >Admin</v-btn
            >
          </div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view @change="changeIcon" @changeAdmin="show_btn" @show_hem="change_hem" />
      
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    dis: true,
    adminBtn:false,
    hem:false,

    items: [
      { title: "Movie", path: "/home" },
      { title: "Your Ticket", path: "/about" },
    ],
  }),
  methods: {
    changeIcon(i) {
      this.dis = i;
    },
    show_btn(i){
      this.adminBtn=i;
    },
    change_hem(i){
      this.hem=i
    }
  },
};
</script>

<style scoped>
.stic {
  position: absolute;
  top: 80px;
  left: 0;
}
.position {
  position: relative;
  top: 10px;
}
</style>