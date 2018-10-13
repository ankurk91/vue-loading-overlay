'use strict';

import Vue from 'vue';

Vue.config.productionTip = false;

// Bootstrap is being used for demonstration only
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
  created() {
    console.log('Main app created');
  },
  mounted() {
    console.log('Main app mounted');
  },
});
