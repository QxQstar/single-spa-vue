import appConfig from './app.config.js';
import Grape from '@hydesign/grape';
new Grape(appConfig)
    .setImportMap({
        "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js",
        "vueRouter": "https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js",
        "elementUI":"https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js",
        "Vuex":"https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js",
        "axios":"https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js",
        "hytools":"https://cdn.jsdelivr.net/npm/hytools@1.2.0/dist/index.js"
    })
    .start({fetch:window.fetch});
