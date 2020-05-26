<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>动态管理</el-breadcrumb-item>
      <el-breadcrumb-item>动态列表</el-breadcrumb-item>
    </el-breadcrumb>

	<el-card style="height: 90px;">
		<div class="search_div">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline" label-width="100px">
				<el-row>
					<el-col :span="7">
						<el-form-item label="用户名">
							<el-input v-model="searchForm.userName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="内容">
							<el-input v-model="searchForm.content"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="定位">
							<el-input v-model="searchForm.location"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-button-group>
							<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>

						</el-button-group>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</el-card>

    <el-card>
		<el-button type="primary" icon="el-icon-refresh" @click="reload">刷新</el-button>
		<el-button type="danger" icon="el-icon-delete" @click="deleteMore">删除</el-button>
		<el-table :data="actionlist" stripe style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="index"></el-table-column>
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="userName" label="用户名"></el-table-column>
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column prop="content" label="内容"></el-table-column>
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
			<el-table-column prop="views" label="浏览数"></el-table-column>
			<el-table-column prop="location" label="定位"></el-table-column>
			<el-table-column prop="state" label="状态"></el-table-column>
			<el-table-column prop="createtime" label="发布时间"></el-table-column>
			<el-table-column label="操作">
				<template v-slot="scope">
					<!-- 删除动态 -->
					<el-button
						type="danger"
						@click="deleteAction(scope.row.id)"
						icon="el-icon-delete"
						size="mini"
					></el-button>
					<!-- 封禁动态 -->
					<el-button
						type="info"
						@click="banAction(scope.row)"
						icon="el-icon-remove"
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
import { actionDataPost, delActionData, banActionData, imgDataPost } from '../../api/axios.js'

export default {
  data() {
    return {
		actionlist: [],
		queryInfo: {
			userId: "",
			title: "",
			content: "",
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
		fit: "fill"
    };
  },
  methods: {
    async getActionList() {
		actionDataPost(this.queryInfo).then((res) => {
			if (res.flag === 1) {
				res.rows.forEach((item) => {
					item.createtime = this.getTime(item.createtime)
					if (item.state === "1") {
						item.state = "正常"
					}
					if (item.state === "2") {
						item.state = "封禁"
					}
				})
				this.actionlist = res.rows
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
		this.getActionList();
	},
	handleCurrentChange(newPage) {
		this.queryInfo.pageNumber = newPage;
		this.getActionList();
	},
	
	deleteAction(id) {
		this.$confirm("此操作将永久删除该动态, 是否继续?", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(async () => {
				delActionData(id).then(res => {
					if (res.flag === 1) {
						this.$message({
							type: "success",
							message: res.msg
						});
					} else {
						this.$message.error(res.msg)
					}
					this.getActionList()
				})
			})
			.catch(() => {
				this.$message({
					type: "info",
					message: "已取消删除"
				});
			});
	},
	handleSelectionChange(val) {
		this.multipleSelection = val
	},
	deleteMore() {
		const idArr = []
		this.multipleSelection.forEach((item) => {
			idArr.push(item.id)
		})
		this.deleteAction(idArr.toString())
	},
	reload() {
		this.getActionList()
	},
	search() {
		actionDataPost(this.searchForm).then((res) => {
			res.rows.forEach((item) => {
				item.createtime = this.getTime(item.createtime)
				if (item.state === "1") {
					item.state = "正常"
				}
				if (item.state === "2") {
					item.state = "封禁"
				}
			})
			this.actionlist = res.rows
			this.total = res.total
		})
	},
	banAction(obj) {
		this.banInfo.id = obj.id
		this.banInfo.title = obj.title
		this.banInfo.content = obj.content
		this.banInfo.location = obj.location
		banActionData(this.banInfo).then((res) => {
			if (res.flag === 1) {
				this.$message.success('封禁成功')
			} else {
				this.$message.error('封禁失败')
			}
			this.getActionList()
		})
	},
	checkImg(obj) {
		const apiUrl = imgDataPost()
		let url = ""
		obj.pictureList.forEach((item) => {
			url = apiUrl + item.path
			this.imgList.push(url)
		})
		this.imgDialogVisible = true
	},
	imgDialogClosed() {
		this.imgList = []
		this.imgDialogVisible = false
	}
  },	
  created() {
		this.getActionList();
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