import {useLoading} from './js/api';
import Component from './js/Component.vue';
import './css/index.css';

const LoadingPlugin = (app, props = {}, slots = {}) => {
  const instance = useLoading(props, slots);
  app.config.globalProperties.$loading = instance;
  app.provide('$loading', instance)
};

export default Component;
export {useLoading, LoadingPlugin, Component}

