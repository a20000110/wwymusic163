<template>
  <div class="hotRecommend">
    <!-- 热门推荐 -->
    <div class="hotmenu">
      <span class="red-round"><span class="white-round"></span></span>
      <h3 class="hot-title">热门推荐</h3>
      <!-- 热门菜单 -->
      <div style="margin-left: 20px; display: flex">
        <div class="hot-menu" v-for="(item, index) in hotList" :key="item.id">
          <a class="hot-list" @click="hotListLink(item)">{{ item.name }}</a>
          <span class="line" v-if="index != hotList.length - 1">|</span>
        </div>
      </div>
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
    <!-- 歌单和电台 -->
    <ul class="hotplaylist">
      <li v-for="item in personaLized" :key="item.id" style="width: 140px">
        <div class="u-cover">
          <img v-lazy="item.picUrl+'?param=140x140'" />
          <span class="hotplaylist-mask"></span>
          <span class="hotplaylist-bottom">
            <i class="icon-header"></i>
            <span class="bfl common-12font">
              {{
                item.playCount ? item.playCount : item.program.adjustedPlayCount
              }}</span
            >
            <a
              href="JavaScript:;"
              class="icon-play"
              title="播放"
              @click="playSongs(item,'play')"
            ></a>
          </span>
        </div>
        <div class="listmessage">
          <i class="u-icn u-icn-53" v-if="item.type == 1"></i>
          {{ item.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HotRecommend",
  data() {
    return {
      hotList: [], //保存热门菜单 5个
      personaLized: [], //保存歌单类型列表
      listData: {
        limit: 5,
      },
    };
  },
  computed: {},
  methods: {
    // 获取热门推荐菜单
    async getRecommendMenu() {
      const result = await this.$API.recommend.reqHotMenu();
      if (result.code == 200) {
        this.hotList = result.tags.splice(0, 5); //保存热门菜单 5个
      }
    },
    // 获取热门推荐歌单类型列表
    async getPersonaLized() {
      const result1 = await this.$API.recommend.reqPersonaLized(this.listData);
      if (result1.code == 200) {
        //  播放量转换
        result1.result.forEach((item) => {
          let count = Math.floor(item.playCount / 10000);
          if (count > 10) {
            item.playCount = String(count) + "万";
          }
        });
        this.personaLized = result1.result;

        //获取电台节目
        const result2 = await this.$API.recommend.reqDjProgram();
        let program = result2.result.splice(0, 3);
        program.forEach((item) => {
          let count = Math.floor(item.program.adjustedPlayCount / 10000);
          if (count > 10) {
            item.program.adjustedPlayCount = String(count) + "万";
          }
        });
        this.personaLized = this.personaLized.concat(program);
       let per3 =  this.personaLized[3]
       let per4 =  this.personaLized[4]
       let per5 =  this.personaLized[5]
       let per6 =  this.personaLized[6]
       this.personaLized[3] = per5 
       this.personaLized[4] = per3
       this.personaLized[5] = per6
       this.personaLized[6] = per4
      }
    },
    // 热门菜单路由跳转
    hotListLink(item) {
      console.log(item);
    },
    // 播放
    playSongs(item,play) {
      this.$bus.$emit("playList", {item,play});
    },
  },
  mounted() {
    this.getRecommendMenu();
    this.getPersonaLized();
  },
};
</script>
<style lang="less" scoped>
.hotmenu {
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  h3 {
    font-weight: 400;
  }
  .hot-menu {
    display: flex;
    align-items: center;
    .hot-list {
      display: block;
      cursor: pointer;
    }
  }
}
.hotplaylist {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 20px 0px;
  min-height: 515px;
  li {
    .listmessage {
      color: #000;
      font-size: 14px;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      .u-icn {
        position: relative;
        top: -1px;
        margin-right: 3px;
        vertical-align: middle;
      }
      .u-icn-53 {
        width: 35px;
        height: 15px;
        background-position: -31px -658px;
      }
    }
    margin-bottom: 40px;
  }
  .u-cover {
    position: relative;
    width: 140px;
    height: 140px;
    overflow: hidden;
    .hotplaylist-mask {
      display: block;
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      width: 140px;
      height: 140px;
    }

    .hotplaylist-bottom {
      display: flex;
      //   justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      height: 27px;
      background-position: 0 -537px;
      color: #ccc;
      .icon-header {
        width: 14px;
        height: 11px;
        background-position: 0 -24px;
        margin: 10px 5px 9px 10px;
      }
      .icon-play {
        position: absolute;
        right: 10px;
        bottom: 5px;
        width: 16px;
        height: 17px;
        background-position: 0 0;
        &:hover {
          background-position: 0 -60px;
        }
      }
    }
  }
  .hotplaylist-mask,
  .hotplaylist-bottom {
    background: url("~@/assets/image/coverall.png") no-repeat;
  }
  .icon-header,
  .icon-play {
    display: inline-block;
    background: url("~@/assets/image/iconall.png") no-repeat;
  }
  .u-icn {
    display: inline-block;
    background: url("~@/assets/image/icon.png") no-repeat;
  }
}
</style>