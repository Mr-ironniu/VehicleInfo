import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'

Vue.use(Vuex);
let defaultObj = '';
defaultObj = sessionStorage.getItem("USER");

console.log('sessionStorage.USER :>> ', );

export default new Vuex.Store({
  state:{
    content:'',
    obj: JSON.parse(defaultObj) 
  },
  mutations:{
    changeContent (state, content){
      state.content = content;
    },
    changeUser(state,obj){
      state.obj = obj
      console.log('state :>> ', state.obj);
    }
  }
})