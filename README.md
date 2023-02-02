# Vue Loading Overlay Component

[![downloads](https://badgen.net/npm/dt/vue-loading-overlay)](https://npm-stat.com/charts.html?package=vue-loading-overlay&from=2018-01-01)
[![jsdelivr](https://data.jsdelivr.com/v1/package/npm/vue-loading-overlay/badge?style=rounded)](https://www.jsdelivr.com/package/npm/vue-loading-overlay)
[![npm-version](https://badgen.net/npm/v/vue-loading-overlay)](https://www.npmjs.com/package/vue-loading-overlay)
[![github-tag](https://badgen.net/github/tag/ankurk91/vue-loading-overlay)](https://github.com/ankurk91/vue-loading-overlay/tags)
[![build](https://github.com/ankurk91/vue-loading-overlay/workflows/build/badge.svg)](https://github.com/ankurk91/vue-loading-overlay/actions)
[![license](https://badgen.net/github/license/ankurk91/vue-loading-overlay)](LICENSE.txt)
![TypeScript](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)

Vue.js component for full screen loading indicator

## [Demo](https://ankurk91.github.io/vue-loading-overlay/) or [JSFiddle](https://jsfiddle.net/ankurk91/2ou37bc8/)

### Version matrix

| Vue.js version | Package version |                                                           Branch |
| :---           |:---------------:|-----------------------------------------------------------------:| 
| 2.x            |       3.x       | [3.x](https://github.com/ankurk91/vue-loading-overlay/tree/v3.x) |
| 3.x            |       6.x       |                                                           `main` |

## Installation

```bash
npm install vue-loading-overlay@^6.0 
```

## Usage

#### As component

```html

<template>
    <div class="vl-parent">
        <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>

        <label><input type="checkbox" v-model="fullPage">Full page?</label>
        <button @click.prevent="doAjax">fetch Data</button>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';

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

Initialise the plugin in your app

```js
import {createApp} from 'vue';
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
// Your app initialization logic goes here
const app = createApp({});
app.use(LoadingPlugin);
app.mount('#app');
```

Then use the plugin in your components

```html

<template>
    <form @submit.prevent="submit"
          class="vl-parent"
          ref="formContainer">
        <!-- your form inputs goes here-->
        <label><input type="checkbox" v-model="fullPage">Full page?</label>
        <button type="submit">Login</button>
    </form>
</template>

<script>
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

#### or same with Composition API

```html
<script setup>
    import {ref, inject} from 'vue'
    import {useLoading} from 'vue-loading-overlay'
    
    const $loading = useLoading({
        // options
    });
    // or use inject without importing useLoading
    // const $loading =  inject('$loading')

    const fullPage = ref(false)

    const submit = () => {
        const loader = $loading.show({
            // Optional parameters
        });
        // simulate AJAX
        setTimeout(() => {
            loader.hide()
        }, 5000)
    }
</script>
```

## Available props

The component accepts these props:

| Attribute        | Type                | Default              | Description      |
| :---             | :---:               | :---:                | :---             |
| active           | Boolean             | `false`              | Show loading by default when `true`, use it as `v-model:active` |
| can-cancel       | Boolean             | `false`              | Allow user to cancel by pressing ESC or clicking outside |
| on-cancel        | Function            | `()=>{}`             | Do something upon cancel, works in conjunction with `can-cancel`  |
| is-full-page     | Boolean             | `true`               | When `false`; limit loader to its container^ |
| transition       | String              | `fade`               | Transition name |
| color            | String              | `#000`               | Customize the color of loading icon |
| height           | Number              | *                    | Customize the height of loading icon |
| width            | Number              | *                    | Customize the width of loading icon |
| loader           | String              | `spinner`            | Name of icon shape you want use as loader, `spinner` or `dots` or `bars` |
| background-color | String              | `#fff`               | Customize the overlay background color |
| opacity          | Number              | `0.5`                | Customize the overlay background opacity |
| z-index          | Number              | `9999`               | Customize the overlay z-index |
| enforce-focus    | Boolean             | `true`               | Force focus on loader |
| lock-scroll      | Boolean             | `false`              | Freeze the scrolling during full screen loader |

* ^When `is-full-page` is set to `false`, the container element should be positioned as `position: relative`. You can
  use CSS helper class `vl-parent`.
* *The default `height` and `width` values may vary based on the `loader` prop value

## Available slots

The component accepts these slots:

* `default` - Replace the animated icon with yours
* `before` - Place anything before the animated icon, you may need to style this.
* `after` - Place anything after the animated icon, you may need to style this.

## API methods

### `this.$loading.show(?propsData,?slots)`

```js
import {h} from 'vue';

let loader = this.$loading.show({
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
    default: h('your-custom-loader-component-name'),
});
// hide loader whenever you want
loader.hide();
```

## Global configs

You can set props and slots for all future instances when using as plugin

```js
app.use(LoadingPlugin, {
    // props
    color: 'red'
}, {
    // slots
})
```

Further you can override any prop or slot when creating new instances

```js
let loader = this.$loading.show({
    color: 'blue'
}, {
    // override slots
});
```

## Use directly in browser (with CDN)

```html
<!-- Vue js -->
<script src="https://cdn.jsdelivr.net/npm/vue@3.2"></script>
<!-- Lastly add this package -->
<script src="https://cdn.jsdelivr.net/npm/vue-loading-overlay@6"></script>
<link href="https://cdn.jsdelivr.net/npm/vue-loading-overlay@6/dist/css/index.css" rel="stylesheet">
<!-- Init the plugin and component-->
<script>
    const app = Vue.createApp({});
    app.use(VueLoading.LoadingPlugin);
    app.component('loading', VueLoading.Component)
    app.mount('#app')
</script>
```

## Run examples on your localhost

* Clone this repo
* Make sure you have node-js `>=18.12` and [pnpm](https://pnpm.io/) `>=7.18` pre-installed
* Install dependencies `pnpm install`
* Run webpack dev server `npm start`
* This should open the demo page in your default web browser

## Testing

* This package is using [Jest](https://github.com/facebook/jest)
  and [vue-test-utils](https://github.com/vuejs/test-utils) for testing.
* Execute tests with this command `npm test`

## License

[MIT](LICENSE.txt) License
