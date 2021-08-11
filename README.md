

### 1 项目基本介绍
本项目为移动端vue项目模板，可下载直接使用。

项目名：vue3-h5
技术栈：<kbd>Vue3.0</kbd> <kbd>Vite2.0</kbd> <kbd>Vue-Router4.0</kbd> <kbd>Vuex4.0</kbd> <kbd>Axios</kbd> <kbd>vant3.0</kbd> <kbd>eslint7.0</kbd>

### 2 项目运行

#### 2.1 所需环境
- 开发环境：node v12.0.0+
- 运行环境：ie11+

#### 2.2 开发过程
```
#依赖安装
npm install

#开发
npm run dev

#生产
npm run build
```

#### 2.3 目录结构描述
```
├── dist                        // 打包输出目录
├── node_modules                // 依赖包
├── public                      // 公共配置目录
├── src                         // 主要开发目录
│   ├── api                     // 接口api
│   ├── assets                  // 静态图片，字体
│   ├── components              // 公共组件
│   ├── lazy_components         // 按需引入组件
│   ├── libs                    // 依赖第三方库
│   ├── model                   // 公共model数据
│   ├── router                  // 路由
│   │    ├── index.js           // 路由注册，拦截
│   │    ├── routes.js          // 项目路由表
│   ├── store                   // vuex
│   │    ├── index.js           // vuex注册
│   │    ├── modules            // vuex模块
│   ├── style                   // 公共样式
│   ├── use                     // 全局公共composition API
│   ├── utils                   // 公共工具，方法等
│   ├── views                   // 页面组件目录
│   │    ├── user               // 分级目录
│   │    │    ├── user.vue      // 页面组件
│   │    │    ├── modules       // 当前模块组件目录
│   │    │    ├── use           // 当前模块composition API
│   ├── app.vue                 // 模板挂载组件
│   ├── main.js                 // 全局入口文件
├── .eslintgnore                // eslint忽略文件
├── .eslint.js                  // eslint配置文件
├── .gitgnore                   // git忽略文件
├── index.html                  // html入口文件
├── package-lock.json           // 锁定安装时的包的版本号，保证依赖一致性
├── package.json                // 安装依赖文件
├── postcss.config.js           // postcss-loader配置（rem单位）
├── Readme.md                   // 项目help
├── vite.config.js              // 打包配置
```

