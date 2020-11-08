export default {
  mounted() {
    if (this.enforceFocus) {
      document.addEventListener('focusin', this.focusIn)
    }
  },
  methods: {
    /**
     * Trap focus event
     *
     * @param event
     */
    focusIn(event) {
      // Ignore when loading is not active
      if (!this.isActive) return;

      if (
        // Event target is the loading div element itself
        event.target === this.$refs.root ||
        // Event target is inside the loading div
        this.$refs.root.contains(event.target)
      ) return;

      // Use container as parent when available otherwise use parent element when isFullPage is false
      let parent = this.container ? this.container : (this.isFullPage ? null : this.$refs.root.parentElement);

      if (
        // Always prevent when loading is full screen
        this.isFullPage ||
        // When a parent exist means loader is running inside a container
        // When loading is NOT full screen and event target is inside the given container
        (parent && parent.contains(event.target))
      ) {
        event.preventDefault();
        this.$refs.root.focus()
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('focusin', this.focusIn)
  }
}
