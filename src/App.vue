<template>
  <div id="app">
    <!-- <FormTemplate /> -->
    <elupload />
  </div>
</template>

<script>
// import FormTemplate from './components/FormTemplate.vue'
import elupload from './components/elupload.vue'
// import elupload from './components/elupload_async.vue'

export default {
  name: 'App',
  components: {
    // FormTemplate,
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
