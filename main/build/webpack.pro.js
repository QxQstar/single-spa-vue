const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports =  {
    entry:{
        app:'./src/single-spa.config.js'
    },
    mode:'development',
    output:{
        path: path.resolve(__dirname, '../microfrontend'),
        filename:'[name].[hash].js',
        publicPath:"/"
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
            'process.env':{mode:'"pro"'}
        }),
        new CleanWebpackPlugin()
    ]
}
