module.exports = {
    lintOnSave:false,
    devServer:{
        port:9010,
        proxy: 'http://saas1.market-mis.wmdev2.lsh123.com'
    },
    publicPath:'',
    chainWebpack: config => {
        config.externals(['vue', 'vue-router','element-ui','vuex','axios'])
    },
    filenameHashing: false,
}