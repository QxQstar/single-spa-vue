const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
module.exports = {
    lintOnSave:false,
    devServer:{
        port:5100,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    publicPath:process.env.VUE_APP_publicPath,
    outputDir:'customers',
    chainWebpack: config => {
        if(process.env.VUE_APP_SINGLERUN !== 'true'){
            config.externals(['vue', {'vue-router':'vueRouter'},'hytools'])
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
            .library('customers')
    },
    css:{
    loaderOptions:{
        postcss:{
            plugins:[require('postcss-plugin-namespace')('.customers-project',{ ignore: [ '*','#app' ] })]
        }
    }
}
}
