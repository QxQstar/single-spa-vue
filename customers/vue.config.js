module.exports = {
    lintOnSave:false,
    devServer:{
        port:5100
    },
    chainWebpack: config => {
        config.externals(['vue', 'vue-router'])
    },
}