<template>
    <div class="wrapper">
        <div class="message" ref="wrapper">
            <div class="content">
                <div class="touxiang">
                    <div class="touxiang-name">{{ObjData.name}}</div>
                    <img src="../../..//assets/tx.jpg" alt="">
                </div>
                <img  class="header" src="../../..//assets/fengmian.jpg" alt="">
                <div class="center">
                    <div class="item" v-for="item in List" :key="item.key">
                        <div class="tx-left">
                            <img src="../../..//assets/tx.jpg" alt="">
                        </div>
                        <div class="text-right">
                            <div class="text-name">{{item.userName}}</div>
                            <div class="text-content">
                                {{item.content}}
                                </div>
                            <div  class="text-pingluicon">
                                <van-icon class="text-icon" name="eye-o" />
                                <div style="height:22px;display:inline-block;line-height:22px;font-size:15px;">{{views}}</div>
                                <van-icon class="text-icon" name="ellipsis" />
                            </div>
                            <div style="font-size:10px;color:#969799">
                                {{item.location}}
                            </div>
                            <div class="comments" style="display:none">
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
        </div>
        <img class="publish" @click="publish" src="../../../assets/xiangji2.png" alt="">
    </div>
</template>

<script>
import Bscroll from 'better-scroll';
import { trendList  } from '../../../api/axios'
export default {
    name:'message',
    data(){
        return{
            userId:'',
            ObjData:{
                userId:'',
                name:'',
                vehiclebrand:'',
                vehicletype:'',
                user:'',
                phone:'',
                province:''
            },
            List:[],
            views:1,
            trendId:0,
            scroll_top:'',
            active:'',
            name:'',
            scroll
        }
    },
    computed:{
    
    },
    mounted(){
        this.scroll = new Bscroll(this.$refs.wrapper);
        this.ObjData = { ...this.$route.params.obj};
        this.Gettrend();
    },
    methods:{
        onSubmit(val){
            console.log(val);
        },
        publish(){
            const userId = this.userId;
            this.$router.push({
                    name: 'publish',
                    params:{
                        userId: userId
                    }
                })   
        },
        Gettrend(){
            trendList(this.ObjData.id).then(res =>{
                this.List = res.rows;  
                console.log(this.List);
                
                // this.AddView();   
            })
        },
        // AddView(){
        //     for(let i=0;i<this.List.length;i++){  
        //         setTimeout(()=>{
        //             console.log(i);                    
        //             trendView(this.List[i].id).then(res =>{
        //                 console.log(res);                
        //             }); 
        //         },i*1000)                
                           
        //     }
        // },
        afterRead(file){
            console.log(file);            
        }
    }
    
}
</script>

<style  scoped>
.wrapper{
    /* height:100%; */
    background: #fff;
}
.message{
    /* overflow: hidden; */
    position: absolute;
    left: 0;
    right: 0;
}
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
}
.center{
    background-color: #fff;
    width: 100%;
    height:100%;
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
}
.tx-left{
    width:12%;
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
    /* background-color: green; */
    height:100%;
    width: 88%;
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
    font-size: 14px;
    word-wrap:break-word;
}
.text-pingluicon{
    position: relative;
    display: inline-block;
    height:20px;
    right:-75%;
    /* margin-bottom: 2px; */
}
.text-icon{
    display: inline-block;
    background-color: #f4f4f4;
    margin: 0 4px;
    height:13px;
    text-align: center;
    line-height: 13px;
}
</style>