<template>
	<div>
		<el-tabs v-model="activeName" @tab-click="handleClick" >
			<el-tab-pane label="我的求助" name="myHelp" ref="tabItem">
				<div v-for="item in helpList" :key="item.id" style="margin-top: 5px;">
					<el-card :body-style="{ padding: '0px' }">
						<div style="padding: 14px;">
							<span style="white-space: nowrap;">{{item.seekcontent | ellipsis}}</span>
							<div class="bottom clearfix">
								<span class="time" style="margin-right: 5px">{{item.createtime | dateFormat}}</span><span class="time" style="margin-right: 5px">||</span><span class="time" :style="{'color': item.state === '1' ? 'red' : '#00e500'}">{{item.state === '1' ? '未处理' : '已处理'}}</span>
								<el-button type="text" class="button" @click="goDetail(item.id)">查看详情</el-button>
							</div>
						</div>
					</el-card>
				</div>
			</el-tab-pane>
			<el-tab-pane label="发起求助" name="help">
				<div style="padding: 10px;">
					<el-form
						:model="helpForm"
						ref="helpFormRef"
						label-width="70px"
						class="demo-ruleForm"
					>
						<el-form-item label="用户名" prop="userName">
							<el-input v-model="helpForm.userName"></el-input>
						</el-form-item>
						<!-- <el-form-item label="求助时间" prop="createtime">
							<el-date-picker v-model="helpForm.createtime" type="datetime"></el-date-picker>
						</el-form-item> -->
						<el-form-item label="求助内容" prop="seekContent">
							<el-input type="textarea" :rows="3" v-model="helpForm.seekContent"></el-input>
						</el-form-item>
						<el-form-item label="位置" prop="location">
							<el-input v-model="helpForm.location">
								<el-button slot="append" :icon="iconName" @click="getLocation"></el-button>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submit">提交</el-button>
							<el-button @click="resetForm('helpFormRef')">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-tab-pane>
		</el-tabs>
		<div style="height: 5rem; background-color: #f4f4f4;"></div>
	</div>
</template>

<script type="text/javascript" src='https://webapi.amap.com/maps?v=1.4.15&key=039207bfce18c539c470483ce49e08ed'></script>
<script>
import { helpDataPost, helpDataSubmit } from '../../../api/axios'

export default {
	// inject:['reload'],
    name:'help',
	filters:{
		dateFormat(time) {
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
			time = year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
			return time
		},
		ellipsis (value) {
			if (!value) return ''
			if (value.length > 18) {
				return value.slice(0,18) + '...'
			}
			return value
		}
	},
    data(){
        return{
			map: null,
            activeName: 'myHelp',
			personal: {},
			queryInfo: {
				userId: "",
				pageSize: 10000,
				// pageNumber: 1
			},
			helpForm: {
				type: '1',
				state: '1'
			},
			iconName: 'el-icon-location',
			helpList: [],
			websocket: null
        }
    },
	methods:{
		initWebSocket(){ //初始化weosocket
			const api = "ws://114.116.242.72:8080/seek/"
			this.websock = new WebSocket(api + this.queryInfo.userId + "/1");
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
		websocketonmessage(){ //数据接收
			this.$message.success('您的求助信息已处理，请前往查看')
			this.getHelpList()
		},
		websocketsend(Data){//数据发送
			this.websock.send(Data);
		},
		websocketclose(e){  //关闭
			this.websock.close()
			// console.log('断开连接',e);
		},
		init(){
			let that = this
			AMap.plugin('AMap.Geolocation', function() {
				let geolocation = new AMap.Geolocation({
					enableHighAccuracy: true,//是否使用高精度定位，默认:true
					timeout: 5000,          //超过10秒后停止定位，默认：5s
				});
				that.iconName = 'el-icon-loading'
				geolocation.getCurrentPosition(function(status,result){
					if(status=='complete'){
						that.helpForm.location = result.formattedAddress
						that.$set(that, 'helpForm', {...that.helpForm})
						that.iconName = 'el-icon-location'
						console.log(that.helpForm.location)                       
					}else{
						console.log(result);
					}
				});
			});        
		},
		getCookie: function () {
			if (document.cookie.length > 0) {
				var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
				for (var i = 0; i < arr.length; i++) {
					var arr2 = arr[i].split('=') // 再次切割
					// 判断查找相对应的值
					if (arr2[0] === 'userdata') {
						this.personal = JSON.parse(arr2[1])
						this.queryInfo.userId = this.personal.id
						break
					}
				}
			}
		},
		getHelpList() {
			const width = document.body.clientWidth
			document.getElementById('tab-myHelp').style.width = width / 2 + 'px'
			document.getElementById('tab-myHelp').style.textAlign = 'center'
			document.getElementById('tab-myHelp').style.padding = '0px'
			document.getElementById('tab-help').style.width = width / 2 + 'px'
			document.getElementById('tab-help').style.textAlign = 'center'
			document.getElementById('tab-help').style.padding = '0px'
			helpDataPost(this.queryInfo).then((res) => {
				console.log(res)
				this.helpList = res.rows
				this.total = res.total
				console.log(res)
			})
		},
		handleClick(tab, event){
			if (tab.name === 'myHelp') {
				this.helpForm = {
					type: '1',
					state: '1'
				}
				this.getHelpList()
			}
			if (tab.name === 'help') {
				this.helpForm.userId = this.personal.id
				this.helpForm.userName = this.personal.name
				this.$set(this, 'helpForm', {...this.helpForm})
			}
		},
		submit() {
			helpDataSubmit(this.helpForm).then((res) => {
				if (res.flag === 1) {
					this.$message.success('提交成功！')
					this.websocketsend(res.obj.id)
					this.getHelpList()
					this.activeName = "myHelp"
					this.helpForm = {
						type: '1',
						state: '1'
					}
				} else {
					this.$message.error('提交失败！')
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		async getLocation() {
			await this.init()
		},
		handleCurrentChange(newPage) {
			this.queryInfo.pageNumber = newPage;
			this.getHelpList();
		},
		goDetail(id) {
			this.$router.push({
				name: 'detail',
				query:{
					id: id
				}
			})
		}
	},
	async created() {
		await this.getCookie()
		this.getHelpList()
		this.initWebSocket()
		// this.init()
	}
}
</script>

<style >
	.time {
		font-size: 13px;
		color: #999;
	}
	
	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}
	
	.button {
		padding: 0;
		float: right;
	}
	
	.image {
		width: 100%;
		display: block;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
	
	/* .el-tabs__item {
		width: 150px !important;
	} */
</style>