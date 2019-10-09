<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">关于</router-link> |
      <router-link to="/other/goods">商品管理</router-link> |
      <router-link to="/other/customers">客户管理</router-link>
    </div>
    <router-view/>
    <div id="goods"></div>
    <div id="customers"></div>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
