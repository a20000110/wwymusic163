<template>
  <div class="hotnew">
    <div class="hotmenu">
      <span class="red-round"><span class="white-round"></span></span>
      <h3 class="hot-title">榜单</h3>
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
    <div class="hotlist">
      <el-table :data="rankingList10" :stripe="true" v-loading="loading">
        <el-table-column label="飙升榜">
          <div slot-scope="{ row, $index }" class="song-row">
            <span :class="{ 'no-top': $index < 3, no: $index >= 3 }">{{
              $index + 1
            }}</span>
            <a href="#" class="thide"> {{ row.name }}</a>
            <div class="oper">
              <a href="#" class="oper-play" title="播放"></a>
              <a href="#" class="oper-add" title="添加到播放队列"></a>
              <a href="#" class="oper-collection" title="收藏"></a>
            </div>
          </div>
        </el-table-column>
      </el-table>
      <el-table :data="rankingList20" :stripe="true" v-loading="loading">
        <el-table-column label="新歌榜">
          <div slot-scope="{ row, $index }" class="song-row">
            <span :class="{ 'no-top': $index < 3, no: $index >= 3 }">{{
              $index + 1
            }}</span>
            <a href="#" class="thide"> {{ row.name }}</a>
            <div class="oper">
              <a href="#" class="oper-play" title="播放"></a>
              <a href="#" class="oper-add" title="添加到播放队列"></a>
              <a href="#" class="oper-collection" title="收藏"></a>
            </div>
          </div>
        </el-table-column>
      </el-table>
      <el-table :data="rankingList30" :stripe="true" v-loading="loading">
        <el-table-column label="原创榜">
          <div slot-scope="{ row, $index }" class="song-row">
            <span :class="{ 'no-top': $index < 3, no: $index >= 3 }">{{
              $index + 1
            }}</span>
            <a href="#" class="thide"> {{ row.name }}</a>
            <div class="oper">
              <a href="#" class="oper-play" title="播放"></a>
              <a href="#" class="oper-add" title="添加到播放队列"></a>
              <a href="#" class="oper-collection" title="收藏"></a>
            </div>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotList",
  data() {
    return {
      loading: false,
      listData: [], //保存数据列表
      paramsData:{
        limit:30
      }
    };
  },
  methods: {
    //   榜单(推荐新音乐)
    async rankingList() {
      this.loading = true;
      const result = await this.$API.recommend.reqSRanking(this.paramsData);
      if (result.code == 200) {
        this.loading = false;
        this.listData = Object.freeze(result.result);
      }
    },
  },
  computed: {
    //  获取歌单的前10，20，30首
    rankingList10() {
      return this.listData.slice(0, 10);
    },
    rankingList20() {
      return this.listData.slice(10, 20);
    },
    rankingList30() {
      return this.listData.slice(20, 30);
    },
  },
  created() {
    this.rankingList();
  },
};
</script>

<style lang="less" scoped>
.hotlist {
  min-height: 400px;
  width: 100%;
  margin-top: 20px;
  padding-left: 1px;
  display: flex;
  .no-top,
  .no {
    font-size: 16px;
    display: inline-block;
    width: 35px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
  .no-top {
    color: #c10c0c;
  }
  .no {
    color: #666;
  }
  .song-row {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .thide {
      color: #000;
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      &:hover {
        text-decoration: underline;
      }
    }
    &:hover .oper {
      opacity: 1;
    }
    &:hover a.thide {
      width: 40%;
    }
    .oper {
      display: flex;
      opacity: 0;
      width: 80px;
      height: 20px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      .oper-play,
      .oper-collection {
        background: url("~@/assets/image/index.png");
        width: 17px;
        height: 17px;
        margin-right: 10px;
        &:hover {
          opacity: 0.5;
        }
      }
      .oper-play {
        background-position: -267px -268px;
      }
      .oper-add {
        width: 17px;
        height: 17px;
        margin-right: 10px;
        background: url("~@/assets/image/icon.png");
        background-position: 0 -700px;
        margin: 2px 6px 0 0;
        &:hover {
          opacity: 0.5;
        }
      }
      .oper-collection {
        background-position: -297px -268px;
      }
    }
  }
}
/deep/.el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
  background: #e8e8e8;
}
/deep/.el-table tr {
  background-color: #f4f4f4;
}
/deep/.el-table .el-table__cell {
  padding: 8px 0;
}
/deep/.cell {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
/deep/.el-table th.el-table__cell.is-leaf{
  text-align: center;
}
</style>