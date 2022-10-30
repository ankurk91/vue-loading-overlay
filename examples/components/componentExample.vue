<template>
  <div class="card vld-parent mb-3">
    <loading v-model:active="isLoading"
             :can-cancel="canCancel"
             :on-cancel="whenCancelled"
             :is-full-page="fullPage"
             :height="height"
             :width="width"
             :color="color"
             :loader="loader"
             :background-color="bgColor">
      <template #default v-if="useSlot">
        <h3>Loading ...</h3>
      </template>
    </loading>
    <div class="card-body">
      <h5 class="card-title">Use as component</h5>

      <div class="form-group m-0">
        <label>Loader shape</label>
        <select class="form-control-sm text-capitalize" v-model="loader">
          <option v-for="item in ['spinner','dots','bars']">{{ item }}</option>
        </select>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-full-page-1" v-model="fullPage">
        <label class="custom-control-label" for="input-full-page-1">Full page?</label>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-cancel-1" v-model="canCancel">
        <label class="custom-control-label" for="input-cancel-1">User can cancel?</label>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="input-slot-1" v-model="useSlot">
        <label class="custom-control-label" for="input-slot-1">Use slot? (replace shape)</label>
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
        <input type="range" min="10" step="5" max="256" v-model.number="height"/> <span
        class="text-muted">{{ height }}</span>
      </div>

      <div class="form-group">
        <label>Width</label>
        <input type="range" min="10" step="5" max="256" v-model.number="width"/> <span
        class="text-muted">{{ width }}</span>
      </div>

      <div class="form-group mt-3">
        <button class="btn btn-outline-primary btn-sm" @click.prevent="simulate">Show loader</button>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import Loading from '../../src/index';

let timer = null;
export default defineComponent({
  data() {
    return {
      isLoading: false,
      fullPage: true,
      canCancel: true,
      useSlot: false,
      loader: 'spinner',
      color: '#007bff',
      bgColor: '#ffffff',
      height: 128,
      width: 128,
      timeout: 3000, //ms
    }
  },
  components: {
    Loading
  },
  methods: {
    simulate() {
      this.isLoading = true;

      // Simulate async call
      timer = setTimeout(() => {
        this.isLoading = false
      }, this.timeout);
    },
    whenCancelled() {
      clearTimeout(timer);

      console.log("User cancelled the loader.")
    }
  }
})
</script>
