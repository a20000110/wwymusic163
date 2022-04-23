<template>
  <div class="singerAndDj">
    <div class="singer">
      <div class="singer-header">
        <span>入驻歌手</span>
        <a href="#">查看全部></a>
      </div>
      <a class="singer-msg" v-for="item in getSingerAndDj" :key="item.id">
        <img v-lazy="item.picUrl+'?param=60x60'" />
        <span class="singer-info">
          <span class="singer-name">{{ item.name }}</span>
          <span class="singer-tag">{{ item.alias[0] }}</span>
        </span>
      </a>
      <el-button plain size="mini">申请成为网易音乐人</el-button>
    </div>
    <div class="singer">
      <div class="singer-header">
        <span>热门主播</span>
      </div>
      <a class="singer-msg" v-for="item in getHostList" :key="item.id">
        <img v-lazy="item.avatarUrl+'?param=60x60'" />
        <span class="singer-info">
          <span class="singer-name">{{ item.nickName }}</span>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SingerAndDj",
  data() {
    return {
      sendData: {
        offset: 0,
        limit: 5,
      },
    };
  },
  computed: {
    ...mapState({
      getSingerAndDj: (state) => state.singer.artists,
      getHostList: (state) => state.singer.host,
    }),
  },
  methods: {
    getData() {
      this.$store.dispatch("getSingerAndDj", this.sendData);
      let limit = { ...this.sendData };
      delete limit.offset;
      this.$store.dispatch("getHost", limit);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.singerAndDj {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  .singer {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .singer-header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      font-size: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
  }
  .singer-msg {
    margin-top: 10px;
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 60px;
      height: 60px;
    }
    .singer-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;
      background: #fafafa;
      border: 1px solid #ccc;
      border-left: none;
      .singer-name {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
    }
  }
}
</style>