<template>
    <div>
        <div ref="Mapcontent"></div>
    </div>
</template>

<script>
export default {
    name:'Home',
    data(){
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
                        
        }
    }
    
}
</script>

<style  scoped>

</style>