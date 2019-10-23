<template>
    <div class="c-sideNav">
        <el-menu
                default-active="1" :default-openeds="[1]"
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
