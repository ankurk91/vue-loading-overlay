<template>
  <div>
    <h1>Vue Loading component demo</h1>

    <loading
      :active.sync="visible"
      @close="onClose"
      :on-cancel="whenCancelled"
      :can-cancel="true"></loading>

    <button @click.prevent="open()">Programmatic show</button>
    <button @click.prevent="show()">Component show, cancellable</button>
    <button @click.prevent="showInContainer()">Programmatic show in container</button>
    <hr>
    <section class="custom-container" ref="loadingContainer">
      <h1>Custom container</h1>
    </section>
    <a target="_blank" href="https://github.com/ankurk91/vue-loading-overlay">Get this package</a>
  </div>
</template>

<script>
  import Vue from 'vue';

  import Loading from '../src/index';
  import '../src/scss/index.scss';

  Vue.use(Loading);

  export default {
    name: 'app',
    data() {
      return {
        visible: false
      }
    },
    components: {
      Loading
    },
    methods: {
      open() {
        console.log('open was clicked, will auto hide');
        let loader = this.$loading.show();
        // Simulate async operation
        setTimeout(() => loader.hide(), 3 * 1000)
      },
      show() {
        console.log('show was clicked, click to hide');
        // do AJAX here
        this.visible = true
      },
      whenCancelled() {
        alert("You cancelled the operation.")
      },
      onClose() {
        console.log("Listen to close event")
      },
      showInContainer() {
        let loader = this.$loading.show({
          container: this.$refs.loadingContainer
        });
        // Simulate async operation
        setTimeout(() => loader.hide(), 3 * 1000)
      }
    }
  }
</script>

<style>
  .custom-container {
    background: #ffa210;
    height: 300px;
    width: 50%;
    position: relative;
  }
</style>
