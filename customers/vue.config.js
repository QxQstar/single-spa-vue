module.exports = {
    lintOnSave:false,
    devServer:{
        port:5100
    },
    publicPath:'',
    chainWebpack: config => {
        config.externals(['vue', 'vue-router'])
    },
    filenameHashing: false,
}