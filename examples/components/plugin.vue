<template>
  <div class="card loading-parent mt-3" ref="formContainer">
    <div class="card-body">
      <h5 class="card-title">Use as plugin</h5>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-full-page-2" v-model="fullPage">
        <label class="custom-control-label" for="input-full-page-2">Full page?</label>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-cancel-2" v-model="canCancel">
        <label class="custom-control-label" for="input-cancel-2">User can cancel?</label>
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
        <label>Size</label>
        <input type="number" v-model.number="size" min="1" class="form-control form-control-sm"/>
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
        timeout: 3000, //ms
        color: '#007bff',
        bgColor: '#ffffff',
        size: 64,
      }
    },
    methods: {
      simulate() {
        let loader = this.$loading.show({
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: this.canCancel,
          onCancel: this.whenCancelled,
          color: this.color,
          backgroundColor: this.bgColor,
          size: this.size,
        });
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

<style>
  .loading-parent {
    position: relative;
  }
</style>
