<template>
<b-container>
  <div class="code-snippet-container" v-html="code"></div>
</b-container>
  
</template>

<script>
export default {
  name:"CodeSnippet",
  props:{
    code:String
  }
}
</script>

<style scoped>
  .code-snippet-container{
    box-sizing: border-box;
    display: block;
    direction: ltr;
    font-family: "Roboto Mono",SFMono-Regular,Consolas,Menlo,monospace;
    font-size: 14px;
    line-height: 19px;
    white-space: pre;

    color:rgb(54, 70, 78);
    overflow: auto;

    background-color: rgb(245,245,245);

    border-radius: 2px;

    margin-top: 20px;
    margin-bottom: 20px;
    padding-left:10px;
    padding-right:10px;
    padding-top:10px;
    padding-bottom: 10px;


  }
</style>