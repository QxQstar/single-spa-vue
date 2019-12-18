const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports =  {
    entry:{
        app:'./src/index.js'
    },
    mode:'production',
    output:{
        path: path.resolve(__dirname, '../dist'),
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
            'process.env':{mode:'"prod"'}
        }),
        new CleanWebpackPlugin()
    ]
}
