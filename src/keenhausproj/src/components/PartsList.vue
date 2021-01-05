<template>
  <b-container fluid="md">
    <strong>{{ title }}</strong>
    <b-list-group>
      <b-list-group-item class="text-left" v-for="part in parts" :key="part"
        v-html="part"></b-list-group-item>
      <!-- <b-list-group-item>Raspberry Pi Zero W (with camera)</b-list-group-item>
      <b-list-group-item>Capacitive Soil Sensor</b-list-group-item>
      <b-list-group-item>Buncha wires</b-list-group-item> -->
    </b-list-group>
  </b-container>
</template>

<script>
  export default {
    name: 'PartsList',
    props: {
      parts: Array,
      title: String
    }
  }
</script>

<style scoped>
  .lf-img{    
    height: auto;
    max-width: -webkit-fill-available;
  }
  .v-list-item__content{
    text-align: left;
    display: grid;
  }
</style>