import vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';

vue.config.productionTip = false;
const appOptions = {
  el:'#main',
  render: (h) => h(App),
  router,
}
if(process.env.VUE_APP_SINGLERUN ==='true') {
  new vue(appOptions)
}
const vueLifecycles = singleSpaVue({
  Vue:vue,
  appOptions: appOptions,
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
