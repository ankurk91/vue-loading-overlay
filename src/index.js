import {useLoading} from './js/api';
import Component from './js/Component.vue';
import './css/index.css';

const Plugin = (app, props = {}, slots = {}) => {
  const instance = useLoading(props, slots);
  app.config.globalProperties.$loading = instance;
  app.provide('$loading', instance)
};

Component.install = Plugin;

export default Component;
module.export = { useLoading }

