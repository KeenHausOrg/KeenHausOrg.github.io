<template>
  <div id="app">
    <StaticHeader>
    </StaticHeader>
    <LeftRight 
      img_alt = "alt desc" 
      img = "compscrop.jpg" 
      msg="lorem ipsum lorem ipsump Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil excepturi aliquid mollitia libero ex alias quis omnis voluptatibus vitae soluta perspiciatis amet veniam ea ullam eius, in praesentium sed nam?" />
    <!-- <img src="./assets/compscrop.jpg"> -->
    <!-- <img alt = "Vue logo" src = "./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import StaticHeader from './components/StaticHeader.vue'
import LeftRight from './components/LeftRight.vue'

export default {
  name: 'App',
  components: {
    StaticHeader, LeftRight
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
