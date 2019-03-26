<template>
  <div id="app">
      <div class="navmenu">
        <router-link to="/">index</router-link>
        <router-link to="/list?id=1">list</router-link>
        <router-link to="/todolist/2">todolist</router-link>
        <router-view/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
a{ margin:0;padding:0; text-decoration:none}
.navmenu{ text-align:center; }
.navmenu a{margin-right:20px; }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
