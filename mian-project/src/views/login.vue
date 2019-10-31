<template>
    <div class="m-account">
        <el-form label-width="60px" :model="formLabelAlign" size="small" class='account-form'>
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.pw" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" type="primary" style="width: 100%">登录</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
    import hytools from 'hytools'
    export default {
        data(){
            return {
                formLabelAlign:{
                    name:'',
                    pw:''
                }

            }
        },
        methods:{
            submit(){
                let BASE_URL = process.env.VUE_APP_BASEURL;
                hytools.http({
                    url:BASE_URL+'/account/user/checklogin',
                    method: 'post',
                    params:{
                        email:this.formLabelAlign.name,
                        pwd:this.formLabelAlign.pw
                    }
                }).then(res => {
                    const resData = res.data;
                    if(resData.ret + '' === '0') {
                        document.cookie="venderId=10004"
                        document.cookie="zone_id=1000"
                        document.cookie="VSSSESSID=needaamu3ffri2e1bd5nfn1ok7"
                        document.cookie="lshLogin=1"
                        document.cookie="warehouse_id=DC10004"
                        document.cookie="MISSESSID=22rqf7hm35gus6ih53h7h7ifd0"
                        this.$router.push('/')
                    }else {
                        this.$message.error(resData.msg);
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .m-account{
        text-align: left;
        .account-form{
            padding: 50px;
            width: 450px;
            margin: 150px auto 0;
            background-color: antiquewhite;
        }
    }
</style>
