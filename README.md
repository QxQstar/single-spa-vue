# 运行demo
```cli
    sudo npm run install:all
    sudo npm run start
```

访问`http://localhost:5000/`

# 基于single-spa的vue微前端项目

微前端的概念是从后端的微服务的迁移过来的。将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。各个前端应用还可以独立运行、独立开发、独立部署。
> 注意：这里的前端应用指的是前后端分离的单页面应用

## single-spa
single-spa是一个可以将多个前端应用聚合到同一个页面展示的框架。换句话说: single-spa会监听路由的变化，它会在特定的路由下将相应的应用挂载到指定的DOM节点上。

## 设计理念
* 中心化路由

    在前端应用中路由是中心，因为有了路由才能展示相应的界面。在基于single-spa的微前端项目中我们需要一个地方去管理我们的应用，即：发现存在哪些应用，这些应用都对应了哪个路由，在特定的路由先去加载这个应用对应的资源

* 标识化应用

    给每个应用都起一个唯一的名字。

* 生命周期

    single-spa设计了一个基本的生命周期，有五个状态：
    1. load: 决定加载哪个应用，并绑定生命周期
    2. bootstrap: 获取静态资源
    3. mount: 安装应用，如创建 DOM 节点
    4. unload: 删除应用的生命周期
    5. unmount: 卸载应用，如删除 DOM 节点

* 独立部署与配置自动化

    现在的前端项目的部署很大程度都是围绕这配置进行的，如果应用的配置能自动化，那么整个系统就自动化。如果我们要在微前端项目中添加或者删除一个应用，我们就更新微前端项目的配置，而这个配置应该自动生成。

## 项目结构图

![基于single-spa的vue微前端项目结构](./img/project-construction.png)

### 前端入口项目
前端入口项目不写业务代码，只是用于获取业务项目的配置(即：存在哪些业务项目，业务项目的入口)，注册各个业务项目以及加载各个业务项目的公共资源，入口项目有一个html文件，在业务项目处于激活状态时，将业务项目的DOM树挂载到入口项目的html中。

### 业务项目
业务项目的路由由自己定义，业务项目对外输出不需要入口HTML页面，只需要输出的资源文件即可，资源文件包括js、css、fonts和imgs等。在整个微前端项目中，业务项目是按需加载。

## 实现方案
> 补充：我是使用systemJs加载静态资源
### 配置各个应用的入口
```json
{
        "imports": {
          "goods": "http://localhost:9010/app.js",
          "customers": "http://localhost:5100/app.js",
          "main-project":"http://localhost:9100/app.js"
        }
      }
```
goods，customers和main-project是三个独立的项目,这个应该在各个项目部署的时候自动生成，

### 注册应用
```js
function isActive(location,page) {
    let isShow = false;
        if(location.hash.startsWith(`#${page}`)){
            isShow = true
        }
        return isShow;
}
const activeFns = {
    goods(location) {
        return isActive(location,'/goods')
    },
    customer() {
        return isActive(location,'/customers')
    },
    main() {
        return true;
    }
}

singleSpa.registerApplication('main-project',() => System.import('main-project'),activeFns.main);

singleSpa.registerApplication('customers',() => System.import('customers'),activeFns.customer);

singleSpa.registerApplication('goods',() => System.import('goods'),activeFns.goods);

```

### 启动single-spa
```js
    singleSpa.start();
```


### 给各个应用注册生命周期函数
single-spa-vue是一个在vue项目中注册single-spa生命周期的工具库。

安装single-spa-vue
```cli
vue add single-spa

// 或者

npm install --save single-spa-vue
```

改写入口文件
```js
import vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/base';
import singleSpaVue from 'single-spa-vue';
import elementUI from 'element-ui';
vue.use(elementUI)
vue.config.productionTip = false;
const vueLifecycles = singleSpaVue({
  Vue:vue,
  appOptions: {
    el:'#main',
    render: (h) => h(App),
    router,
    store
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```
### 抽离公共资源

配置webpack的externals字段使webpack在打包的时候不打包公共库如(vue,vue-router,私有npm包等),如下：
```js
{
    externals:['vue',{'vue-router':'vueRouter'},{'element-ui':'elementUI'}]
}
```
### 用systemJS定义import map
import map 与webpack的externals配合使用能够让应用不打包公共库的代码，并且在应用运行的时候才加载公共库。
```
<script type="systemjs-importmap">
      {
        "imports": {
           "single-spa": "https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.7/system/single-spa.min.js",
            "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js",
          "vueRouter": "https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js",
          "elementUI":"https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js",
          "Vuex":"https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js",
          "axios":"https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js",
        }
      }
 </script>
```

这样代码在运行的时候遇到import、require时，会找到库在systemJs中对应的路径，来进行动态外部加载，加载完成之后将库暴露出的对象赋值给代码中的变量。

### 各个应用间进行通信
使用浏览器自定义事件来实现各个应用间的通讯
```js
// customers
window.dispatchEvent(new CustomEvent('logout'));

// main-project
 window.addEventListener('logout',handler);
```
> 注意：各个应用之间应该尽可能少的进行通信，如果两个应用之间频繁的进行通信，那么它们两个应该合并成一个
### 隔离css样式
使用webpack，postcss在构建阶段为业务的所有CSS都加上自己的作用域
```
postcss:{
    plugins:[require('postcss-plugin-namespace')('.main-project',{ ignore: [ '*'] })]
}
```

## 参考文章
* [single-spa](https://single-spa.js.org/)
* [systemjs](https://github.com/systemjs/systemjs)
* [微前端那些事儿](https://github.com/phodal/microfrontends)
* [每日优鲜供应链前端团队微前端改造](https://juejin.im/post/5d7f702ce51d4561f777e258)
* [微前端项目](https://segmentfault.com/a/1190000019957162)
* [用微前端的方式搭建类单页应用-美团技术团队](https://tech.meituan.com/2018/09/06/fe-tiny-spa.html)
