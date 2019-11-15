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
        config.plugin('script-ext-html')
            .use(ScriptExtHtmlWebpackPlugin,[{
                custom: {
                    test: /app.*\.js$/,
                    attribute: 'entry',
                    value: true
                }
            }]);
        config.output
            .libraryTarget('umd')
            .library('main-project')
    },
    css:{
        loaderOptions:{
            postcss:{
                plugins:[require('postcss-plugin-namespace')('.main-project',{ ignore: [ '*','#app' ] })]
            }
        }
    }
}
