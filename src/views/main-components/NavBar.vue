<template>
  <div class="navbar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "navbar",
  components: {},
  data() {
    return {};
  },
  computed: {
    sidebar() {}
  }
};
</script>
<style scoped>
.navbar {
  overflow-x: hidden;
  /* overflow-y: scroll; */
  top: 50px;
  bottom: 0;
  right: -17px;
  height: 100%;
}
</style>
