<template>
  <div class="app">
    <Knowledge></Knowledge>
  </div>
</template>

<script>
import Knowledge from "@/components/Knowledge/Knowledge";
export default {
  name: "App",
  components: {
    Knowledge,
  },
  data() {
    return {
      appHeight: window.innerHeight,
      appWidth: window.innerWidth,
    };
  },
  methods: {},
};
</script>

<style lang="css" scoped>
.app {
  /* background-image: url("./assets/test1.png");
  background-repeat: no-repeat;
  background-size: cover; */
}
</style>
