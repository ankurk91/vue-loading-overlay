# Vue Loading Overlay Component

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-loading-overlay.svg)](http://npm-stats.com/~packages/vue-loading-overlay)
[![npm-version](https://img.shields.io/npm/v/vue-loading-overlay.svg)](https://www.npmjs.com/package/vue-loading-overlay)
[![github-tag](https://img.shields.io/github/tag/ankurk91/vue-loading-overlay.svg?maxAge=1800)](https://github.com/ankurk91/vue-loading-overlay/)
[![license](https://img.shields.io/github/license/ankurk91/vue-loading-overlay.svg?maxAge=1800)](https://yarnpkg.com/en/package/vue-loading-overlay)
[![build-status](https://travis-ci.org/ankurk91/vue-loading-overlay.svg?branch=master)](https://travis-ci.org/ankurk91/vue-loading-overlay)

Vue.js v2.x component for full screen loading indicator

## Demo on [JSFiddle](https://jsfiddle.net/ankurk91/w8y8k5wo/)

## Installation
```bash
# npm
npm install vue-loading-overlay --save

# Yarn
yarn add vue-loading-overlay
```

## Usage
#### As component
```html
<template>
    <div class="loading-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="whenCancelled"
        :is-full-page="fullPage"></loading>
        
        <label><input type="checkbox" v-model="fullPage">Full page?</label>
        <button @click.prevent="doAjax">fetch Data</button>
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.min.css';
    // Using axios for the demo only
    import axios from 'axios';
    
    export default {
        data() {
            return {
                isLoading: false,
                fullPage: true
            }
        },
        components: {
            Loading
        },
        methods: {
            doAjax() {
                this.isLoading = true;
                // AJAX example with axios
                axios.post('/api/cats').then((response)=>{
                  this.isLoading = false                
                })
            },
            whenCancelled() {
              console.log("User cancelled the loader.")
            }
        }
    }
</script>
<style>
.loading-parent {
  position: relative;
}
</style>
```

### As plugin
```html
<template>
    <form @submit.prevent="submit" class="loading-parent" ref="formContainer">
        <!-- your form inputs goes here-->
        <label><input type="checkbox" v-model="fullPage">Full page?</label>
        <button type="submit">Login</button>
    </form>
</template>

<script>
    import Vue from 'vue';
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.min.css';
    // Init plugin
    Vue.use(Loading);
    // Using axios for the demo only
    import axios from 'axios';

    export default {
        data() {
            return {
                fullPage: false
            }
        },
        methods: {
            submit() {
                let loader = this.$loading.show({
                  container: this.fullPage ? null : this.$refs.formContainer
                });
                // AJAX example with axios
                axios.post('/api/login').then((response)=>{
                  loader.hide()
                })                 
            }
        }
    }
</script>

<style>
.loading-parent {
  position: relative;
}
</style>
```

## Available props
The component accepts these props:

| Attribute        | Type                | Default              | Description      |
| :---             | :---:               | :---:                | :---             |
| active           | Boolean             | `false`              | Show loading by default when `true`, use the .sync modifier to make it two-way binding |
| can-cancel       | Boolean             | `false`              | Allow user to cancel by pressing escape or clicking outside |
| on-cancel        | Function            | `()=>{}`             | Do something upon cancel, works in conjunction with `can-cancel`  |
| animation        | String              | `fade`               | [Transition](https://vuejs.org/v2/guide/transitions.html) name |
| is-full-page     | Boolean             | `true`               | When `false`; limit loader to its container* |

* When `is-full-page` is set to `false`, the container element should be positioned as `position: relative`

## API methods
### `this.$loading.show()`
```js
// pass propsData to component
let loader = this.$loading.show({
  // Optional parent container reference
  container: this.$refs.loadingContainer,
  // Can also pass available props here (camelCase property names)
  canCancel: true,
  onCancel: this.yourMethodName
});
// hide loader whenever you want
loader.hide();
```

## Custom Style
```scss
//Set loader or overlay color by overriding SCSS variables

$loaderColor: #ff0000;
$loaderBackground: #808080;

@import '~vue-loading-overlay/src/scss/index.scss';
```

## Install in non-module environments (without webpack)
```html
<!-- Vue js -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5/dist/vue.min.js"></script>
<!-- Lastly add this package -->
<script src="https://cdn.jsdelivr.net/npm/vue-loading-overlay@2"></script>
<link href="https://cdn.jsdelivr.net/npm/vue-loading-overlay@2/dist/vue-loading.min.css" rel="stylesheet">
<!-- Init the plugin and component-->
<script>
Vue.use(VueLoading);
Vue.component('loading', VueLoading)
</script>
```

### Browser support
* [Modern](http://browserl.ist/?q=defaults%2C+not+ie+%3E+0%2Cnot+ie_mob+%3E+0) browsers only

## Run examples on your localhost
* Clone this repo
* Make sure you have node-js `>=6.10` and [yarn](https://yarnpkg.com) `>=1.x` pre-installed
* Install dependencies - `yarn install`
* Run webpack dev server - `yarn start`
* This should open the demo page at `http://localhost:9000` in your default web browser 

## Testing
* This package is using [Jest](https://github.com/facebook/jest) and [vue-test-utils](https://github.com/vuejs/vue-test-utils) for testing.
* Tests can be found in `__test__` folder.
* Execute tests with this command `yarn test`

## Inspired by
* [Buefy](https://buefy.github.io/#/documentation/loading) loading component

## License
[MIT](LICENSE.txt) License
