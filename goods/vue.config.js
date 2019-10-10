module.exports = {
    lintOnSave:false,
    devServer:{
        port:9010
    },
    publicPath:'',
    chainWebpack: config => {
        config.externals(['vue', 'vue-router','element-ui','vuex'])
    },
    filenameHashing: false,
}