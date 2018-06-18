# Vue Loading Overlay Component

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-loading-overlay.svg)](http://npm-stats.com/~packages/vue-loading-overlay)
[![npm-version](https://img.shields.io/npm/v/vue-loading-overlay.svg)](https://www.npmjs.com/package/vue-loading-overlay)
[![github-tag](https://img.shields.io/github/tag/ankurk91/vue-loading-overlay.svg?maxAge=1800)](https://github.com/ankurk91/vue-loading-overlay/)
[![license](https://img.shields.io/github/license/ankurk91/vue-loading-overlay.svg?maxAge=1800)](https://yarnpkg.com/en/package/vue-loading-overlay)

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
    <div>
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="whenCancelled"
        :is-full-page="true"></loading>
        <button @click.prevent="doAjax">fetch Data</button>
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.min.css';

    export default {
        data() {
            return {
                isLoading: false,
            }
        },
        components: {
            Loading
        },
        methods: {
            doAjax() {
                this.isLoading = true;
                // AJAX example with axios
                axios.post('/api').then((response)=>{
                  this.isLoading = false                
                })
            },
            whenCancelled() {
              console.log("User cancelled the loader.")
            }
        }
    }
</script>
```

### As plugin
```html
<template>
    <form @submit.prevent="submit">
        <!-- your form inputs goes here-->
        <button type="submit">Save</button>
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

    export default {
        methods: {
            submit() {
                let loader = this.$loading.show();
                // AJAX example with axios
                axios.post('/api').then((response)=>{
                  loader.hide()
                })                 
            }
        }
    }
</script>
```

## Available props
The component accepts these props:

| Attribute        | Type                | Default              | Description      |
| :---             | :---:               | :---:                | :---             |
| can-cancel       | Boolean             | `false`              | Allow user to cancel? |
| on-cancel        | Function            | `()=>{}`             | Do something upon cancel |
| is-full-page     | Boolean             | `true`               | When `false`; limit loader to its container* |

* When `is-full-page` is set to `false`, the container element should be positioned as `position: relative`

## API methods
### `this.$loading.show()`
```js
// pass propsData to component
this.$loading.show({
  container: this.$refs.loadingContainer
})
```

## Install in non-module environments (without webpack)
```html
<!-- Vue js -->
<script src="https://unpkg.com/vue@2.5/dist/vue.min.js"></script>
<!-- Lastly add this package -->
<script src="https://unpkg.com/vue-loading-overlay@2"></script>
<link href="https://unpkg.com/vue-loading-overlay@latest/dist/vue-loading.min.css" rel="stylesheet">
<!-- Init the plugin -->
<script>
Vue.use(VueLoading)
</script>
```

## Run examples on your localhost
* Clone this repo
* Make sure you have node-js `>=6.10` and [yarn](https://yarnpkg.com) `>=1.x` pre-installed
* Install dependencies - `yarn install`
* Run webpack dev server - `yarn start`
* This should open the demo page at `http://localhost:9000` in your default web browser 

## Credits
* [Buefy](https://buefy.github.io/#/documentation/loading) loading component

## License
[MIT](LICENSE.txt) License
