const merge = require('webpack-merge')
var path = require('path');

const baseWebpackConfig = require('./weboack.base');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
//动态加时间戳
function stamp(){
    var date = new Date();
    date = Date.parse(date);
    return date;
}

const prodWebpackConfig = merge(baseWebpackConfig, {
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:`js/[name]-${stamp()}-bundle.js`,
    },
    mode:"production",
    //插件
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/[name]-${stamp()}.css`
        })
    ]
})

module.exports = prodWebpackConfig;