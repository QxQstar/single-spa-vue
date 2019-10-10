import './set-public-path';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/base';
import singleSpaVue from 'single-spa-vue';
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.config.productionTip = false;
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el:'#goods',
    render: (h) => h(App),
    router,
    store
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
