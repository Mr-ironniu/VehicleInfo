<template>
    <div>
        <div class="publish">
            <img  src="../../../assets/xiangji.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:'message',
     data() {
        return {
        loading: true,
        };
    },
    mounted() {
        this.loading = false;
    },
}
</script>

<style  scoped>
.publish{
    height: 40px;
    width:40px;
    position: fixed;
    right:0;
    top:0;
    margin: auto;
}
.publish img{
    height:25px;
    width:25px;
    position: absolute;
    top: 0;
    bottom: 0;
    right:0;
    left:0;
    margin: auto;
}
</style>