<template>
    <div>
        <div>新增顾客</div>
        <el-button size="small" @click="logout">重新登录</el-button>
    </div>
</template>
<script>
    import hytools from 'hytools'
    export default {
        methods:{
            logout(){
                const SLH_APP = (window.SLH_APP || {});
                hytools.pub_event.emitEvent('logout')
            }
        }
    }
</script>
