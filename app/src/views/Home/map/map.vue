<template>
    <div class="wrapper">
        <div>
            <van-nav-bar
                title="所在位置"
                left-text="返回"
                right-text="确定"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"/>
            <div ref="Mapcontent" class="map"></div>
        </div>
    </div>
</template>

<script type="text/javascript" src='https://webapi.amap.com/maps?v=1.4.15&key=039207bfce18c539c470483ce49e08ed'></script>
<script>
export default {
    name:'Home',
    data(){
        this.map = null;
        return{
            data:[],
            active:'',
            address:'123'
        }
    },
    mounted(){
        this.init();
        let map = document.querySelector('.map');
        if(this.$route.params.showmap){
            this.showmap = true;
            map.style.height = '570px'
        }else{
            this.showmap = false
            map.style.height = '620px';
        }
    },
    methods:{
        init(){
             this.$toast.loading({
                duration: 500,
                message: "初始化地图中"
            });
            const map = this.map = new AMap.Map(this.$refs.Mapcontent, {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom:20, //初始化地图层级
            });
            let that = this
            AMap.plugin('AMap.Geolocation', function() {
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：5s
                    buttonPosition:'RB',    //定位按钮的停靠位置
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition(function(status,result){
                    if(status=='complete'){
                        that.address = result.formattedAddress;
                        console.log(that.address);                        
                    }else{
                        console.log(result);
                    }
                });
            });        
        },
        onClickLeft(){
           this.$router.push({
                    name: 'publish'
                }) 
        },
        onClickRight(){
            const address = this.address
            this.$router.push({
                name:'publish',
                params:{
                    location: address,
                }
            })
        }
    }
    
}
</script>

<style  scoped>
.wrapper{
    height:100%;
    width:100%;
    background-color: #fff;
}
.map {
    background: rgb(252, 249, 242);
    flex: 1;
    width:100%;
    height:570px;
}
</style>