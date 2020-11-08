# Upgrade Guide

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
