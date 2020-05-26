<template>
<div class="wrapper"  ref="wrapper">
    <div class="message">
        <div class="content">
            <div class="touxiang">
                <div class="touxiang-name">{{ObjData.name}}</div>
                <img src="../../../assets/tx.jpg" alt="">
            </div>
            <img  class="header" src="../../../assets/fengmian.jpg" alt="">
            <div class="center">
                <div class="item" v-for="item in List" :key="item.key">
                    <div class="tx-left">
                        <img src="../../../assets/tx.jpg" alt="">
                    </div>
                    <div class="text-right">
                        <div class="text-name">{{item.userName}}</div>
                        <div class="text-content">
                            <p>{{item.content}}</p>
                            <el-row>
                                <el-col :span="8" v-for="(url, index) in item.pictureList" :key="index" :offset="0">
                                    <el-card :body-style="{ padding: '0px' }">
                                        <el-image style="padding:0px;" :src="`${apiUrl}${url.path}`" :preview-src-list='item.imgList'  lazy></el-image>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <p style="font-size:10px;color:#969799">{{item.location}}</p>
                        </div>
                        <div  class="text-pingluicon">
                            <van-icon class="text-icon" name="ellipsis" @click="editComment(item.id)" />
                        </div>
                        <div>
                        <p class="comments" v-for="(q,index) in item.commentList" :key='index'  style="word-wrap:break-word;background-color:#f4f4f4;width:90%;font-size:12px;margin:0;">
                            <span style="color:#0088CC;">{{q.name + '：'}}</span>{{q.comment}}
                        </p>
                        </div>
                    </div>
                    <van-divider />
                </div>
            </div>
        </div>
    </div>
    <div @click="publish">
        <img class="publish" src="../../../assets/xiangji2.png" alt="">
    </div>
    <van-action-sheet v-model="isComment"  :round="false" :overlay="true" :safe-area-inset-bottom="false" :close="commentClose" :style="{ height: '10%',margin:'0 0  0 0'}">
        <div style="background-color:#f4f4f4;height:67px;position:relative"  >
            <textarea v-model="ObjData.comment" style="width:75%;border:0;margin:12px 10px 6px 10px;border-radius:5px;" name="" id=""  rows="2"></textarea>
            <van-button  style="position:absolute;top:0;bottom:0;right:10px;margin:auto;heigth:100%" @click="sendComment" text="发表" type="default"></van-button>
        </div>
    </van-action-sheet>
</div>
</template>

<script>
// import Bscroll from 'better-scrollve
import { trendList,comment } from '../../../api/axios'
export default {
    name:'message',
    data(){
        return{
            userId:'',
            ObjData:{
                id:'',   
                name:'',
                vehiclebrand:'',
                vehicletype:'',
                user:'',
                phone:'',
                province:'',
                picList:[],
                comment:'',
                trendId:''
            },
            fit: "fill",
            List:[],
            apiUrl:'http://114.116.242.72:8080/trend/getPic.do?url=',
            views:1,
            trendId:0,
            scroll_top:'',
            active:'',
            name:'',
            isComment:false,
            scroll
        }
    },
    computed:{
    
    },
    mounted(){
        // this.scroll = new Bscroll(this.$refs.wrapper);
        this.ObjData = { ...this.$store.state.obj};
        this.Gettrend();
    },
    methods:{
        commentClose(){
            this.ObjData.comment = ''
        },
        //发表评论
        sendComment(){
            if(this.ObjData.comment){
                const data = {
                    userId: this.ObjData.id,
                    trendId: this.ObjData.trendId,
                    comment: this.ObjData.comment
                }
                comment(data).then(res =>{
                    if(res.flag===1){
                        this.isComment = false;
                        this.ObjData.comment = '';
                        this.Gettrend();
                        return
                    }
                })
            }else{
                 this.$toast.fail("评论内容不能为空")
            }
        },
        //编辑评论
        editComment(val){
            this.isComment = true;
            this.ObjData.trendId = val;
        },
        onSubmit(val){
            console.log(val);
        },
        publish(){
            this.$router.push({
                    name: 'publish',
                })   
        },
        Gettrend(){
            trendList(this.ObjData.id).then(res =>{
                this.List = res.rows;
                for( const key of this.List){
                    key.imgList = [];
                    key.pictureList.forEach(element => {
                        key.imgList.push(this.apiUrl + element.path)
                    });
                }
                
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
    height:100%;
    background-color: #fff;
}
.message{    
    background-color: #fff;
    position: absolute;
    height:100%;
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
    /* width: 100%; */
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
    font-size: 14px;
    word-wrap:break-word;
}
.text-content p{
    margin: 5px 0;
}
.text-pingluicon{
    position: relative;
    display: inline-block;
    height:20px;
    top:10px;
    right:-90%;
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
.image {
    width: 75px;
    height:75px;
    display: block;
  }
</style>