var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

//环境变量的配置 dev（开发）/online（线上）
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
//console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的封装方法
var getHtmlConfig = function(name,title){
    return {
        template:'./src/view/' + name + '.html',
        filename:'view/' + name + '.html',
        favicon     : './favicon.ico',
        title   : title,
        inject  :true,
        hash    :true,
        chunks  :['common',name]//模块
    };
};

//webpack配置信息
var config = {
    entry:{
    	'common'             :['./src/page/common/index.js'],
        'index'              :['./src/page/index/index.js'],
        'sec-hand'           :['./src/page/sec-hand/index.js'],
        'list'               :['./src/page/list/index.js'],
        'detail'             :['./src/page/detail/index.js'],
        'nt-detail'          :['./src/page/nt-detail/index.js'],
        'cart'               :['./src/page/cart/index.js'],
    	'order-confirm'	     :['./src/page/order-confirm/index.js'],
        'user-login'         :['./src/page/user-login/index.js'],
        'user-center'        :['./src/page/user-center/index.js'],
        'user-center-update' :['./src/page/user-center-update/index.js'],
        'user-register'      :['./src/page/user-register/index.js'],
        'user-pass-reset'    :['./src/page/user-pass-reset/index.js'],
        'user-pass-update'   :['./src/page/user-pass-update/index.js'],
        'user-headimg-update' :['./src/page/user-headimg-update/index.js'],
    	'result'              :['./src/page/result/index.js'],
        'order-list'         : ['./src/page/order-list/index.js'],
        'order-detail'       : ['./src/page/order-detail/index.js'],
        'payment'            : ['./src/page/payment/index.js'],
        'about'              : ['./src/page/about/index.js'],
        'message'            : ['./src/page/message/index.js']
    },

    // output:{
    //     path      :'./dist/',
    //     publicPath:'/dist/',
    //     filename  :'js/[name].js'
    // },

    output:{
        path        : __dirname + '/dist/',
        publicPath  : WEBPACK_ENV === 'online' ? '//s.evobly.com/shangmao-fe/dist/' : '/dist/',
        filename    :'js/[name].js'

    // path        : __dirname + '/dist/',
    // publicPath  : WEBPACK_ENV === 'online' ? '//s.evobly.com/admin-fe/dist/'    : '/dist/',
    // filename    :'js/[name].js'
    },

    externals:{
    	'jquery': 'window.jQuery'
    },
    module:{
        loaders:[
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }
        ]
    },
    //其他配置项
    resolve:{
        alias : {
            util         : __dirname + '/src/util',
            page         : __dirname + '/src/page',
            service      : __dirname + '/src/service',
            node_modules : __dirname + '/node_modules',
            image        : __dirname + '/src/image'
        }
    },
    plugins:[
        //独立通用模块到js/base.js
    	new webpack.optimize.CommonsChunkPlugin({
    		name:'common',
    		filename:'js/base.js'
    	}),
        //把css文件单独打包到css文件夹里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理插件
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('sec-hand','二手专区')),
        new HtmlWebpackPlugin(getHtmlConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHtmlConfig('nt-detail','公告详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-headimg-update','修改头像')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
        new HtmlWebpackPlugin(getHtmlConfig('about', '关于MMall')),
        new HtmlWebpackPlugin(getHtmlConfig('message', '留言板')),
    ],
    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                // target: 'http://www.evobly.com:8080/',
                target: 'http://localhost:8099/',
                changeOrigin : true
            }
        }
    }

};


/*if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}*/

module.exports = config;
