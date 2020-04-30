<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="dada">点我</button>
  </div>
</template>

<script>
import axios from '../api/http.js'

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return{
      info: {
        userInfo: {"type": "2"},
        pageSize: 3,
        pageNumber: 1
      }
    }
  },
  methods:{
    dada(){
      console.log(this.info);      
      let data = axios.qingqiu(this.info);
      console.log(data);
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
