# Vue Loading Component

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/))
[![github-tag](https://img.shields.io/github/tag/ankurk91/vue-loading-component.svg?maxAge=1800)](https://github.com/ankurk91/vue-loading-component/)
[![license](https://img.shields.io/github/license/ankurk91/vue-loading-component.svg?maxAge=1800)]()

Vue.js v2.x component for full screen loading indicator

## Installation
:mega: I have no plans to publish this package on npm.
```bash
# npm
npm install ankurk91/vue-loading-component --save

# Yarn
yarn add ankurk91/vue-loading-component
```

## Usage
#### As component
```html
<template>
    <div>
        <loading :active.sync="isSaving" :can-cancel="true"></loading>
    </div>
</template>

<script>
    // Import component
    import {Loading} from 'vue-loading-component';
    // Import stylesheet
    import 'vue-loading-component/dist/vue-loading.min';

    export default {
        data() {
            return {
                isSaving: false,
            }
        },
        components: {
            Loading
        },
        methods: {
            submit() {
                this.isSaving = true;
                // do AJAX here
            }
        }
    }
</script>
```

### As plugin
```html
<template>
    <form @submit.prevent="submit">
        <!-- form inputs -->
    </form>
</template>

<script>
    import Vue from 'vue';
    // Import component
    import {LoadingPlugin} from 'vue-loading-component';
    // Import stylesheet
    import 'vue-loading-component/dist/vue-loading.min';
    // Init plugin
    Vue.use(LoadingPlugin);

    export default {
        methods: {
            submit() {
                let loader = this.$loading.show();
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
| canCancel        | Boolean             | `false`              | Allow user to cancel |
| onCancel         | Function            | `()=>{}`             | Do something upon cancel |


## Run examples on your localhost
* Clone this repo
* Make sure you have node-js >=6.10 and [yarn](https://yarnpkg.com) >=1.x pre-installed
* Install dependencies - `yarn install`
* Run webpack dev server - `yarn start`
* This should open the demo page at `http://localhost:8000` in your default web browser 

## Credits
* [Buefy](https://buefy.github.io/#/documentation/loading) loading component

## License
[MIT](LICENSE.txt) License
