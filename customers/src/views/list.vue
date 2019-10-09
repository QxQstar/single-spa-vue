<template>
  <div class="home">
    <div class="item" @click="gotoDetail">
      <img src="https://avatars1.githubusercontent.com/u/17845091?s=460&v=4"/>
      <p>何遇</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  methods:{
    gotoDetail(){
      this.$router.push('/other/customers/detail')
    }
  }
}
</script>


<style lang="less" scoped>
  .item{
    width: 200px;
    box-shadow: 0 0 20px #000;
    text-align: center;
    img{
      max-width: 100%;
    }

  }

</style>

