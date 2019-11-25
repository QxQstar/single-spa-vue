const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = {
    lintOnSave:false,
    outputDir:'mainproject',
    devServer:{
        port:9100,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    publicPath:process.env.VUE_APP_publicPath,
    chainWebpack: config => {
        if(process.env.VUE_APP_SINGLERUN !== 'true') {
            config.externals(['vue',{'vue-router':'vueRouter'},{'element-ui':'elementUI'},'axios','hytools'])
        }
        config.plugin('script-ext-html')
            .use(ScriptExtHtmlWebpackPlugin,[{
                custom: {
                    test: /app.*\.js$/,
                    attribute: 'entry',
                    value: true
                }
            }])
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
