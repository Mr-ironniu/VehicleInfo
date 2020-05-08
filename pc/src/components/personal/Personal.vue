<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>编辑个人信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
		<el-form :inline="true" :model="personalForm" class="demo-form-inline" label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户名">
						<el-input v-model="personalForm.user" style="width: 400px;" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户类型">
						<el-input v-model="personalForm.type" style="width: 400px;" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="密码">
						<el-input v-model="personalForm.password" style="width: 400px;" :disabled="edit"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="姓名">
						<el-input v-model="personalForm.name" style="width: 400px;" :disabled="edit"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="电话">
						<el-input v-model="personalForm.phone" style="width: 400px;" :disabled="edit"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="省份">
						<el-input v-model="personalForm.province" style="width: 400px;" :disabled="edit"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="城市">
						<el-input v-model="personalForm.phone" style="width: 400px;" :disabled="edit"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="车辆品牌">
						<el-input v-model="personalForm.vehiclebrand" style="width: 400px;" :disabled="edit"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="车辆型号">
						<el-input v-model="personalForm.vehicletype" style="width: 400px;" :disabled="edit"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<div class="button_class">
					<el-button type="primary" icon="el-icon-edit" @click="editInfo">编辑</el-button>
					<el-button type="primary" icon="el-icon-check" @click="submitInfo">提交</el-button>
				</div>
			</el-row>
		</el-form>
    </el-card>

  </div>
</template>

<script>
import { editUserData } from '../../api/axios.js'

export default {
  data() {
    return {
		personalForm: {},
		edit: true
    };
  },
  methods: {
    async getPersonalData() {
		this.getCookie()
    },
	editInfo() {
		this.edit = false
	},
	
	// 设置cookie
	setCookie (c_data, exdays) {
		var exdate = new Date()
		exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
		window.document.cookie = 'data' + '=' + JSON.stringify(c_data) + ';path=/;expires=' + exdate.toGMTString()
	},
	
	// 读取cookie
	getCookie: function () {
		var that = this
		if (document.cookie.length > 0) {
			var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
			for (var i = 0; i < arr.length; i++) {
				var arr2 = arr[i].split('=') // 再次切割
				// 判断查找相对应的值
				if (arr2[0] === 'data') {
					this.personalForm = JSON.parse(arr2[1])
					break
				}
			}
		}
	},
	submitInfo() {
		if (!this.edit) {
			editUserData(this.personalForm).then((res) => {
				if (res.flag === 1) {
					this.edit = true
					this.$message.success('修改成功')
					this.setCookie(res.obj)
				} else {
					this.$message.success('修改失败')
				}
			})
		} else {
			this.$message.info('请编辑后提交')
		}
	}
  },
  created() {
		this.getPersonalData();
  }
};
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}

.button_class {
	text-align: center;
}
</style>
