<template>
    <div class="wrapper">
        <van-nav-bar
            title="发布动态"
            left-text="返回"
            right-text="发布"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight()"/>
        <div class="content">
            <van-field
                v-model="data.content"
                rows="4"
                autosize
                type="textarea"
                placeholder="这一刻的想法..."/>
            <!-- <van-field left-icon="location-o" :label='location' @click="Getlocation"  disabled /> -->
            <van-cell title="所在位置" :label="data.location"	 icon="location-o"  @click="Getlocation" ></van-cell>
            <el-upload
                multiple
                :limit="6"
                name="file"
                action="http://114.116.242.72:8080/trend/uploadPic.do"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview" 
                :on-remove="handleRemove"
                :data='Uploaddata'
                :on-success="handlesuccess"
                :on-error="handleerror"
                :on-change="handlechange"
                :on-exceed="hanlelimit"
                :auto-upload="false">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="Uploaddata.file" alt="">
            </el-dialog>
             <!-- <div class="content-location" @click="Quit">当前所在位置</div> -->
        </div>
    </div>
</template>

<script>
import {ShareMood} from '../../../../api/axios'
export default {
    data(){
        return{
            content:'',  
            data:{
                title:'132',
                userId:134,
                content:'',//动态文本内容
                location:''//所在位置地址信息
            },
            location:'',
            Uploaddata:{
                trendId:131,
                sort:9,
                file:''
            },//图片对象参数
            dialogVisible: false,
            header: {
                "Content-Type": "multipart/form-data"
            }
        }
    },
    created(){
    },
    mounted(){
        this.getdata()
        if(!this.data.userId)this.data.userId = this.$route.params.userId;
    },
    methods:{
        //返回
        onClickLeft(){
            this.$router.push({
                    name: 'message'
                }) 
        },
        //发表
        onClickRight(){
            if(!this.content){
                this.$toast.fail("动态内容不能为空");
                return
            }
            ShareMood(this.data).then(res =>{
                if(res.msg == '新增动态成功'){         
                    this.$toast.success("发表成功")
                    this.$router.push({
                            name: 'message',
                            params: {
                                content: this.data.content
                            }
                        }) 
                } else{
                    this.$toast.fail(res.msg);
                } 
            })          
        },
        //获取位置信息
        getdata(){
            if(!this.$route.params.location)return;
            this.data.location = this.$route.params.location         
        },
        //移除文件时触发
        handleRemove(file, fileList) {
            console.log("handleRemove",file, fileList);
        },
        //点击文件列表中已上传的文件时的钩子
        handlePictureCardPreview(file) {
            console.log("handlePictureCardPreview",file);            
            this.Uploaddata.file = file.url;
            this.dialogVisible = true;
        },
        //添加文件、成功失败钩子
        handlechange(file, fileList){
            console.log("handlechange",file,fileList);
        },
        //上传失败钩子
        handlesuccess(err, file, fileList){
            console.log("handlesuccess",err, file, fileList);
        },
        //上传失败钩子
        handleerror(response, file, fileList){
            console.log("handleerror",response, file, fileList);            
        },
        hanlelimit(file, fileList){
            console.log("hanlelimit",file,fileList);
        },
        onCancel() {
            this.show = false;
            this.$toast('cancel');
        },
        Getlocation(){
            this.$router.push({
                    name: 'map'
                }) 
        },
        afterRead(file){
            console.log(file);            
        }
    }
    
}
</script>

<style  scoped>
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
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
.content-location{
    font-size:16px;
    position: relative;
    height: 30px;
    line-height:30px;
    width:80%;
    left:0;
    right:0;
    margin:auto;
    border-bottom:1px solid #ebedf0;
    background-color: white;
}
</style>