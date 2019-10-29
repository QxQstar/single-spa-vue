<template>
    <div>
        <div>新增顾客</div>
        <el-button size="small" @click="logout">重新登录</el-button>
    </div>
</template>
<script>
    export default {
        methods:{
            logout(){
                const SLH_APP = (window.SLH_APP || {});
                SLH_APP.pub_event.emitEvent('logout')
            }
        }
    }
</script>
