<template>
  <div class="solid mb-5">
    <h3 class="mb-5">Delete Movie</h3>
    
    <v-simple-table dark>
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
            <td><v-btn depressed :loading='loadins' @click="deleteMo(item.id)" color="error"> Delete </v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>

export default {
  props:['listMovie','loadins'],

  data() {
    return {
      
      studio: null,
      poster: null,
      detail: null,
    };
  },
  methods: {
    deleteMo(i) {
        console.log(i);
        this.$emit("movie_delete",i)
    }
    
  },
};
</script>

<style>
</style>