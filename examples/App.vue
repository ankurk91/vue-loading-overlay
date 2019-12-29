<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark shadow-sm mb-3">
      <span class="navbar-brand mb-0">Vue.js Loading Overlay v3</span>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/ankurk91/vue-loading-overlay"
             target="_blank"> GitHub</a></li>
      </ul>
    </nav>

    <main class="container">
      <div class="row">
        <div class="col-md-8">
          <component-example/>
          <plugin-example/>
        </div>

        <aside class="col-md-4 mb-3">
          <div class="card">
            <div class="card-header"> Links</div>
            <div class="card-body">
              <ul>
                <li><a href="https://github.com/ankurk91/vue-loading-overlay" target="_blank">GitHub</a></li>
                <li><a href="https://www.npmjs.com/package/vue-loading-overlay" target="_blank">npm</a></li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <footer class="text-center text-muted small mb-3">
      Created by <a href="https://twitter.com/ankurk91" target="_blank" rel="noopener">@ankurk91</a>
    </footer>
  </div>
</template>

<script>
  import ComponentExample from './components/component';
  import PluginExample from './components/plugin';

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      ComponentExample,
      PluginExample
    },
    methods: {}
  }
</script>

