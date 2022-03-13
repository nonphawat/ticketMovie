<template>
  <div>
    <h2 style="text-align: center">Ticket ที่ซื้อ</h2>

    <v-simple-table dark v-for="(item, index) in listbuy" :key="index">
      <template v-slot:default v-if="uid == item.id">
        <thead>
          <tr>
            <th class="text-left">Movie Name</th>
            <th class="text-left">Ticket</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item2, index) in item.regions" :key="index">
            <td>{{ item2.movieName }}</td>
            <td>{{ item2.buy }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { db } from "@/plugins/firebase1";
import { collection, getDocs } from "firebase/firestore";
export default {
  data() {
    return {
      uid: this.$store.state.uid,
      listbuy: [],
    };
  },
  mounted() {
    this.readBuy();
  },
  methods: {
    async readBuy() {
      console.log("Show Data...");

      this.listbuy.splice(0, this.listbuy.length);
      const querySnapshot = await getDocs(collection(db, "buyMovie"));
      querySnapshot.forEach((doc) => {
        const docAll = doc.data();
        docAll.id = doc.id;
        this.listbuy.push(docAll);
      });
    },
  },
};
</script>

<style>
</style>