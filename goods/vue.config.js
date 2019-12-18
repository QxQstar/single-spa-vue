const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = {
    lintOnSave:false,
    devServer:{
        port:9010,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    publicPath:process.env.VUE_APP_publicPath,
    chainWebpack: config => {
        // 不是独立运行的时候，将公共npm包抽离
        if(process.env.VUE_APP_SINGLERUN !== 'true') {
            config.externals(['vue',{'vue-router':'vueRouter'},{'element-ui':'elementUI'},'axios',{'vuex':'Vuex'},'hytools'])
        }
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
            .library('')
            .jsonpFunction('webpackJsonp_goods')
    },
    css:{
    loaderOptions:{
        postcss:{
            plugins:[require('postcss-plugin-namespace')('.goods-project',{ ignore: [ '*','#app' ] })]
        }
    }
}
}
