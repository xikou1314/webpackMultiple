const merge = require('webpack-merge')
var webpack = require('webpack');
var path = require('path');
const baseWebpackConfig = require('./weboack.base');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var os = require('os');
var portfinder = require('portfinder');
var fs = require('fs');
var ports = fs.readFileSync('./port.json', 'utf8');
ports = JSON.parse(ports);
portfinder.basePort = "8080";
// const merge = require('webpack-merge')
portfinder.getPort(function(err, port) {
    ports.data.port = port;
    ports = JSON.stringify(ports,null,4);
    fs.writeFileSync('./port.json',ports);
});
///////////////////获取本机ip///////////////////////
function getIPAdress(){  
    var interfaces = os.networkInterfaces();  
    for(var devName in interfaces){  
        var iface = interfaces[devName];  
        for(var i=0;i<iface.length;i++){  
            var alias = iface[i];  
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                return alias.address;  
            }  
        }  
    }  
} 
var host = getIPAdress();
const devWebpackConfig = merge(baseWebpackConfig, {
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:`js/[name]-bundle.js`,
    },
    mode:"development",
    //插件
    plugins:[
        new MiniCssExtractPlugin({
            filename: `css/[name].css`
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'), //最好设置成绝对路径
        historyApiFallback: false,
        hot: true,
        inline: true,
        stats: 'errors-only',
        host: host,
        port: ports.data.port,
        overlay: true,
        open:true
    }
})
module.exports = devWebpackConfig;
