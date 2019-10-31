<template>
  <div class="home">
  <div class="search">
      <el-input v-model="input" placeholder="请输入关键字" style="width: 300px" size="mini"></el-input>
  </div>
   <div class="item" @click="$router.push('/goods/detail')">
     <img src="https://img.zcool.cn/community/01cce05699ce9a6ac725af2377a0a2.jpg@3000w_1l_0o_100sh.jpg">
     <p>草莓</p>
   </div>

  <div>
      <p>你选择了{{$store.state.count}}个草莓</p>

      <el-button @click="$store.commit('increment')">增加商品</el-button>


      <hr/>
        <ul>
            <li v-for="item in resData">
                <span>ID: {{item.id}}</span> | <span>name: {{item.name}}</span>

            </li>
        </ul>

  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import hytools from 'hytools'
export default {
  name: 'home',
    data(){
      return {
          input:'',
          resData:[]
      }
    },
    created() {
        let BASE_URL = process.env.VUE_APP_BASEURL;
        hytools.http({
            url:BASE_URL+'/vender/api/getInfo',
            method: 'post',
            params:{
                venderId:10004
            }
        }).then(res => {
            if(res.data.ret + '' === '0') {
                this.resData = res.data.content.warehouse_ids
            }
        })
    }
}
</script>

<style lang="less" scoped>
  .item{
    width: 200px;
    text-align: center;
      margin-top: 20px;
    img{
      max-width: 100%;
    }
  }
</style>
