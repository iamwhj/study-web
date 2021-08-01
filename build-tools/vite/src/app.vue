<template>
  <div>
    <h3>测试单文件组件</h3>
    <p>{{ aa }}</p>
    <input type="text" v-model="aa">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        aa: 222,
        cc: 333
      }
    }
  }
</script>