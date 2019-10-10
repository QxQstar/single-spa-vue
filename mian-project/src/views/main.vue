<template>
    <div>
        <div id="nav">
            <router-link to="/about">关于</router-link> |
            <router-link to="/goods">商品管理</router-link> |
            <router-link to="/customers">客户管理</router-link>
        </div>
        <router-view/>
        <div id="goods"></div>
        <div id="customers"></div>
    </div>
</template>

<style lang="less">
</style>
