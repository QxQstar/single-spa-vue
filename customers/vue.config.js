module.exports = {
    lintOnSave:false,
    devServer:{
        port:5100
    },
    publicPath:'',
    chainWebpack: config => {
        config.externals(['vue', {'vue-router':'vueRouter'}])
    },
    filenameHashing: false,
    css:{
    loaderOptions:{
        postcss:{
            plugins:[require('postcss-plugin-namespace')('.customers-project',{ ignore: [ '*','#app' ] })]
        }
    }
}
}
