<template>
    <div style="height:660px;width:100%;">
        <div ref="Mapcontent" class="map"></div>
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
            active:''
        }
    },
    mounted(){
        this.init();
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
                        console.log(result);
                    }else{
                        console.log(result);
                    }
                });
            });        
        }
    }
    
}
</script>

<style  scoped>
.map {
    background: rgb(252, 249, 242);
    flex: 1;
    height:94%;
    width:100%;
}
</style>