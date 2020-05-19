<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户求助</el-breadcrumb-item>
      <el-breadcrumb-item>求助信息</el-breadcrumb-item>
    </el-breadcrumb>

	<el-card style="height: 160px;">
		<div class="search_div">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
				<el-row>
					<!-- <el-col :span="7">
						<el-form-item label="用户名">
							<el-input v-model="searchForm.userName"></el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="7">
						<el-form-item label="内容">
							<el-input v-model="searchForm.seekContent"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="定位">
							<el-input v-model="searchForm.location"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="状态">
							<el-select v-model="searchForm.state" clearable placeholder="请选择" style="width: 197px;">
								<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-button-group>
							<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
						</el-button-group>
					</el-col>
					
				</el-row>
				<el-row>
					
					<el-col :span="7">
						<el-form-item label="处理人">
							<el-input v-model="searchForm.handleUserId"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</el-card>

    <el-card>
		<el-button type="primary" icon="el-icon-refresh" @click="reload">刷新</el-button>
		<el-button type="danger" icon="el-icon-delete" @click="deleteMore">删除</el-button>
		<el-table :data="helplist" stripe style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="index"></el-table-column>
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="userName" label="用户名"></el-table-column>
			<el-table-column prop="seekcontent" label="求助内容"></el-table-column>
			<el-table-column label="图片">
					<template v-slot="scope">
						<!-- 查看图片-->
						<el-button
							type="text"
							@click="checkImg(scope.row)"
							size="small"
						>查看图片</el-button>
					</template>
			</el-table-column>
			<el-table-column prop="location" label="位置"></el-table-column>
			<el-table-column prop="createtime" label="求助时间"></el-table-column>
			<el-table-column prop="state" label="状态"></el-table-column>
			<el-table-column prop="handle" label="处理内容"></el-table-column>
			<el-table-column prop="handletime" label="处理时间"></el-table-column>
			<el-table-column prop="handler" label="处理人"></el-table-column>
			<el-table-column label="操作">
				<template v-slot="scope">
					<!-- 处理求助 -->
					<el-button
						type="primary"
						@click="handleHelp(scope.row)"
						icon="el-icon-edit"
						size="mini"
					></el-button>
					<!-- 删除求助信息 -->
					<el-button
						type="danger"
						@click="delHelp(scope.row.id)"
						icon="el-icon-delete"
						size="mini"
					></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="queryInfo.pageNumber"
			:page-sizes="[1, 2, 5, 10]"
			:page-size="queryInfo.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		></el-pagination>
    </el-card>
	
	<el-dialog
		title="用户求助"
		:visible.sync="helpDialogVisible"
		width="50%"
		@close="helpDialogClosed"
	>
		<el-form
			:model="helpUserForm"
			ref="helpUserFormRef"
			label-width="70px"
			class="demo-ruleForm"
		>
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户名" prop="userName">
						<el-input v-model="helpUserForm.userName" style="width: 21.875rem" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="求助时间" prop="createtime">
						<el-date-picker v-model="helpUserForm.createtime" type="datetime" style="width: 21.875rem;" disabled></el-date-picker>
						<!-- <el-input v-model="helpUserForm.createtime"></el-input> -->
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="求助内容" prop="seekcontent">
				<el-input v-model="helpUserForm.seekcontent"></el-input>
			</el-form-item>
			<el-form-item label="位置" prop="location">
				<el-input v-model="helpUserForm.location"></el-input>
			</el-form-item>
			
			<el-row>
				<el-col :span="12">
					<!-- <el-form-item label="处理人" prop="handler">
						<el-input v-model="helpUserForm.handler" style="width: 21.875rem"></el-input>
					</el-form-item> -->
					<el-form-item label="处理时间" prop="handletime">
						<el-date-picker v-model="helpUserForm.handletime" style="width: 21.875rem" type="datetime"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态" prop="state">
						<el-select v-model="helpUserForm.state" clearable placeholder="请选择" style="width: 21.875rem">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-form-item label="处理内容" prop="handle">
				<el-input type="textarea" rows="3" v-model="helpUserForm.handle"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="handleCancel">取 消</el-button>
			<el-button type="primary" @click="handleConfirm">确 定</el-button>
		</span>
	</el-dialog>

	<el-dialog
		title="查看图片"
		:visible.sync="imgDialogVisible"
		width="50%"
		@close="imgDialogClosed"
		ref="imgDialog"
	>
		<div class="img" >
			<div class="img_div" v-for="url in imgList" :key="url">
				<el-image :src="url" :fit="fit" style="height: 240px;" :preview-src-list="imgList"></el-image>
			</div>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { helpDataPost, handleDataPost, delHandleData, imgDataPost } from '../../api/axios.js'
import { Home } from '../../views/Home.vue'

