<template>
    <div class="g-warp">
        <div id="nav" class="g-header">
           <top-nav/>
        </div>
        <div class="g-container">
            <div class="g-side" v-show="!isHiddenSideNav">
                <side-nav :menuObj="menu"/>
            </div>
            <div class="g-content">
                <router-view/>
                <div id="main"></div>
            </div>

        </div>
    </div>
</template>
<script>
    import topNav from '../components/topNav.vue';
    import sideNav from '../components/sideNav.vue';
    import menuObj from '../config.js'
    export default {
        data() {
            return {
                allRoutes:[]
            }
        },
        computed:{
            isHiddenSideNav() {
                return this.$route.matched.some(item => {
                    return item.meta.hiddenSideNav
                })
            },
            menu() {
                const path = this.$route.path.slice(1);
                const module = path.split('/')[0]
                return menuObj[module];
            }
        },
        components:{topNav,sideNav},

    }
</script>
<style lang="less">

</style>
