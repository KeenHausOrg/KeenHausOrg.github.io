<template>
  <div id="app">
    <link rel="stylesheet" href='https://github.githubassets.com/assets/frameworks-052cbe13e4b93c9b8358a7178885c1a0.css'>
    <link rel="stylesheet" href='https://gist.github.com/stylesheets/gist/embed.css'>
    <link rel="stylesheet" href='https://github.githubassets.com/assets/github-cd91185ab4f65b2ac0a8dd8d9b6f6db4.css'>
    <link rel="stylesheet" href='https://github.githubassets.com/assets/gist-d6025babd248cbbd2f271e14e4e6f85c.css'>
    <StaticHeader>
    </StaticHeader>
    <spacer/>
    <h2 class="text-center">Automated Instagram Plant Posts</h2>
    <spacer/>
    <SectionTitle title="Intro" />
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
    <spacer/>

    <SectionTitle title="Overall Architecture" />
    <b-container class="">
      <b-img  v-bind:src="require('@/assets/Arch.jpg')" fluid alt="Architecture diagram"></b-img>
    </b-container>
    <b-container class="">
      <b-row>
        <b-col>
          <ol class="text-left">
            <li>The soil sensor detects the moisture on the soil and outputs a voltage</li>
            <li>The voltage is read by the arduino board via an analog read pin</li>
            <li>The Arduino uses the voltage and determines if the soil is dry or wet</li>
            <li>The Arduino then sends the moisture via USB to the Raspberry Pi</li>
            <li>The Raspberry Pi reads the data from the USB, parses it, takes a picture and creates a package</li>
            <li>This package is then sent to the internet via wifi</li>
          </ol>
        </b-col>
      </b-row>
    </b-container>

    <spacer/>
    <spacer/>

    <SectionTitle title="Configuring the Arduino" />
    <spacer/>
    <LeftRight
      img = "ArduinoCrop.jpg"
      img_alt = "Arduino Nano and moisture sensor"
      msg = "<p>The soil sensor that I bought has three pins, GND, VCC, and Analog Out. Because of its low power requirements, I decided to power it up using the mcu using the 5V and Ground pins. The Analog output pin will give us the voltage based on how humid or dry the soil is, so I connected it to the Arduino's A0 pin.</p>   <p>In order to understand the readings bit better, I decided to translate the voltage to a percentage. The mcu reads a value between 0-1024, so it is not super clear. It is much easier (for a human) to understand '90% humid' than '503 humid'.</p>
          <p>Finally, we send the readings to the Raspberry Pi via USB using Serial command.</p>
    
          <b-row>
            <b-col cols='3'></b-col>
            <b-col cols='2' class='text-center' style='background-color:#aba0a0'><p style='font-size:larger'>Gist code <a href='https://gist.github.com/cjc061000/5adf9ae145075afc2818c1db3dc78537'>here</a></p></b-col>
            <b-col cols='6'></b-col>
          </b-row>

          <p>Note: These things have to be calibrated in order to work properly, read more about it <a href='https://makersportal.com/blog/2020/5/26/capacitive-soil-moisture-calibration-with-arduino'>here</a>. It can be a dull read, so the tl;dr: measure in water and in air and those will be your max vals. Then look at my code for a working example.</p>"/>
    

    <spacer/>
    <SectionTitle title="Configuring the Raspberry Pi - Serial" />
    <spacer/>
    <b-container class="">
      <b-row>
        <p>Configuring the Raspberry Pi was a bit more challenging. On top of that the Raspberry Pi is the device that is doing all the heavy lifting, taking pictures, and uploading everything to the internet, so I will split this section for each individual task to make it easier to follow.</p>
    <p>Started by installing the <a href='https://arduino.github.io/arduino-cli/getting-started/'>Arduino CLI</a> and proceeded to look for my board. I noticed though that I could not find my board on my list of connected devices.</p>
      </b-row>
      <b-row>
        <CodeSnippet code = "$ arduino-cli board list
Port         Type              Board Name              FQBN                 Core
/dev/ttyACM1 unknown unknown
/dev/ttyUSB0 Serial Port (USB) unknown" />
      </b-row>
      <b-row>
        <p>Maybe the connection still works just the name is goofed up? I tried Sara's command (tail) to read the serial input, but it was not really working. So instead I tried using cat instead. It worked! Since Linux treats ports as files, I was able to read it it, and I saw the input coming in at regular intervals!</p>
      </b-row>
      <b-row>
        <CodeSnippet code = "$ cat /dev/ttyUSB0
Humidity: 0%
Humidity: 0%
..." />
      </b-row>
      <b-row>
        <p>Turns out, the board appearing as "unknown" is a known issue and explained better in this <a href='https://forum.arduino.cc/index.php?topic=676741.0'>post</a>. But with the Raspberry connected, now is time to read the data. We use python (pyserial) to read the serial data coming from the arduino. Because I dont know if I have read a complete message (we are reading bytes as they come), I decided that a "complete" message must end in a new line character.</p>
      </b-row>
      <b-row>
        <CodeSnippet code="ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=5)
sample = ser.read(200) # pull 200 bytes off serial
sample_list = sample.decode('utf-8').split('\n')
...
reading = reading.strip()
  reading_kv = reading.split(':')
  if len(reading_kv) == 2:
    key = reading_kv[0]
    val = reading_kv[1]
    if key == 'Percent':
      return val
...
"/>
      </b-row>
    </b-container>
    
    <spacer/>
    <SectionTitle title="Configuring the Raspberry Pi - Taking a picture" />
    <spacer/>

    <RightLeft msg = "<p></p>" 
               img = "ArduinoCrop.jpg"
               img_alt = "ArduinoCrop.jpg" />
    
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
import SectionTitle from './components/SectionTitle.vue'
import RightLeft from './components/RightLeft.vue'
import CodeSnippet from './components/CodeSnippet.vue'

export default {
  name: 'App',
  components: {
    StaticHeader, LeftRight, RightLeft,
    PartsList,
    Spacer,
    SectionTitle,
    CodeSnippet
    // EmbedGist
  },
    
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
