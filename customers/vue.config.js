module.exports = {
    lintOnSave:false,
    devServer:{
        port:5100,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    publicPath:'',
    chainWebpack: config => {
        // config.externals(['vue', {'vue-router':'vueRouter'}])
        config.externals(['vue', {'vue-router':'vueRouter'},'hytools'])
        config.output
            .jsonpFunction('webpackJsonp_customers')
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
