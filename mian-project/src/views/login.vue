<template>
    <div>
        <div>用户名: <input v-model="name"/></div>
        <div>密码: <input v-model="pw"/></div>

        <button @click="submit">登录</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name:'',
                pw:''
            }
        },
        methods:{
            submit(){
                this.http({
                    url:'/account/user/checklogin',
                    method: 'post',
                    params:{
                        email:this.name,
                        pwd:this.pw
                    }
                }).then(res => {
                    if(res.data.ret + '' === '0') {
                        document.cookie="venderId=10004"
                        document.cookie="zone_id=1000"
                        document.cookie="VSSSESSID=needaamu3ffri2e1bd5nfn1ok7"
                        document.cookie="lshLogin=1"
                        document.cookie="warehouse_id=DC10004"
                        document.cookie="MISSESSID=22rqf7hm35gus6ih53h7h7ifd0"
                        this.$router.push('/')
                    }
                })
            }
        }
    }
</script>