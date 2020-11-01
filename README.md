商Mall城后端项目

# 商Mall城

#### 介绍
商Mall城 - 校园电商用户端项目
3.11.0

#### 使用说明

项目可能遇到初始化问题的解决方案（此区块代理部分用于管理端"node-sass"依赖的安装问题）
------------------------------------------------------------------------------------------------------------------------------------------------

一：使用淘宝镜像

直接运行下面的命令即可：

    SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

我们可能更希望能直接使用 npm install 安装所有依赖，所以我的做法是在项目内添加一个 .npmrc 文件：

    phantomjs_cdnurl=http://cnpmjs.org/downloads
    sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
    registry=https://registry.npm.taobao.org
 

这样使用 npm install 安装 node-sass 和 phantomjs 时都能自动从淘宝源上下载，但是在使用 npm publish 的时候要把 registry 这一行给注释掉，否则就会发布到淘宝源上去了。

二：使用梯子

假设你的梯子在你本地机器上开启了一个第三方服务器 127.0.0.1:1080，那么只需按照下面的方法配置一下就能正常安装 node-sass 了（如果你开启的是 PAC 模式而不是全局模式，那还需要将 s3.amazonaws.com 加入 PAC 列表）：

      npm config set proxy http://127.0.0.1:1080
      npm i node-sass

下载完成后删除 http 代理

npm config delete proxy
嗯，这样下来就能正常安装了。

------------------------------------------------------------------------------------------------------------------------------------------------

#### 项目初始化步骤

1.安装nodejs环境,推荐使用v4.4.7
    
    下载地址 : https://nodejs.org/download/release/v4.4.7/

2.全局安装webpack v2.x
    
    命令: (sudo) npm install -g webpack@2.2.1 --registry=http://registry.npm.taobao.org

3.全局安装webpack-dev-server
    
    命令: (sudo) npm install -g webpack-dev-server@1.16.5 --registry=http://registry.npm.taobao.org

4.下载源码，解压缩

5.在项目根目录执行npm初始化
    
    命令: npm install --registry=http://registry.npm.taobao.org

6.启动项目
    
    开发模式: npm run dev (windows系统上为npm run dev_win)
    生产模式: npm run dist (windows系统上为npm run dist_win)

7.开发模式下预览项目
    
    访问：http://localhost:8088/dist/view/index.html


#### 注意

1.用户端接口使用代理服务器：

    devServer: {
        port: 8088,
        inline: true,
        proxy : {
            '**/*.do' : {
                //target: 'http://www.evobly.com:8080/',         //使用线上服务器进行代理
                target: 'http://localhost:8099/',                //对本地开发环境进行代理
                changeOrigin : true
            }
        }
    }

2.用户端线上地址：http://www.evobly.com  管理端线上地址:http://admin.evobly.com  测试账号：admin 密码：smalltest

#### 个人博客

   http://blog.evobly.com

#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)