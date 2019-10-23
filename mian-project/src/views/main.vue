<template>
    <div>
        <div id="nav" class="header">
            <router-link to="/about">关于</router-link> |
            <router-link to="/goods">商品管理</router-link> |
            <router-link to="/customers">客户管理</router-link>
        </div>
        <div class="content">
            <router-view/>
            <div id="main"></div>
        </div>
    </div>
</template>

<style lang="less">
</style>
