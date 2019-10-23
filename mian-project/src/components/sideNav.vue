<template>
    <div class="c-sideNav">
        <el-menu
                :default-active="activeIndex" :default-openeds="['1']"
                @select="select"
                class="el-menu-vertical-demo">
            <el-submenu index="1">
                <template slot="title">
                    <i :class="menuObj.icon" v-if="menuObj.icon"></i>
                    <span>{{title}}</span>
                </template>
                <el-menu-item :route="item" :index="index+''" v-for="(item,index) in menu" :key="index">{{item.name}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        props:{
            menuObj:{
                type:Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {

            }
        },
        computed:{
            title() {
                return this.menuObj.title;
            },
            menu() {
                return this.menuObj.children || [];
            },
            activeIndex() {
                const path = this.$route.path;
                let index = 0;
                this.menu.some((item,i) => {
                    if(path === item.path || item.subPage && item.subPage.includes(path)) {
                        index = i;
                        return true;
                    }
                })
                return index + '';
            }
        },
        methods:{
            select(index,indexPath) {
                const path = this.menu[index].path;

                this.$router.push({
                    path
                })
            }
        }

    }
</script>
