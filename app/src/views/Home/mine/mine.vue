<template>
    <div class="wrapper">
        <div class="header">
            <img src="../../../assets/tx.jpg" alt="">
            <div style="display:inline-block;position:absolute;height:30px;line-height:30px;font-size:20px;font-weight:550;top:15%;left:30%;margin:auto;" >
                {{obj.name}}
            </div>
            <div style="display:inline-block;position:absolute;height:30px;line-height:30px;font-size:16px;top:45%;left:30%;margin:auto;" >
                {{obj.vehiclebrand+obj.vehicletype}}
            </div>
        </div>
        <div class="content" @click="This_location">当前位置</div>

        <div class="content" @click="Quit">退出登录</div>
    </div>
</template>

<script>
export default {
    name:'mine',
    data(){
        return{
            data:[],
            active:'',
            obj:{
                name:this.$store.state.obj.name,
                vehiclebrand:this.$store.state.obj.vehiclebrand,
                vehicletype:this.$store.state.obj.vehicletype
            }
        }
    },
    mounted(){
        console.log('this.obj :>> ',this.obj);
    },
    methods:{
        Quit(){
            this.$dialog.confirm({
                // title: '',
                message: '是否退出登录',
            })
            .then(() => {
                this.$router.push({
                    name: 'Login'
                })   
            })
            .catch(() => {
                console.log(123);                
            });
        },
        This_location(){
            this.$router.push({
                name:'map'
            })
        }
    }
    
}
</script>

<style  scoped>
.wrapper{
    height:700px;
    width:100%
}
.header{
    height: 150px;
    width:100%;
    position: relative;
    background-color: white;
}
.header img{
    display: block;
    height: 80px;
    width:80px;
    border-radius:40px;
    position: absolute;
    left: 5%;
    top:15%;
    margin: auto;
}
.content{
    position: relative;
    margin-top:20px;
    height: 50px;
    line-height:50px;
    width:100%;
    background-color: white;
}
</style>