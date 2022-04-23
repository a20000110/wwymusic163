<template>
  <div class="hotnew">
    <div class="hotmenu">
      <span class="red-round"><span class="white-round"></span></span>
      <h3 class="hot-title">新碟上架</h3>
      <!-- 更多 -->
      <div class="hot-more">
        <a
          >更多<svg
            t="1649942585041"
            style="position: relative; left: 2px; top: 1px"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4527"
            width="12"
            height="12"
          >
            <path
              d="M511.362992 959.373097l-84.023672-84.009346 302.222229-299.651684L63.978638 575.712067 63.978638 447.771163l665.581887 0L427.338297 147.18827l84.023672-84.024695 448.058712 448.618461L511.362992 959.373097z"
              p-id="4528"
              fill="#c10d0c"
            ></path></svg
        ></a>
      </div>
    </div>
    <div class="hotnew-slider">
      <swiper ref="swiper" :alBumList="alBumList"></swiper>
    </div>
  </div>
</template>

<script>
import swiper from "@/components/swiper";
export default {
  name: "HotNew",
  components: { swiper },
  data() {
    return {
      alBumList: [], //保存新碟上架列表
      listData: {
        limit: 10, //列表数量
      },
    };
  },
  methods: {
    // 获取新碟上架列表
    async getAlBum() {
      const result = await this.$API.recommend.reqAlBum(this.listData);
      if (result.code == 200) {
        this.alBumList = result.products;
      } else {
        this.$message.error(result.message);
      }
    },
  },
  mounted() {
    this.getAlBum();
  },
};
</script>

<style>
</style>