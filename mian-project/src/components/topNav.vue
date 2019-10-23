<template>
    <div class="c-top-nav">
        <router-link to="/about">关于</router-link> |
        <router-link to="/goods" :class="{'router-link-exact-active':$route.path.indexOf('/goods') >= 0}">商品管理</router-link> |
        <router-link to="/customers" :class="{'router-link-exact-active':$route.path.indexOf('/customers') >= 0}">客户管理</router-link>
    </div>
</template>

<style lang="scss" scoped>

</style>
