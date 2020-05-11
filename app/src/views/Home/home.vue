<template>
    <div>
        <router-view />
        <tabbar></tabbar>
    </div>
</template>

<script>
import tabbar from '../../common/Tabbar.vue'

export default {
    name:'Home',
    components:{
        tabbar
    },
    data(){
        return{
            data:[],
            active:'',
			queryInfo: {
				userId: null
			},
			personal: {}
        }
    },
    methods: {
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
		},
		websocketsend(Data){//数据发送
			this.websock.send(Data);
		},
		websocketclose(){  //关闭
			this.websock.close()
			// console.log('断开连接',e);
		}
	},
	async created() {
		await this.getCookie()
		this.initWebSocket()
	}
}
</script>

<style  scoped>

</style>