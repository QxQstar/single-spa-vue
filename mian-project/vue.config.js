module.exports = {
    lintOnSave:false,
    devServer:{
        port:9100,
        proxy: 'http://saas1.market-mis.wmdev2.lsh123.com'
    },
    publicPath:'',
    chainWebpack: config => {
        config.externals(['vue',{'vue-router':'vueRouter'},{'element-ui':'elementUI'}])
    },
    css:{
        loaderOptions:{
            postcss:{
                plugins:[require('postcss-plugin-namespace')('.main-project',{ ignore: [ '*','#app' ] })]
            }
        }
    }
}
