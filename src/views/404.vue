<template>
  <div class="wrapper">
    <img src="@/assets/images/404.png" alt="404" style="width: 60%" />
    <div class="text-info padding-30">页面走丢了</div>
    <van-button type="primary" plain to="/">返回首页</van-button>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>
<style lang="less" scoped>
.wrapper {
  height: 100vh;
  padding-top: 30%;
  text-align: center;
}
</style>
