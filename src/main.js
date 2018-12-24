// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'v-select-search/lib/v-select-search.css';
import 'element-ui/lib/theme-chalk/index.css';
import VuePlain from '../static/vueplain';
import vSelectSearch from 'v-select-search';

// import vcolorpicker from 'vcolorpicker';
// Vue.use(vcolorpicker);

Vue.use(vSelectSearch);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
