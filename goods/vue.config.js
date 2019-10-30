module.exports = {
    lintOnSave:false,
    devServer:{
        port:9010,
        proxy: 'http://saas1.market-mis.wmdev2.lsh123.com'
    },
    publicPath:'',
    chainWebpack: config => {
        config.externals(['vue',{'vue-router':'vueRouter'},{'element-ui':'elementUI'},'axios',{'vuex':'Vuex'},'hytools'])
    },
    filenameHashing: false,
    css:{
    loaderOptions:{
        postcss:{
            plugins:[require('postcss-plugin-namespace')('.goods-project',{ ignore: [ '*','#app' ] })]
        }
    }
}
}
