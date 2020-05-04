<template>
    <div>
        
        <router-view />
        <tabbar></tabbar>
    </div>
</template>

<script>
import tabbar from '../../common/Tabbar.vue'

export default {
    name:'Home',
    components:{
        tabbar
    },
    data(){
        return{
            data:[],
            active:''
        }
    }
    
}
</script>

<style  scoped>

</style>