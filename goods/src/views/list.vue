<template>
  <div class="home">
  <div class="search">
      <el-input v-model="input" placeholder="请输入关键字" style="width: 300px" size="mini"></el-input>
  </div>
   <div class="item" @click="$router.push('/detail')">
     <img src="https://img.zcool.cn/community/01cce05699ce9a6ac725af2377a0a2.jpg@3000w_1l_0o_100sh.jpg">
     <p>草莓</p>
   </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
    data(){
      return {
          input:''
      }
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
