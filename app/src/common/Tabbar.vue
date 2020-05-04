<template>
    <div>
        <van-tabbar route>
            <van-tabbar-item replace to="/home/map" icon="home-o">
                首页
            </van-tabbar-item>
            <van-tabbar-item replace to="/home/message" icon="comment-circle-o">
                动态
            </van-tabbar-item>
            <van-tabbar-item replace to="/home/help" icon="bulb-o">
                在线求助
            </van-tabbar-item>
            <van-tabbar-item replace to="/home/mine" icon="user-o">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name:'Tabbar',
    data(){
        return{
        }
    }
    
}
</script>

<style  scoped>

</style>