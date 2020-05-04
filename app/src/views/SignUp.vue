<template>
  <div class="about">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-form validate-first @submit="SignUp">
          <van-field
            v-model="user"
            name="user"
            placeholder="用户"
            :rules="[{ required:true, message: '请填写用户' }]"
          />
          <van-field
            v-model="name"
            name="name"
            placeholder="昵称"
            :rules="[{ required:true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="password"
            name="password"
            type="password"
            placeholder="密码"
            :rules="[{ required:true, message: '请填写密码' }]"
          />
          <van-field
            v-model="province"
            name="province"
            placeholder="省份"
            :rules="[{ required:true, message: '请填写省份' }]"
          />
          <van-field
            v-model="city"
            name="city"
            placeholder="城区"
            :rules="[{ required:true, message: '请填写城区' }]"
          />
          <van-field
            v-model="phone"
            name="phone"
            placeholder="手机号"
            :rules="[{ validator, message: '请填写正确手机号' }]"
          />
          <van-field
            v-model="vehiclebrand"
            name="vehiclebrand"
            placeholder="汽车厂家"
            :rules="[{ required:true, message: '请填写汽车厂家' }]"
          />
          <van-field
            v-model="vehicletype"
            name="vehicletype"
            placeholder="汽车型号"
            :rules="[{ required:true, message: '请填写汽车型号' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { UserSignup } from '../api/axios.js'

export default {
  name: 'SignUp',
  data(){
    return{
      user:'',
      name:'',
      password:'',
      province:'',
      city:'',
      phone:'',
      vehiclebrand:'',
      vehicletype:'',
      type:1,
    }
  },
  methods:{
    validator(val) {
      return /1\d{10}/.test(val);
    },
    onClickLeft(){
      this.$router.push({
                    name: 'Login'
                })      
    },
    SignUp(val){
      val.type = 1;
      UserSignup(val).then( res =>{
        console.log(res);
        if(res.msg == "注册成功"){
          this.$notify({
            message:'注册成功',
            type:'success',
            duration:2000
            })
          this.$router.push({
                    name: 'Login'
                }) 
        }        
      })
      
    }
  }
}
</script>
<style scoped>

</style>
yjj1
剑姬
123
北京市
朝阳区
110120119
大众
一代
1