module.exports = {
    lintOnSave:false,
    devServer:{
        port:9010
    },
    chainWebpack: config => {
        config.externals(['vue', 'vue-router','element-ui'])
    },
}