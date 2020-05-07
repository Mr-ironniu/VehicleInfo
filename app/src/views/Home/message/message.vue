<template>
    <div>
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
                            <div class="text-content">
                                动态内容煞风景啊是大家佛为&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;佛i女i啊士大夫w阿斯ssf asdfasffasdfasd顿佛i围殴妇女
                                </div>
                            <div  class="text-pingluicon">
                                <van-icon class="text-icon" name="eye-o" />
                                <div style="height:22px;display:inline-block;line-height:22px;font-size:15px;">20</div>
                                <van-icon class="text-icon" name="ellipsis" />
                            </div>
                            <div class="comments" style="display:none">
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
                            <div class="text-content">
                                动态内容煞风景啊是大家佛为&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;佛i女i啊士大夫w阿斯ssf asdfasffasdfasd顿佛i围殴妇女
                                </div>
                            <div  class="text-pingluicon">
                                <van-icon class="text-icon" name="eye-o" />
                                <div style="height:22px;display:inline-block;line-height:22px;font-size:15px;">20</div>
                                <van-icon class="text-icon" name="ellipsis" />
                            </div>
                            <div class="comments" style="display:none">
                                
                            </div>
                        </div>
                        <van-divider />
                    </div>
                </div>
                <van-form @submit="onSubmit">
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
                </van-form>
                
            </div>
            <img class="publish " src="../../../assets/xiangji2.png" alt="">
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
            scroll_top:'',
            active:'',
            scroll
        }
    },
    computed:{
    
    },
    mounted(){
        this.scroll = new Bscroll(this.$refs.wrapper);
        console.log(this.$refs.wrapper);
        console.log(this.scroll);
        
        
    },
    methods:{
        onSubmit(val){
            console.log(val);
            
        },
        afterRead(file){
            console.log(file);            
        }
    }
    
}
</script>

<style  scoped>
.message{
    overflow: hidden;
    position: absolute;
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
    height: 1000px;
}
.center{
    background-color: #fff;
    width: 100%;
    position: relative;
    margin-top:40px;
    height:330px;
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
    width:10%;
    height:100%;
    float:left;
    text-align: center;
}
.tx-left img{
    width:30px;
    height:30px;
    border-radius: 2px;
}
.text-right{
    display: inline-block;
    height:100%;
    width: 90%;
    top: 0;
    right:0;
    margin:auto;
}
.text-name{
    color:  #0088CC;
    font-size: 16px;
    font-weight: 700;
}
.text-content{
    width: 90%;
    padding-top:10px;
    /* white-space:pre-wrap; */
    word-wrap:break-word;
}
.text-pingluicon{
    position: relative;
    display: inline-block;
    right:-75%;
    margin-bottom: 2px;
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