# Upgrade Guide

## From v2.x to v3.x
### Styling
* CSS file name has been changed, now you need to import this file instead
```js
import 'vue-loading-overlay/dist/vue-loading.css';
```
* If you have been importing SCSS files to override color then you should use props instead since SCSS has been removed.
### Component API
* Rename `animation` prop to `transition`
* Rename `close` event to `hide`
