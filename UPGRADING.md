# Upgrade Guide

## From v5.x to v6.x

If you have been consuming the plugin then you have to use named import now

```diff
- import LoadingPlugin from 'vue-loading-overlay';
+ import {LoadingPlugin} from 'vue-loading-overlay';
app.use(LoadingPlugin)
```

Change CSS import file name as follows

```diff
- import 'vue-loading-overlay/dist/vue-loading.css';
+ import 'vue-loading-overlay/dist/css/index.css';
```

If you have been using the CSS class names, then changes them as follows

```diff
- <div class="vld-parent">
+ <div class="vl-parent">
```

All CSS class names has been prefixed with `vl` now

## From v4.x to v5.x

If you are using the package directly from a CDN, Then you need to use named exports now

```diff
- app.use(VueLoading)
+ app.use(VueLoading.Plugin)
```

There is no breaking change if you are consuming the package through a module bundler like webpack.

## From v3.4 to v4.x

If you have been consuming the component, update your code as follows:

```diff
- <loading .active.sync="isLoading"/>
+ <loading v-model:active="isLoading"/>
```

Everything else should be automatically covered in vue v2 to vue v3 upgrade guide.

## From v2.x to v3.x

#### Styling

* CSS file name has been changed, now you need to import this file instead

```js
import 'vue-loading-overlay/dist/vue-loading.css';
```

* If you have been importing SCSS files to override colors then you should use props instead since SCSS has been
  removed.

#### Component API

* Rename `animation` prop to `transition`
* Rename `close` event to `hide`
