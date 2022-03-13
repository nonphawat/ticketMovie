import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dis:false,
    age:0,
    user:null,
    userName:null,
    uid:null,
    email:null,
    tel:null,
  },
  getters: {},
  mutations: {
    increment: (state,n) =>{
      state.age =n
    },
    getUid:(state,n) =>{
      state.user=n
      state.uid=n.uid
      state.email=n.email
    },
    getName:(state,n)=>{
      state.userName=n.name
      state.tel=n.tel
    },
    changeUse:(state,n)=>{
      state.userName=n.name
      
    },
  },
  actions: {},
  modules: {},
});
