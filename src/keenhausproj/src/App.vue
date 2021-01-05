<template>
  <div id="app">
    <StaticHeader>
    </StaticHeader>
    <h2>Intro</h2>
    <LeftRight 
      img_alt = "alt desc" 
      img = "compscrop.jpg" 
      msg="A friend of mine showed me this cool post about a plant that automatically posts tweets based on the soil moisture (<a href='http://sarabee.github.io/2020/05/10/plant-tweets-part-2/'>link</a>). I have done some similar work on my own home and thought I could grab this post and take it a step further. In this post I will teach you how to use an arduino and a raspberry pi with a camera to take a picture of the your plant, record the soil moisture, and create an instagram post." />
    <spacer/>
    <parts-list 
      :parts = "['Arduino Nano (but pretty much any arduino would do) {<a href=\'https://www.sparkfun.com/products/15590\'>Link</a>}',
                 'Raspberry Pi Zero W with camera {<a href=\'https://www.sparkfun.com/products/15470\'>Link</a>}',
                 'Capacitive Soil Sensor {<a href=\'https://www.amazon.com/Gikfun-Capacitive-Corrosion-Resistant-Detection/dp/B07H3P1NRM/ref=sxts_sxwds-bia-wc-nc-drs1_0\'>Link</a>}',
                 'Buncha wires']"
      title="Parts List" />

<!-- parts = ['Arduino Nano (but pretty much any arduino would do) []',
              'Raspberry Pi Zero W (with camera)',
              'Capacitive Soil Sensor',
              'Buncha wires'] -->

    <!-- <div>Parts list:</div>
    <b-list-group>
      <b-list-group-item>Arduino Nano (but pretty much any arduino would do) [<a href="https://www.sparkfun.com/products/15590">Link</a>]</b-list-group-item>
      <b-list-group-item>Raspberry Pi Zero W (with camera)</b-list-group-item>
      <b-list-group-item>Capacitive Soil Sensor</b-list-group-item>
      <b-list-group-item>Buncha wires</b-list-group-item>
    </b-list-group> -->
    <!-- <img src="./assets/compscrop.jpg"> -->
    <!-- <img alt = "Vue logo" src = "./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import StaticHeader from './components/StaticHeader.vue'
import LeftRight from './components/LeftRight.vue'
import PartsList from './components/PartsList.vue'
import Spacer from './components/Spacer.vue'

export default {
  name: 'App',
  components: {
    StaticHeader, LeftRight,
    PartsList,
    Spacer
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
