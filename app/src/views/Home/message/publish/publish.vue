<template>
    <div class="wrapper">
        <van-nav-bar
            title="发布动态"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <div class="content">
            <van-field
                v-model="message"
                rows="4"
                autosize
                type="textarea"
                placeholder="这一刻的想法..."/>
            <div class="content-fujian">
                
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            data:[],
            active:''
        }
    },
    mounth(){
      
    },
    methods:{
        onClickLeft(){
            this.$router.push({
                    name: 'message'
                }) 
        },
        onClickRight(){
            console.log(123);            
        },
        publish(){
            console.log(123);
        },
        afterRead(file){
            console.log(file);            
        }
    }
    
}
</script>

<style  scoped>
.wrapper{
    height:100%;
    background: #fff;
}
.van-nav-bar{
    height:40px;
    line-height: 40px;
}
.content{
    width: 100%;
}
</style>