# Vue Loading Overlay Component

[![downloads](https://badgen.net/npm/dt/vue-loading-overlay)](https://npm-stat.com/charts.html?package=vue-loading-overlay&from=2018-01-01)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/vue-loading-overlay/badge?style=rounded)](https://www.jsdelivr.com/package/npm/vue-loading-overlay)
[![npm-version](https://badgen.net/npm/v/vue-loading-overlay)](https://www.npmjs.com/package/vue-loading-overlay)
[![github-tag](https://badgen.net/github/tag/ankurk91/vue-loading-overlay)](https://github.com/ankurk91/vue-loading-overlay/tags)
[![build](https://github.com/ankurk91/vue-loading-overlay/workflows/build/badge.svg)](https://github.com/ankurk91/vue-loading-overlay/actions)
[![license](https://badgen.net/github/license/ankurk91/vue-loading-overlay)](LICENSE.txt)
![ts](https://badgen.net/badge/ready/TypeScript/blue)

Vue.js component for full screen loading indicator

## [Demo](https://ankurk91.github.io/vue-loading-overlay/) or [JSFiddle](https://jsfiddle.net/ankurk91/w8y8k5wo/)

## Installation

```bash
npm install vue-loading-overlay@^3.0 
```

## Usage

#### As component

```html

<template>
    <div class="vld-parent">
        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"></loading>

        <label><input type="checkbox" v-model="fullPage">Full page?</label>
        <button @click.prevent="doAjax">fetch Data</button>
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';

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
                // simulate AJAX
                setTimeout(() => {
                    this.isLoading = false
                }, 5000)
            },
            onCancel() {
                console.log('User cancelled the loader.')
            }
        }
    }
</script>
```

### As plugin

```html

<template>
    <form @submit.prevent="submit" class="vld-parent" ref="formContainer">
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
    import 'vue-loading-overlay/dist/vue-loading.css';
    // Init plugin
    Vue.use(Loading);

    export default {
        data() {
            return {
                fullPage: false
            }
        },
        methods: {
            submit() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });
                // simulate AJAX
                setTimeout(() => {
                    loader.hide()
                }, 5000)
            },
            onCancel() {
                console.log('User cancelled the loader.')
            }
        }
    }
</script>
```

## Available props

The component accepts these props:

| Attribute        |   Type   |  Default  | Description                                                                                   |
|:-----------------|:--------:|:---------:|:----------------------------------------------------------------------------------------------|
| active           | Boolean  |  `false`  | Show loading by default when `true`, use the `.sync` modifier to make it two-way binding      |
| can-cancel       | Boolean  |  `false`  | Allow user to cancel by pressing ESC or clicking outside                                      |
| on-cancel        | Function | `()=>{}`  | Do something upon cancel, works in conjunction with `can-cancel`                              |
| is-full-page     | Boolean  |  `true`   | When `false`; limit loader to its container^                                                  |
| transition       |  String  |  `fade`   | [Transition](https://v2.vuejs.org/v2/guide/transitions.html) name                             |
| color            |  String  |  `#000`   | Customize the color of loading icon                                                           |
| height           |  Number  |     *     | Customize the height of loading icon                                                          |
| width            |  Number  |     *     | Customize the width of loading icon                                                           |
| loader           |  String  | `spinner` | Name of icon shape you want use as loader, `spinner` or `dots` or `bars`                      |
| background-color |  String  |  `#fff`   | Customize the overlay background color                                                        |
| opacity          |  Number  |   `0.5`   | Customize the overlay background opacity                                                      |
| z-index          |  Number  |  `9999`   | Customize the overlay z-index                                                                 |
| enforce-focus    | Boolean  |  `true`   | Force focus on loader                                                                         |
| lock-scroll      | Boolean  |  `false`  | Freeze the scrolling during full screen loader                                                |
| blur             |  String  |   `2px`   | Value for the CSS blur backdrop-filter. Set to null or an empty string to disable blurring    |

* ^When `is-full-page` is set to `false`, the container element should be positioned as `position: relative`.
  You can use CSS helper class `vld-parent`.
* *The default `height` and `width` values may be varied based on the `loader` prop value

## Available slots

The component accepts these slots:

* `default` : Replace the animated icon with yours
* `before` : Place anything before the animated icon, you may need to style this.
* `after` : Place anything after the animated icon, you may need to style this.

## API methods

### `Vue.$loading.show(?propsData,?slots)`

```js
let loader = Vue.$loading.show({
    // Pass props by their camelCased names
    container: this.$refs.loadingContainer,
    canCancel: true, // default false
    onCancel: this.yourCallbackMethod,
    color: '#000000',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999,
}, {
    // Pass slots by their names
    default: this.$createElement('your-custom-loader-component-name'),
});
// hide loader whenever you want
loader.hide();
```

## Global configs

You can set props and slots for all future instances when using as plugin

```js
Vue.use(Loading, {
    // props
    color: 'red'
}, {
    // slots
})
```

Further you can override any prop or slot when creating new instances

```js
let loader = Vue.$loading.show({
    color: 'blue'
}, {
    // slots
});
```

## Install in non-module environments (without webpack)

```html
<!-- Vue js -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.7"></script>
<!-- Lastly add this package -->
<script src="https://cdn.jsdelivr.net/npm/vue-loading-overlay@3"></script>
<link href="https://cdn.jsdelivr.net/npm/vue-loading-overlay@3/dist/vue-loading.css" rel="stylesheet">
<!-- Init the plugin and component-->
<script>
    Vue.use(VueLoading);
    Vue.component('loading', VueLoading)
</script>
```

## Run examples on your localhost

* Clone this repo
* Make sure you have node-js `>=18.12` and [pnpm](https://pnpm.io/) `>=7.12` pre-installed
* Install dependencies `pnpm install`
* Run webpack dev server `npm start`
* This should open the demo page in your default web browser

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

* This package is using [Jest](https://github.com/facebook/jest)
  and [vue-test-utils](https://github.com/vuejs/vue-test-utils) for testing.
* Execute tests with this command `npm test`

## License

[MIT](LICENSE.txt) License
