<template>
    <div class="m-goods-new">
        <el-form label-position="right" label-width="80px" size='small' :model="formLabelAlign" style="width: 500px">
            <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="商品详情">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="商品规格">
                <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formLabelAlign:{
                    type:'',
                    name:'',
                    region:''
                }
            }

        }
    }
</script>
