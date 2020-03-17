<template>
  <div id="app">
    <Nav />
    <home></home>
  </div>
</template>

<script>
import Home from "./views/Home/index.vue";
import Nav from "./components/Nav/index.vue";

export default {
  components: {
    Home,
    Nav
  },
  created() {
    this.$store.dispatch("INIT_CITY");
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #f8f8f8;
}
</style>
