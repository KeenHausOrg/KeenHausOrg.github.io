<template>
  <div>
  <div class="fluid-container footer">
    <p class="text-center">Copyright &copy; 2018, ABC Marketing. All Rights Reserved.</p>
  </div>
</div>
</template>

<script>
export default {
  name:"Footer"
}
</script>

<style scoped>
  .fluid-container.footer{
    background: #343a40 ;
  }
  .fluid-container.footer > *:last-child {
      margin-bottom: 0px;
      color: #fff;
  }
</style>