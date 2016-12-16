var path = require('path'); //根路径
var webpack = require('webpack'); //webpack模块
var HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack html 打包模块

var node_modules = path.resolve(__dirname, 'node_modules'); //node包模块
var basepath = __dirname + '/src/'; //源码路径

//var jqueryMin = path.resolve(node_modules, 'jquery/dist/jquery.min.js'); //jquery压缩版
//var vuexMin = path.resolve(node_modules, 'vuex/dist/vuex.min.js'); //vuex压缩版

var config = {
    entry:{
        "index" : [basepath+'index.js'], //入口文件
        //"common":['vue', 'vue-router', vuexMin],  //vue全家桶公共引入
        //"polyfill": ['babel-polyfill'], //补全es6原生对象
    },
    output: {
        path: path.join(__dirname,'./build/'), //构建目录
        //filename: '[name].[chunkhash:8].js' //文件名规则 [name]表示 和 入口一致
        filename: 'library.js'
    },
    module: {
        loaders: [
            // {  //对大于6000字节 的图片采取base64处理
            //     test: /\.(png|jpg|gif)$/,
            //     loader: 'url?limit=6000'
            // },{
            //     test: /\.css$/,  //css 加载器
            //     loader: 'style-loader!css-loader'
            // },
            {
                test: /\.js$/, //js 加载器
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'] //转换 es6编码为 es5
                }
            }
            // { test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ] },
            // { test: /\.less$/, loaders: [ 'style', 'css', 'less' ] }
        ]
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            
        }
    },
    // plugins: [
    //     //提供全局的变量，在模块中使用无需用require引入
    //     // new webpack.ProvidePlugin({
    //     //     $: 'jquery',
    //     //     vuex:'vuex',
    //     //     util:basepath + 'common/util.js',
    //     //  }),
    //     //将公共代码抽离出来合并为一个文件
    //     //new webpack.optimize.CommonsChunkPlugin({name:['common'],minChunks:Infinity}),

    //     new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
    //         //favicon:'src/favicon.ico', //favicon路径
    //         filename:'index.html',    //生成的html存放路径，相对于 path
    //         template:basepath + 'index.html',    //html模板路径
    //         inject:true,    //允许插件修改哪些内容，包括head与body
    //         //hash:true,    //为静态资源生成hash值
    //         minify:{    //压缩HTML文件
    //             removeComments:true,    //移除HTML中的注释
    //             collapseWhitespace:false    //删除空白符与换行符
    //         }
    //     })
    // ]
};

module.exports = config;

