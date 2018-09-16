<template>
  <div class="card vld-parent">
    <loading :active.sync="isLoading"
             :can-cancel="canCancel"
             :on-cancel="whenCancelled"
             :is-full-page="fullPage"
             :size="size"
             :color="color"
             :background-color="bgColor">
      <h3 v-if="useSlot">Loading ...</h3>
    </loading>
    <div class="card-body">
      <h5 class="card-title">Use as component</h5>

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
        <label class="custom-control-label" for="input-slot-1">Use slot?</label>
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
  import Loading from '../../src/index';

  export default {
    data() {
      return {
        isLoading: false,
        fullPage: true,
        canCancel: false,
        useSlot: false,
        color: '#007bff',
        bgColor: '#ffffff',
        size: 64,
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
        setTimeout(() => {
          this.isLoading = false
        }, this.timeout);
      },
      whenCancelled() {
        console.log("User cancelled the loader.")
      }
    }
  }
</script>
