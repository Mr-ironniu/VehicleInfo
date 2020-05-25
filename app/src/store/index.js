import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'

Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    content:'',
    obj: ''
  },
  mutations:{
    changeContent (state, content){
      state.content = content;
    },
    changeUser(state,obj){
      state.obj = obj
      console.log('state :>> ', state.obj);
      // localStorage.objData = obj
    }
  }
})