export default {
  data() {
    return {
		options: [{
			value: "1",
			label: "未处理"
		}, {
			value: "2",
			label: "已处理"
		}],
		helplist: [],
		queryInfo: {
			id: null,
			userId: "",
			title: "",
			seekcontent: "",
			location: "",
			state: "",
			views: "",
			pageSize: 10,
			pageNumber: 1
		},
		total: 0,
		multipleSelection: [],
		searchForm: {
			pageSize: 10,
			pageNumber: 1
		},
		banInfo: {
			id: "",
			title: "",
			content: "",
			location: "",
			state: "2"
		},
		imgDialogVisible: false,
		imgList: [],
		websock: null,
		userId: null,
		helpDialogVisible: false,
		helpUserForm: {},
		fit: 'fill'
    };
  },
  methods: {
	checkImg(obj) {
		const apiUrl = imgDataPost()
		let url = ""
		obj.pictureList.forEach((item) => {
			url = apiUrl + item.path
			this.imgList.push(url)
		})
		console.log(this.imgList)
		this.imgDialogVisible = true
	},
	imgDialogClosed() {
		this.imgList = []
		this.imgDialogVisible = false
	},
	// 读取cookie
	getCookie: function () {
		var that = this
		let list = {}
		if (document.cookie.length > 0) {
			var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
			for (var i = 0; i < arr.length; i++) {
				var arr2 = arr[i].split('=') // 再次切割
				// 判断查找相对应的值
				if (arr2[0] === 'data') {
					list = JSON.parse(arr2[1])
					this.userId = list.id
					break
				}
			}
		}
	},
	initWebSocket(){ //初始化weosocket
		const api = "ws://114.116.242.72:8080/seek/"
		this.websock = new WebSocket(api + this.userId + "/2");
		this.websock.onmessage = this.websocketonmessage;
		this.websock.onopen = this.websocketonopen;
		this.websock.onerror = this.websocketonerror;
		this.websock.onclose = this.websocketclose;
		// this.timer = setInterval(this.websock.onmessage, 1000)
	},
	websocketonopen(){ //连接建立之后执行send方法发送数据
		// this.websocketsend(JSON.stringify(actions));
	},
	websocketonerror(){//连接建立失败重连
		this.initWebSocket();
	},
	websocketonmessage(event){ //数据接收
		this.getHelpList()
	},
	websocketsend(Data){//数据发送
		this.websock.send(Data);
	},
	websocketclose(e){  //关闭
		console.log('断开连接',e);
	},
    async getHelpList() {
		helpDataPost(this.queryInfo).then((res) => {
			console.log(res)
			if (res.flag === 1) {
				res.rows.forEach((item) => {
					if (item.state === "1") {
						item.state = '未处理'
					}
					if (item.state === "2") {
						item.state = '已处理'
					}
					item.createtime = this.getTime(item.createtime)
					if (item.handletime) {
						item.handletime = this.getTime(item.handletime)
					}
				})
				this.helplist = res.rows
				this.total = res.total
			}
		})
    },
	
	getTime(time) {
		var date = new Date(time)
		var year = date.getFullYear()
		var mon = date.getMonth()+1;
		var day = date.getDate();
		var hours = date.getHours();
		var minu = date.getMinutes();
		var sec = date.getSeconds();
		if (mon < 10) {
			mon = '0' + mon
		}
		if (day < 10) {
			day = '0' + day
		}
		if (hours < 10) {
			hours = '0' + hours
		}
		if (minu < 10) {
			minu = '0' + minu
		}
		if (sec < 10) {
			sec = '0' + sec
		}
		return year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
	},

	handleSizeChange(newSize) {
		this.queryInfo.pageSize = newSize
		this.getHelpList();
	},
	handleCurrentChange(newPage) {
		this.queryInfo.pageNumber = newPage;
		this.getHelpList();
	},
	
	handleHelp(obj) {
		this.helpUserForm = obj
		this.helpDialogVisible = true
	},
	
	handleSelectionChange(val) {
		this.multipleSelection = val
	},
	
	deleteMore() {
		const idArr = []
		this.multipleSelection.forEach((item) => {
			idArr.push(item.id)
		})
		this.$confirm("此操作将永久删除该求助信息, 是否继续?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(async () => {
			delHandleData(idArr.toString()).then(res => {
				if (res.flag === 1) {
					this.$message({
						type: "success",
						message: res.msg
					});
				} else {
					this.$message.error(res.msg)
				}
				this.getHelpList()
			})
		}).catch(() => {
			this.$message({
				type: "info",
				message: "已取消删除"
			});
		})
	},
	
	delHelp(id) {
		this.$confirm("此操作将永久删除该求助信息, 是否继续?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(async () => {
				delHandleData(id).then(res => {
					if (res.flag === 1) {
						this.$message({
							type: "success",
							message: res.msg
						});
					} else {
						this.$message.error(res.msg)
					}
					this.getHelpList()
				})
			})
			.catch(() => {
				this.$message({
					type: "info",
					message: "已取消删除"
				});
			});
	},
	
	reload() {
		this.getHelpList()
	},
	search() {
		helpDataPost(this.searchForm).then((res) => {
			if (res.flag === 1) {
				res.rows.forEach((item) => {
					if (item.state === "1") {
						item.state = '未处理'
					}
					if (item.state === "2") {
						item.state = '已处理'
					}
				})
				this.helplist = res.rows
				this.total = res.total
			}
		})
	},
	handleConfirm() {
		handleDataPost(this.helpUserForm).then((res) => {
			if (res.flag === 1) {
				this.helpUserForm = res.obj
				let data = this.helpUserForm.userid + ',' + this.helpUserForm.id
				this.websocketsend(data)
				this.helpDialogVisible = false
				this.getHelpList()
			} else {
				this.$message.error('处理信息提交失败！')
			}
		})
	},
	helpDialogClosed() {
		this.helpDialogVisible = false
	},
	handleCancel() {
		this.helpDialogVisible = false
		this.helpUserForm = {}
	}
  },	
  async created() {
	await this.getCookie()
	this.initWebSocket()
	this.getHelpList()
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bd-top {
  border-top: 1px solid #eee;
}

.bd-bottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}


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
	// overflow: hidden;
	// padding-top: 10px;
	// padding-bottom: 10px;
}
</style>