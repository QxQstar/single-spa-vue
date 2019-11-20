const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports =  {
    entry:{
        app:'./src/single-spa.config.js'
    },
    devServer: {
        port: 5000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        disableHostCheck: true
    },
    module: {
        rules: [
            { parser: { system: false } }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'single-spa 微前端项目',
            template:'./index.html'
        }),
        new webpack.DefinePlugin({
            'process.env':{mode:'"dev"'}
        })
    ]
}
