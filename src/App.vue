<template>
  <van-nav-bar
    v-if="navBar.show"
    :title="navBar.title"
    :left-text="navBar.leftText"
    :right-text="navBar.rightText"
    :left-arrow="navBar.showLeftArrow"
    @click-left="navBar.onClickLeft"
    @click-right="navBar.onClickRight"
  />
  <div :class="['page-content', navBar.show && 'padding-top-navBarHeight']">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.name" />
    </router-view>
  </div>
</template>

<script>
import useNavBar from '@/use/useNavBar'
export default {
  setup() {
    const navBar = useNavBar()

    return {
      navBar
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 28px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fafafa;
  overflow: auto;
  .van-nav-bar {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 92px;
  }
  .page-content {
    height: 100%;
    &.padding-top-navBarHeight {
      padding-top: 92px;
    }
  }
}
</style>
