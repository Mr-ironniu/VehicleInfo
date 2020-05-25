<template>
  <div class="wrapper">
    <div class="header">
      <img class="logo" src="../../assets/logo.png">
    </div>
    <div class="wrapper-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" style="font-size:19px;">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="footer">
      <van-button plain type="info" @click="SignUp" style="width:30%;font-size:19px;border-radius:5px;">注册</van-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { UserLogin } from '../../api/axios.js'

export default {
  name: 'Login',
  data(){
    return{
      password:'',
      username:''
    }
  },
  methods:{
    onSubmit(value){
      this.$toast.loading({
        duration:0,
        forbidClick: true,
      })
      UserLogin(value).then(res =>{
		console.log(value)
        this.$toast.clear();
        if(res.msg == '登录成功'){
			this.setCookie(res.obj)
          this.$toast.success("登录成功")
          this.$store.commit('changeUser',res.obj);
          this.$router.push({
                  name: 'message',
                  params: {
                    obj: res.obj
                  }
              })
        } else{
          this.$toast.fail(res.msg);
        }        
      })     
    },
    SignUp(){
      this.$router.push({
                    name: 'SignUp'
                })      
    },
	// 设置cookie
	setCookie (c_data, exdays) {
		var exdate = new Date()
		exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
		window.document.cookie = 'userdata' + '=' + JSON.stringify(c_data) + ';path=/;expires=' + exdate.toGMTString()
	},
  }
}
</script>

<style scoped>
.wrapper{
  position: relative;
  background-color: #f4f4f4;
}
.header{
  height:250px;
  width:100%;
  position:relative
}
.logo{
  position: absolute;
  height: 100px;
  width:100px;
  border-radius: 50px;
  background-color: red;
  left: 0;
  right: 0;
  bottom:10%;
  margin:auto;
}
.wrapper-form{
  position:relative;
  height: 200px;
  width:90%;
  left: 0;
  right: 0;
  margin: auto;
}
.footer{
  width:100%;
  height: 20%;
  position: relative;
  text-align: center;
  padding-top:165px;
  padding-bottom: 7px;
}
</style>
