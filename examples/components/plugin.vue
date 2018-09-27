<template>
  <div class="card vld-parent my-3" ref="formContainer">
    <div class="card-body">
      <h5 class="card-title">Use as plugin</h5>

      <div class="form-group m-0">
        <label>Loader shape</label>
        <select class="form-control-sm text-capitalize" v-model="loader">
          <option v-for="item in ['spinner','dots']">{{item}}</option>
        </select>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-full-page-2" v-model="fullPage">
        <label class="custom-control-label" for="input-full-page-2">Full page?</label>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-cancel-2" v-model="canCancel">
        <label class="custom-control-label" for="input-cancel-2">User can cancel?</label>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-slot-2" v-model="useSlot">
        <label class="custom-control-label" for="input-slot-2">Use slot? (replace shape)</label>
      </div>

      <div class="form-group m-0">
        <label>Color</label>
        <input type="color" v-model="color">
      </div>

      <div class="form-group m-0">
        <label>Background color</label>
        <input type="color" v-model="bgColor">
      </div>

      <div class="form-group">
        <label>Height</label>
        <input type="range" min="10" step="5" max="256" v-model.number="height"/> <span class="text-muted">{{height}}</span>
      </div>

      <div class="form-group">
        <label>Width</label>
        <input type="range" min="10" step="5" max="256" v-model.number="width"/> <span class="text-muted">{{width}}</span>
      </div>

      <div class="form-group mt-3">
        <button class="btn btn-outline-primary btn-sm" @click.prevent="simulate">Show loader</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  // Import component
  import Loading from '../../src/index';
  // Init plugin
  Vue.use(Loading);

  export default {
    data() {
      return {
        fullPage: true,
        canCancel: false,
        useSlot: false,
        loader: 'spinner',
        timeout: 3000, //ms
        color: '#007bff',
        bgColor: '#ffffff',
        height: 64,
        width: 64,
      }
    },
    components: {
      customSlot: {
        props: {
          color: {
            type: String,
            default: '#000'
          }
        },
        template: `<div class="custom-slot" :style="{color:color}"><h3>Wait ...</h3></div>`
      }
    },
    methods: {
      simulate() {
        let slot = this.useSlot ? {
          // https://vuejs.org/v2/guide/render-function.html#createElement-Arguments
          default: [this.$createElement('custom-slot', {
            props: {
              color: '#005cbf'
            }
          })]
        } : {};

        let loader = this.$loading.show({
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: this.canCancel,
          onCancel: this.whenCancelled,
          color: this.color,
          backgroundColor: this.bgColor,
          height: this.height,
          width: this.width,
          loader: this.loader,
        }, slot);
        // simulate async call
        setTimeout(() => {
          loader.hide()
        }, this.timeout);
      },
      whenCancelled() {
        console.log("User cancelled the loader.")
      }
    }
  }
</script>

