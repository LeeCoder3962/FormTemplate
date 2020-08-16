<template>
  <div id="app">
    <elupload />
  </div>
</template>

<script>
import elupload from './components/elupload.vue'

export default {
  name: 'App',
  components: {
    elupload
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
