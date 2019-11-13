const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = {
    lintOnSave:false,
    devServer:{
        port:9100,
        // proxy: 'http://saas1.market-mis.wmdev2.lsh123.com'
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    publicPath:'',
    chainWebpack: config => {
        // config.externals(['vue',{'vue-router':'vueRouter'}])
        config.externals(['vue',{'vue-router':'vueRouter'},{'element-ui':'elementUI'},'axios','hytools'])
<<<<<<< HEAD
        config.output
                    .jsonpFunction('webpackJsonp_customers')
=======
        config.plugin('script-ext-html')
            .use(ScriptExtHtmlWebpackPlugin,[{
                custom: {
                    test: /app.*\.js$/,
                    attribute: 'entry',
                    value: true
                }
            }])
>>>>>>> master
    },
    css:{
        loaderOptions:{
            postcss:{
                plugins:[require('postcss-plugin-namespace')('.main-project',{ ignore: [ '*','#app' ] })]
            }
        }
    }
}
