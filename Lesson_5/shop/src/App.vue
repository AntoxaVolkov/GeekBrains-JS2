<template>
  <div id="app" class="app-container">
    <HeaderApp/>
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src
import HeaderApp from "@/components/HeaderApp.vue";

export default {
  name: "app",
  components: {
    HeaderApp
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1,
h2 {
  text-align: center;
}
.app-container {
  max-width: 900px;
  margin: 0 auto;
}
a {
  color: #2c3e50;
  text-decoration: none;
}

a:hover {
  color: #42b983;
}
</style>
