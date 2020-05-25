<template>
	<div style="padding: 10px; background-color: #FFFFFF;">
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
			<el-form-item label="求助图片">
				<el-button type="text" @click="lookPic">查看图片</el-button>
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
		<div style="height: 5rem; background-color: #FFFFFF;"></div>
		<el-dialog
			title="查看图片"
			:visible.sync="imgDialogVisible"
			width="100%"
			@close="imgDialogClosed"
			ref="imgDialog"
		>
			<el-carousel indicator-position="none" height="200px">
				<el-carousel-item v-for="url in imgList" :key="url" >
					<el-image :src="url" :fit="fit" style="height: 100%;"></el-image>
				</el-carousel-item>
			</el-carousel>
		</el-dialog>
	</div>
</template>

<script>
	import { helpDataPost, imgDataPost } from '../../../api/axios.js'
	export default {
		name:"helpDetail",
		data() {
			return {
				helpId: null,
				imgDialogVisible: false,
				fit: "fill",
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
				imgList: []
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
			},
			lookPic() {
				const apiUrl = imgDataPost()
				let url = ""
				this.helpDetailForm.pictureList.forEach((item) => {
					url = apiUrl + item.path
					this.imgList.push(url)
				})
				this.imgDialogVisible = true
			},
			imgDialogClosed() {
				this.imgDialogVisible = false
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
	.img {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
	}
	
	.img_div {
		border: 1px solid silver;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width:30%;
		height: 30%;
		margin-top: 5px;
		margin-right: 5px;
		/* // overflow: hidden; */
		/* // padding-top: 10px; */
		/* // padding-bottom: 10px; */
	}
</style>
