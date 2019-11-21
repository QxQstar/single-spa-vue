import vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
import elementUI from 'element-ui';
import './style/main.less';
import {startListen} from './eventListener.js';
vue.use(elementUI)
vue.config.productionTip = false;
const appOptions = {
  el:'#app',
  render: (h) => h(App),
  router,
  beforeCreate() {
    startListen(this)
  },
  methods:{
    logout() {
      this.$router.push('/account');
      var expires = -1 * 24 * 60 * 60 * 1000;
      var date = new Date(+new Date()+expires).toUTCString();
      document.cookie="venderId=10004;expires="+date
      document.cookie="zone_id=1000;expires="+date
      document.cookie="VSSSESSID=needaamu3ffri2e1bd5nfn1ok7;expires="+date
      document.cookie="lshLogin=1;expires="+date
      document.cookie="warehouse_id=DC10004;expires="+date
      document.cookie="MISSESSID=22rqf7hm35gus6ih53h7h7ifd0;expires="+date
    }
  }
}


if(process.env.VUE_APP_SINGLERUN ==='true') {
  import('element-ui/lib/theme-chalk/index.css');
  new vue(appOptions)
}
const vueLifecycles = singleSpaVue({
  Vue:vue,
  appOptions: appOptions,
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount;
