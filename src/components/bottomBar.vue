<template>
  <div
    class="btmbar"
    ref="btmbar"
    :style="showbar"
    @mouseover="isMouse && btmbarOver()"
    @mouseleave="isMouse && btmbarLeave()"
  >
    <div class="locking"></div>
    <div class="isvg" :class="isvghover" @click="switchLocking"></div>
    <bottom-player></bottom-player>
  </div>
</template>

<script>
import bottomPlayer from "./bottomPlayer.vue";
export default {
  components: { bottomPlayer },
  name: "BottomBar",
  data() {
    return {
      // 页面加载底部播放栏定时器
      showBtmbarTimer: null,
      showbar: {},
      // svg的动态class
      isvghover: "",
      isLocking: false,
      // 控制事件是否能被触发
      isMouse: true,
    };
  },
  computed: {},
  methods: {
    // 点击切换锁定状态
    switchLocking() {
      this.isLocking = !this.isLocking;
      // 每次修改状态都保存到本地存储中
      localStorage.setItem("isLocking", this.isLocking);
      this.isvghover = this.isLocking ? "svgSd" : "svgJs";
      this.isMouse = !this.isLocking;
    },
    locatIsLocking() {
      // 用于初始化小锁得状态，从浏览器本地存储中读取状态
      if (localStorage.getItem("isLocking") == null) {
        localStorage.setItem("isLocking", this.isLocking);
      } else {
        this.isLocking = JSON.parse(localStorage.getItem("isLocking"));
      }
      this.isvghover = this.isLocking ? "svgSd" : "svgJs";
      this.isMouse = !this.isLocking;
    },
    animationDown() {
      if (!this.isLocking) {
        this.showBtmbarTimer = setTimeout(() => {
          clearTimeout(this.showBtmbarTimer);
          this.showBtmbarTimer = null;
          this.showbar = { transition: "all .6s", bottom: " -50px" };
        }, 3000);
      } else {
        return false;
      }
    },
    btmbarOver() {
      clearTimeout(this.showBtmbarTimer);
      this.showBtmbarTimer = null;
      this.showbar = { transition: "all 0.1s", bottom: " 0px" };
    },
    btmbarLeave() {
      this.showbar = { transition: "all 0.4s", bottom: " -50px" };
    },
  },
  mounted() {
    this.locatIsLocking();
    this.animationDown();
  },
};
</script>

<style lang="less" scoped>
.btmbar {
  position: relative;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0px;
  height: 55px;
  z-index: 99;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.9);
  .locking {
    position: absolute;
    cursor: pointer;
    right: 20px;
    top: -31px;
    width: 40px;
    height: 40px;
    transform: perspective(5em) rotateX(60deg);
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.9);
  }
  .svgSd {
    background-image: url("~@/assets/svg/heisuo.svg") !important;
  }
  .svgJs {
    background-image: url("~@/assets/svg/heijie.svg") !important;
  }
  .isvg {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: -31px;
    width: 40px;
    height: 40px;
    background: url("~@/assets/svg/baijie.svg") no-repeat 100%;
    background-position: 14px 15px;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>