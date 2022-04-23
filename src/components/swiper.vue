<template>
  <div class="swiper-box">
    <div
      class="
        swiper-no-swiping swiper
        mySwiper
        swiper-initialized swiper-horizontal swiper-pointer-events
      "
      ref="mySwiper"
    >
      <div
        class="swiper-wrapper"
        id="swiper-wrapper-875d5831508998f9"
        aria-live="polite"
        style="
          transition-duration: 0ms;
          transform: translate3d(-2608px, 0px, 0px);
        "
      >
        <div
          v-for="(item, index) in alBumList"
          :key="item.albumId"
          class="swiper-slide"
          :data-swiper-slide-index="index"
          role="group"
          :aria-label="labelStr(index)"
        >
          <div class="alimg">
            <img v-lazy="item.coverUrl+'?param=100x100'" />
            <a href="JavaScript:;" class="almask"></a>
            <a href="JavaScript:;" class="alplay">播放</a>
          </div>
          <p class="songname">
            <a href="JavaScript:;">{{ item.albumName }}</a>
          </p>
          <p class="singername">
            <a>{{ item.artistName}}</a>
          </p>
        </div>
      </div>
      <div
        class="swiper-button-next"
        tabindex="0"
        role="button"
        aria-label="Next slide"
        aria-controls="swiper-wrapper-875d5831508998f9"
      ></div>
      <div
        class="swiper-button-prev"
        tabindex="0"
        role="button"
        aria-label="Previous slide"
        aria-controls="swiper-wrapper-875d5831508998f9"
      ></div>
      <span
        class="swiper-notification"
        aria-live="assertive"
        aria-atomic="true"
      ></span>
    </div>
  </div>
</template>

<script>
// 引入swiper样式
import "swiper/css/swiper.min.css";
import Swiper from "swiper";
export default {
  name: "Swiper",
  props: ["alBumList"],
  computed: {
    // 轮播图aria-label参数  正常
    labelStr(index) {
      return (index) => {
        return index + 1 + "/" + this.alBumList.length;
      };
    },
  },
  mounted() {},
  watch: {
    alBumList: {
      immediate: true,
      deep: true,
      handler() {
        // 初始化swiper
        this.$nextTick(() => {
          var swiper = new Swiper(this.$refs.mySwiper, {
            slidesPerView: 5,
            spaceBetween: 20,
            slidesPerGroup: 5,
            loop: true,
            loopFillGroupWithBlank: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scope>
.swiper-box {
  height: 184px;
  padding: 0 16px;
  background: #f5f5f5;
  position: relative;
  zoom: 1;
  margin: 20px 0 37px;
  border: 1px solid #d3d3d3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper {
  height: 186px;
  padding-bottom: 20px;
  width: 645px;
  overflow: hidden;
  #swiper-wrapper-875d5831508998f9 {
    align-items: center;
  }
  .swiper-slide {
    width: 118px;
    height: 100px;
    display: flex;
    flex-direction: column;
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 12px;
    color: #333;
    font-weight: 500;
  }
  .swiper-button-prev {
    left: 0px;
  }
  .swiper-button-next {
    right: 0;
  }
}
.alimg {
  width: 100%;
  height: 100%;
  position: relative;
  &:hover .alplay {
    display: block;
  }
  img {
    position: relative;
    z-index: 0;
    width: 100px;
    height: 100px;
  }
  .almask,
  .alplay {
    cursor: pointer;
  }
  .almask {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("~@/assets/image/coverall.png") no-repeat;
    background-position: -3px -570px;
  }
  .alplay {
    display: none;
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 22px;
    height: 22px;
    background: url("~@/assets/image/iconall.png") no-repeat;
    background-position: 0 -85px;
    z-index: 1;
    font-size: 0;
  }
}
.songname a {
  color: #000;
  display: block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.singername {
  color: #666;
}
</style>