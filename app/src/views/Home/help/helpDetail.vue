<template>
	<div style="padding: 10px;">
		<el-form
			:model="helpDetailForm"
			ref="helpUserFormRef"
			label-width="70px"
			class="demo-ruleForm"
		>
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="helpDetailForm.userName" style="color: black;" readonly></el-input>
			</el-form-item>
			<el-form-item label="求助时间" prop="createtime">
				<el-date-picker v-model="helpDetailForm.createtime" type="datetime" readonly></el-date-picker>
				<!-- <el-input v-model="helpUserForm.createtime"></el-input> -->
			</el-form-item>
			<el-form-item label="求助内容" prop="seekcontent">
				<el-input v-model="helpDetailForm.seekcontent" readonly></el-input>
			</el-form-item>
			<el-form-item label="位置" prop="location">
				<el-input v-model="helpDetailForm.location" readonly></el-input>
			</el-form-item>
			<el-form-item label="处理人" prop="handler">
				<el-input v-model="helpDetailForm.handler" readonly></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="state">
				<el-input v-model="helpDetailForm.state" readonly></el-input>
				</el-form-item>
			<el-form-item label="处理时间" prop="handletime">
				<el-date-picker v-model="helpDetailForm.handletime" type="datetime" readonly></el-date-picker>
			</el-form-item>
			<el-form-item label="处理内容" prop="handle">
				<el-input type="textarea" rows="3" v-model="helpDetailForm.handle" readonly></el-input>
			</el-form-item>
			<div style="text-align: center;">
				<el-button type="primary" @click="backHelp">返回</el-button>
			</div>	
		</el-form>
	</div>
</template>

<script>
	import { helpDataPost } from '../../../api/axios.js'
	export default {
		name:"helpDetail",
		data() {
			return {
				helpId: null,
				helpDetailForm: {},
				queryInfo: {
					id: null
				},
				options: [{
					value: "1",
					label: "未处理"
				}, {
					value: "2",
					label: "已处理"
				}],
			}
		},
		methods: {
			getDetail() {
				helpDataPost(this.queryInfo).then((res) => {
					console.log(res)
					if (res.rows[0].state === '1') {
						res.rows[0].state = '未处理'
					}
					if (res.rows[0].state === '2') {
						res.rows[0].state = '已处理'
					}
					this.helpDetailForm = res.rows[0]
				})
			},
			backHelp() {
				this.$router.push({
					name: 'help'
				})
				this.helpDetailForm = {}
			}
		},
		created() {
			this.queryInfo.id = this.$route.query.id
		},
		mounted() {
			this.getDetail()
		}
	}
</script>

<style>
</style>
