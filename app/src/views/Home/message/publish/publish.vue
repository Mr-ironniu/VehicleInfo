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
                v-model="content"
                rows="4"
                autosize
                type="textarea"
                placeholder="这一刻的想法..."/>
            <van-field left-icon="location-o" :label='location' @click="Getlocation"  disabled />
            <el-upload
                name="file"
                action="http://114.116.242.72:8080/trend/uploadPic.do"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :data='Uploaddata'>
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
                content:'',
                location:''
            },
            active:'',
            data1:'',
            location:'',
            dialogImageUrl: '',
            Uploaddata:{
                trendId:131,
                sort:9,
                file:''
            },
            dialogVisible: false,
            header: {
                "Content-Type": "multipart/form-data"
            }
        }
    },
    created(){
    },
    mounted(){
        this.location = '所在位置';
        this.getdata()
        if(!this.data.userId)this.data.userId = this.$route.params.userId;
    },
    methods:{
        onClickLeft(){
            this.$router.push({
                    name: 'message'
                }) 
        },
        onClickRight(){
            this.data.content = this.content;
            this.data.location = this.location;
            console.log(this.data);
            
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
        getdata(){
            if(!this.$route.params.location)return;
            this.location = this.$route.params.location         
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.Uploaddata.file = file.url;
            this.dialogVisible = true;
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