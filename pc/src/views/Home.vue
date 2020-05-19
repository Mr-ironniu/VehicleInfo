<template>
  <el-container style="height:100vh">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>车辆运行信息数据采集系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          router
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="$route.path"
        >
          <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
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
					<el-input type="textarea" rows="3" v-model="helpUserForm.seekcontent"></el-input>
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
		<HelpNotice :helpList="helpList" :modal="modal" @closeNotice="closeTip" @showEdit="goHandle"></HelpNotice>
    </el-container>
  </el-container>
</template>

<script>
import { userDataPost, helpDataPost, handleDataPost, imgDataPost } from '../api/axios.js'
import HelpNotice from '../components/help/notice/HelpNotice.vue'

export default {
	components: {
		'HelpNotice': HelpNotice
	},
  data() {
    return {
		menulist: [
			{
				"id":125,
				"authName":"用户管理",
				"path":"users",
				"children":[
					{
						"id":110,
						"authName":"用户列表",
						"path":"users",
						"children":[

						],
						"order":null
					},{
						"id":111,
						"authName":"管理员列表",
						"path":"admin",
						"children":[
						
						],
						"order":null
					}
				],
				"order":1
			},
			{
				"id":103,
				"authName":"动态管理",
				"path":"rights",
				"children":[
					{
						"id":111,
						"authName":"动态列表",
						"path":"actions",
						"children":[

						],
						"order":null
					},
				],
				"order":2
			},
			{
				"id":124,
				"authName":"个人信息",
				"path":"orders",
				"children":[
					{
						"id":107,
						"authName":"编辑个人信息",
						"path":"personal",
						"children":[

						],
						"order":null
					}
				],
				"order":3
			},
			{
				"id":102,
				"authName":"求助信息",
				"path":"orders",
				"children":[
					{
						"id":101,
						"authName":"求助信息",
						"path":"help",
						"children":[
								
						],
						"order":null
					}
				],
				"order":3
			},
		],
		iconObj: {
			"124": "iconfont icon-icon_user",
			"125": "iconfont icon-icon_user",
			"103": "iconfont icon-tijikongjian",
			"101": "iconfont icon-shangpin",
			"102": "iconfont icon-danju",
			"145": "iconfont icon-baobiao"
		},
		isCollapse: false,
		websock: null,
		timer: "",
		userId: null,
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
		queryName: "",
		helpDialogVisible: false,
		helpUserForm: {},
		options: [{
			value: "1",
			label: '未处理'
		},{
			value: "2",
			label: '已处理'
		}],
		helpList: [],
		nameList: [],
		arrList: [],
		modal: false
    };
  },
  methods: {
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
		console.log('123')
		// this.websocketsend(JSON.stringify(actions));
	},
	websocketonerror(){//连接建立失败重连
		this.initWebSocket();
	},
	websocketonmessage(event){ //数据接收
		this.queryInfo.id = event.data
		helpDataPost(this.queryInfo).then((res) => {
			let picList = []
			let arrList = []
			if (res.flag === 1) {
				const api = imgDataPost()
				picList = res.rows[0].pictureList
				res.rows[0].createtime = this.getTime(res.rows[0].createtime)
				picList.forEach(item => {
					item.path = api + item.path
				})
				res.rows[0].pictureList = picList
				this.arrList.push(res.rows[0])
				this.helpList = this.arrList.reverse()
				this.modal = true
				this.helpUserForm = res.rows[0]
				// console.log(this.helpList)
			}
			const h = this.$createElement
			this.$notify({
				title: '提示',
				type: 'warning',
				dangerouslyUseHTMLString: true,
				duration: 2000,
				message: h('div', {
					on: {
						click:this.goHandle
					}
				},this.queryName + '发来一条求助信息，点击此提示框进行处理或请尽快前往求助信息页面处理！')
				// `<div><strong style="font-size: 18px">` + this.queryName + `</strong><button style="border-style: none none solid none; background: #fff; border-color: blue; color: blue" onClick="${goHandle}">前往处理</button></div>`
			})
		})
		// console.log(event)
		// const redata = JSON.parse(event.data);
	},
	websocketsend(Data){//数据发送
		this.websock.send(Data);
	},
	websocketclose(e){  //关闭
		this.websock.close()
		// console.log('断开连接',e);
	},
	
	handleCancel() {
		this.helpDialogVisible = false
		this.helpUserForm = {}
	},
	
	handleConfirm() {
		this.helpUserForm.handleUserId = this.userId
		handleDataPost(this.helpUserForm).then((res) => {
			this.helpUserForm.handletime = this.getTime(this.helpUserForm.handletime)
			if (res.flag === 1) {
				// console.log(res)
				var date = new Date(res.obj.handletime)
				var time = date.getTime()
				// this.helpUserForm = res.obj
				let data = this.helpUserForm.userid + ',' + this.helpUserForm.id
				this.websocketsend(data)
				this.helpDialogVisible = false
			}
		})
		console.log(this.helpUserForm)
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
	
	logout() {
		window.sessionStorage.clear;
		this.websock.onclose()
		this.$router.push("/");
    },
	
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
	goHandle(data) {
		if (!this.helpDialogVisible) {
			this.helpDialogVisible = true
		}
	},
	helpDialogClosed() {
		this.helpDialogVisible = false
	},
	closeTip() {
		this.modal = false
	}
  },
  async created() {
	await this.getCookie()
	this.initWebSocket();
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>