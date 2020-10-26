<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },

  methods: {

  }
}
</script>
<style  >
html,body{
  margin:0;
  padding:0;
}
.bg{
  height:20px;
  background-color:#000;
  position: fixed;
  z-index: infinity;
  width:100%;
  top:-15px;
}
</style>
