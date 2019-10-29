import vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
import elementUI from 'element-ui';
import './set-public-path.js'
import './style/main.less';
import './http.js'
vue.use(elementUI)
vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue:vue,
  appOptions: {
    el:'#app',
    render: (h) => h(App),
    router,
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
