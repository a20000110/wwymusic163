<template>
  <div class="slider-continer">
    <el-carousel :interval="4000" arrow="always" height="285px" trigger="click">
      <el-carousel-item
        v-for="item in bannerList"
        :key="item.imageUrl"
        width="980px"
        :style="bannerMask(item.maskUrl)"
      >
        <h3 class="medium">
          <div class="medium-flag">
            <img :src="item.imageUrl+'?param=730x285'" />
          </div>
        </h3>
      </el-carousel-item>
    </el-carousel>
    <div class="down-box">
      <div class="down-tag">
        <a href="JavaScript:;" class="down-btn">下载客户端</a>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      //banner
      bannerList: [],
    };
  },
  methods: {
    bannerMask(url) {
      return `background-image:url("${url}");`
    },
    // 获取banner
    async getBanner() {
      const result = await this.$API.recommend.reqBanner();
      if (result.code == 200) {
        result.banners.forEach((item) => {
          item.maskUrl = `${item.imageUrl}?imageView&blur=40x20`;
        });
        this.bannerList = result.banners;
      }
    },
  },

  created() {
    this.getBanner();
  },
};
</script>
<style lang="less" scoped>
.slider-continer {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 285px;
  .down-box {
    width: 980px;
    margin: auto;
    height: 285px;
    background-color: transparent;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    .down-tag {
      position: absolute;
      top: 0;
      right: 0;
      width: 250px;
      height: 100%;
      background: url("~@/assets/image/download.png");
      p {
        margin: 10px auto;
        text-align: center;
        color: #8d8d8d;
        font-size: 12px;
      }
      .down-btn {
        display: block;
        width: 215px;
        opacity: 0;
        height: 56px;
        background: url("~@/assets/image/download.png") no-repeat;
        margin: 186px 0 0 19px;
        background-position-y: -186px;
        background-position-x: -19px;
        text-indent: -9999px;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
.medium {
  width: 980px;
  position: relative;
  margin: auto;
}
.medium-flag {
  width: 980px;
  margin: auto;
  height: 285px;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  img {
    width: 730px;
  }
}
</style>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item {
  background-size: 200%;
}
</style>