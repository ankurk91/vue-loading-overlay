const transitionStub = () => ({
  render: function(h) {
    return this.$options._renderChildren
  }
});

export default transitionStub
