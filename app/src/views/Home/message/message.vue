<template>
    <div class="wrapper">
        <div class="message" ref="wrapper">
            <div class="content">
                <div class="touxiang">
                    <div class="touxiang-name">yjj1</div>
                    <img src="../../..//assets/feya.jpg" alt="">
                </div>
                <img  class="header" src="../../..//assets/fengmian.jpg" alt="">
                <div class="center">
                    <div class="item">
                        <div class="tx-left">
                            <img src="../../..//assets/feya.jpg" alt="">
                        </div>
                        <div class="text-right">
                            <div class="text-name">yjj1</div>
                            <div class="text-content">风雨过后不一定美好的天空</div>
                            <div  class="text-pingluicon">
                                <van-icon class="text-icon" name="eye-o" />
                                <div style="height:22px;display:inline-block;line-height:22px;font-size:15px;">20</div>
                                <van-icon class="text-icon" name="ellipsis" />
                            </div>
                            <div class="comments">
                            </div>
                        </div>
                        <van-divider />
                    </div>
                    <div class="item">
                        <div class="tx-left">
                            <img src="../../..//assets/feya.jpg" alt="">
                        </div>
                        <div class="text-right">
                            <div class="text-name">yjj1</div>
                            <div class="text-content">不是天晴就会有彩虹</div>
                            <div  class="text-pingluicon">
                                <van-icon class="text-icon" name="eye-o" />
                                <div style="height:22px;display:inline-block;line-height:22px;font-size:15px;">20</div>
                                <van-icon class="text-icon" name="ellipsis" />
                            </div>
                            <div class="comments">
                            </div>
                        </div>
                        <van-divider />
                    </div>
                    <div class="item">
                        <div class="tx-left">
                            <img src="../../..//assets/feya.jpg" alt="">
                        </div>
                        <div class="text-right">
                            <div class="text-name">yjj1</div>
                            <div class="text-content">所以你一脸无辜 不代表你懵懂</div>
                            <div  class="text-pingluicon">
                                <van-icon class="text-icon" name="eye-o" />
                                <div style="height:22px;display:inline-block;line-height:22px;font-size:15px;">20</div>
                                <van-icon class="text-icon" name="ellipsis" />
                            </div>
                            <div class="comments">
                            </div>
                        </div>
                        <van-divider />
                    </div>
                </div>
                <!-- <van-form @submit="onSubmit">
                    <van-field name="data" label="文件上传">
                        <template #input>
                            <van-uploader v-model="data"   :after-read="afterRead"/>
                        </template>
                    </van-field>
                     <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                        提交
                        </van-button>
                    </div>
                </van-form> -->
                
            </div>
            <img class="publish" @click="publish" src="../../../assets/xiangji2.png" alt="">
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll';
export default {
    name:'message',
    data(){
        return{
            data:[
               {url:'https://img.yzcdn.cn/vant/leaf.jpg'},

            ],
            active:''
        }
    },
    mounth(){
        this.scroll = new Bscroll(this.$refs.wrapper);
    },
    methods:{
        onSubmit(val){
            console.log(val);
            
        },
        publish(){
            this.$router.push({
                    name: 'publish'
                }) 
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
.message{
    overflow: hidden;
    position: absolute;
    height:100%;
    left: 0;
    right: 0;
}
/* .publish{
    
    height: 30px;
    width: 30px;
    
    margin: auto;
} */
.publish{
    height:25px;
    width: 25px;
    position: fixed;
    right: 5px;
    top:5px;
    margin: auto;
    z-index: 1001;
}
.touxiang{
    height:60px;
    border-radius: 8px;
    display: inline-block;
    position: absolute;
    right:5%;
    top: 155px;
    margin: auto;
    z-index: 1000;
}
.touxiang-name{
    display: inline-block;
    height:20px;
    line-height:20px;
    font-size: 14px;
    font-weight: 550;
    color:#fff;
    position: absolute;
    padding-right: 65px;
    right:1000%;
    z-index: 1001;
}
.touxiang img{
    width: 60px;
    height:60px;
    border-radius: 8px;
    position: absolute;
    right:5%;
    z-index: 1000;
}
.content{
    background-color: #fff;
    height:100%;
    /* height: 1000px; */
}
.center{
    background-color: #fff;
    width: 100%;
    position: relative;
    margin-top:40px;
}
.header{
    position: relative;
    height: 200px;
    width: 100%;
}
.item{
    position: relative;
    width:100%;
    /* height:200px; */
}
.tx-left{
    width:12%;
    height:100%;
    display: inline-block;
    float:left;
    text-align: center;
    /* background-color: red; */
}
.tx-left img{
    width:30px;
    height:30px;
    border-radius: 2px;
    /* position: absolute; */
    /* top:0;
    right:0;
    left: 0;
    margin: auto;  */
}
.text-right{
    display: inline-block;
    /* background-color: green; */
    height:100%;
    width: 88%;
    /* top: 0; */
    /* right:0; */
    /* margin:auto; */
}
.text-name{
    color:  #0088CC;
    font-size: 16px;
    font-weight: 700;
}
.text-content{
    width: 90%;
    padding: 10px 0;
    font-size:14px;
}
.text-pingluicon{
    position: absolute;
    right:5%;
}
.text-icon{
    /* position: absolute; */
    display: inline-block;
    background-color: #f4f4f4;
    margin: 0 4px;
    height:20px;
    text-align: center;
    line-height: 20px;
    /* font-size:15px; */
}
</style>