'use strict';

import {createApp} from 'vue';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
import LoadingPlugin from "../src/index";

const app = createApp(App);
app.mount('#app')
app.use(LoadingPlugin);
