<template>
  <div class="recommend-continer">
    <div class="recommend-slider">
      <slider></slider>
    </div>
    <div class="w">
      <div class="recommend-main common-main">
        <div class="common-left">
          <hot-recommend></hot-recommend>
          <hot-new></hot-new>
          <hot-list></hot-list>
        </div>
        <div class="common-right">
          <user-login></user-login>
          <singer-and-dj></singer-and-dj>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入轮播图组件
import slider from "./slider.vue";
import hotRecommend from "@/views/discoverMusic/recommend/hotRecommend";
import userLogin from "@/views/discoverMusic/recommend/userLogin";
import hotNew from "@/views/discoverMusic/recommend/hotNew";
import SingerAndDj from './singerAndDj.vue';
export default {
  components: { slider, hotRecommend, userLogin, hotNew, 
  HotList:()=>import('./hotList.vue'),
    SingerAndDj },
  name: "Recommend",
};
</script>

<style lang="less" scoped>
.recommend-slider {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 285px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #d3d3d3;
}
.recommend-main {
  display: flex;
}
.common-right{
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>