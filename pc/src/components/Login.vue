<template>
	<div class="login_container">
		<div class="login_box" v-show="!show">
			<!-- 头像 -->
			<div class="avatar_box">
				<img src="../assets/logo.png" alt="">
			</div>
			<!-- 表单 -->
			<el-form ref="LoginFormRef" :model="loginForm" label-width="0" :rules="LoginFormRules" class="login_form">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="register">注册</el-button>
				</el-form-item>
			</el-form>  
		</div>
		
		<div class="register_box" v-show="show">
			<div class="avatar_box">
				<img src="../assets/logo.png" alt="">
			</div>
			<!-- 表单 -->
			<el-form ref="registerFormRef" :model="registerForm" label-width="80px" :rules="RegisterFormRules" class="register_form">
				<el-form-item label="用户名" prop="user">
					<el-input v-model="registerForm.user"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="registerPW">
					<el-input v-model="registerForm.password" type="password"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="registerForm.name"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="registerForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="省份" prop="province">
					<el-input v-model="registerForm.province"></el-input>
				</el-form-item>
				<el-form-item label="城市" prop="city">
					<el-input v-model="registerForm.city"></el-input>
				</el-form-item>
				<el-form-item label="车辆品牌" prop="vehiclebrand">
					<el-input v-model="registerForm.vehiclebrand"></el-input>
				</el-form-item>
				<el-form-item label="车辆型号" prop="vehicletype">
					<el-input v-model="registerForm.vehicletype"></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="confirm">注册并登录</el-button>
					<el-button type="info" @click="cancel">取消</el-button>
				</el-form-item>
			</el-form>  
		</div>
	</div>
</template>

<script>
import { loginDataPost, registerPost } from '../api/axios'

export default {
    data() {
      return {
		registerForm: {},
		RegisterFormRules: {
			user: [
				{ required: true, message: "请输入用户名", trigger: "blur" }
			],
			name: [
				{ required: true, message: "请输入姓名", trigger: "blur" }
			],
			// registerPW: [
			// 	{ required: true, message: "请输入密码", trigger: "blur" }
			// ],
			phone: [
				{ required: true, message: "请输入电话", trigger: "blur" }
			],
			province: [
				{ required: true, message: "请输入省份", trigger: "blur" }
			],
			city: [
				{ required: true, message: "请输入城市", trigger: "blur" }
			],
			vehiclebrand: [
				{ required: true, message: "请输入车辆品牌", trigger: "blur" }
			],
			vehicletype: [
				{ required: true, message: "请输入车辆型号", trigger: "blur" }
			]
		},
		show: false,
        loginForm:{
          username:'',
          password:''
        },
        LoginFormRules:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
		register() {
			this.show = true
		},
		login() {
			this.$refs['LoginFormRef'].validate(async (valid) => {
				if (valid) {
					loginDataPost(this.loginForm).then((res) => {
						if (res.flag === 1) {
							this.setCookie(res.obj)
							this.$message({
								message: res.msg,
								type: 'success'
							})
						this.$router.push('/home') 
						} else {
							this.$message({
								message: res.msg,
								type: 'error'
							})
						}
					})
				} else {
					return false
				}
			})
		},
		
		// 设置cookie
		setCookie (c_data, exdays) {
			var exdate = new Date()
			exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
			window.document.cookie = 'data' + '=' + JSON.stringify(c_data) + ';path=/;expires=' + exdate.toGMTString()
		},
		
		cancel() {
			this.show = false;
			// this.$refs.registerFormRef.resetFields();
		},
		confirm() {
			this.$refs['registerFormRef'].validate(async (valid) => {
				if (valid) {
					registerPost(this.registerForm).then((res) => {
						if (res.flag === 1) {
							this.$message.success('注册成功')
							this.loginForm.username = res.obj.user
							this.loginForm.password = res.obj.password
							loginDataPost(this.loginForm).then((res) => {
								if (res.flag === 1) {
									this.setCookie(res.obj)
									this.$message({
										message: res.msg,
										type: 'success'
									})
								this.$router.push('/home') 
								} else {
									this.$message({
										message: res.msg,
										type: 'error'
									})
								}
							})
						} else {
							this.$message.error(res.msg)
						}
					})
				} else {
					return false
				}
			})
		}
    }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
}

.register_box{
	width: 600px;
	height: 700px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%)
}

.avatar_box{
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left:50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form, .register_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.btns{
  display: flex;
  justify-content:flex-end;
}
</style>>

