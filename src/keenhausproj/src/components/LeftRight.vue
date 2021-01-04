<template>
  <b-container fluid="md">
    <b-row>
      <b-col cols="6">{{ msg }}</b-col>
      <b-col cols="6"><b-img class="lf-img" :alt="img_alt" v-bind:src="require('@/assets/' + img + '')"></b-img></b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'LeftRight',
    props: {
      msg: String,
      img: String,
      img_alt: String
    }
  }
</script>

<style scoped>
  .lf-img{    
    height: auto;
    max-width: -webkit-fill-available;
  }
</style>