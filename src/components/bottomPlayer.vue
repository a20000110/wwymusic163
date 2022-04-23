<template>
  <div id="play-box">
    <!-- -->
    <span class="pauseSwitch">
      <span
        class="iconfont wyy-shangyiqu"
        @click="lastSong"
        title="上一曲(Ctrl+←)"
      ></span>
      <span
        class="iconfont"
        @click="playMusic"
        :class="{ 'wyy-zanting': isPlay, ' wyy-bofang': !isPlay }"
        title="播放/暂停(p)"
      ></span>
      <span
        class="iconfont wyy-xiayiqu"
        @click="nextSong"
        title="下一曲(Ctrl+→)"
      ></span>
    </span>
    <a-player
      :audio="audio"
      theme="#fff7d0"
      :lrc="audio.lrc"
       :lrc-type="1"
      ref="aplayer"
    ></a-player>
  </div>
</template>

<script>
export default {
  name: "BottomPlayer",
  data() {
    return {
      // 保存歌单信息
      playListData: [],
      // 播放列表
      trackList: [],
      // 播放列表单曲ID
      songsList: "",
      // 歌词
      lyricList: [],
      audio: [],
      isPlay: false,
    };
  },
  methods: {
    // 快捷键
    songkeyUp(e) {
      let e1 =
        e || event || window.event || arguments.callee.caller.arguments[0];
      if (e1 && e1.ctrlKey && e1.keyCode == 37) {
        this.lastSong();
      } else if (e1 && e1.ctrlKey && e1.keyCode == 39) {
        this.nextSong();
      } else if (e1 && e1.keyCode == 80) {
        this.playMusic();
      }
    },
    // 播放列表
    async playList(item) {
      const result = await this.$API.singer.reqPlayList({ id: item.id });
      if (result.code == 200) {
        this.playListData = result.playlist.tracks.map((item) => {
          return {
            album: item.al,
            alias: item.alia,
            artists: item.ar,
            cd: item.cd,
            mvid: item.mv,
            name: item.name,
            version: item.v,
            rtUrls: item.rtUrls,
            rtUrl: item.rtUrl,
            copyrightId: item.cp,
            duration: item.dt,
            fee: item.fee,
            ftype: item.ftype,
            id: item.id,
            mst: item.mst,
            position: item.no,
            pstatus: item.pst,
            // privilege:result.privilege,
            // commentThreadId:result.playlist.commentThreadId,
            ringtone: item.rt,
            score: item.pop,
            songtype: item.st,
          };
        });
        this.playListData.forEach((item, index) => {
          item.commentThreadId = result.playlist.commentThreadId;
          item.privilege = result.privileges[index];
        });
        localStorage.setItem("track-queue", JSON.stringify(this.playListData));
      }
    },
    // 上一曲
    lastSong() {
      this.$refs.aplayer.skipBack();
    },
    // 播放暂停
    playMusic() {
      this.$refs.aplayer.toggle();
      this.isPlay = !this.isPlay;
      let palyMusicId = this.$refs.aplayer.currentMusic
      console.log(palyMusicId);
    },
    // 下一曲
    nextSong() {
      this.$refs.aplayer.skipForward();
    },
    // 获取播放列表
    getTrackList() {
      this.trackList = JSON.parse(localStorage.getItem("track-queue"));
      if (this.trackList) {
        this.trackList.forEach((item) => {
          this.songsList += item.id + ",";
        });
        let strIndex = this.songsList.indexOf(",", this.songsList.length - 1);
        this.songsList = this.songsList.slice(0, strIndex);
        this.getMusicUrl(this.songsList);
      } else {
        return false;
      }
    },
    // 获取音乐URL
    async getMusicUrl(id) {
      const result = await this.$API.singer.reqMusicUrl(id);
      if (result.code == 200) {
        this.audio = result.data.map((item) => {
          return {
            id: item.id,
            url: item.url,
            lrc: "",
            type: item.type,
          };
        });
        // 获取歌手，歌名，海报等信息
        this.trackList.forEach((item, index) => {
          this.audio.forEach((lis) => {
            if (item.id == lis.id) {
              lis.name = item.name;
              lis.artist = item.artists[0].name;
              lis.cover = item.album.picUrl + "?param=34y34";
            } else {
              return false;
            }
          });
        });
      }
    },
  },
  mounted() {
    // 绑定window方法
    window.addEventListener("keyup", this.songkeyUp);
    // 获取播放列表
    this.getTrackList();
    // 全局事件播放事件
    this.$bus.$on("playList", (item) => {
      this.playList(item);
    });
  },
  destroyed() {
    window.removeEventListener("keyup", this.songkeyUp);
    this.$bus.$off("playList");
  },
};
</script>
<style lang="less" scope>
// 播放器
#play-box {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 980px;
  margin: auto;
  display: flex;
  justify-content: center;
}
.aplayer {
  margin: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  overflow: inherit !important;
  .aplayer-body {
    display: flex;
    justify-content: center;
    margin: auto;
    position: relative;
  }
  // 头像
  .aplayer-pic {
    height: 40px !important;
    width: 40px !important;
    margin-top: 7px;
  }
  .aplayer-info {
    padding: 0 !important;
    height: 55px !important;
    margin-left: 10px !important;
    width: 580px;
    border-bottom: 0 !important;
    .aplayer-controller {
      justify-content: center;
      .aplayer-volume-wrap:hover .aplayer-volume-bar-wrap {
        height: 80px !important;
        background: #000 !important;
      }
      .aplayer-volume-bar {
        height: 95% !important;
        .aplayer-volume {
          background-color: #b90b0b !important;
        }
      }
      .aplayer-bar {
        height: 5px !important;
        background: #535353 !important;
        border-radius: 5px;
      }
    }
    .aplayer-music {
      margin: 5px 0 5px 5px !important;
    }
    // 歌词
    .aplayer-lrc {
    position: absolute!important;
    top: -250px!important;
    background: #fff!important;
    width: 100%!important;
    height: 250px!important;
    text-align: center!important;
    overflow: hidden;
}
  }
  .aplayer-title {
    color: #fff !important;
  }
  .aplayer-author {
    color: #9b9b9b !important;
  }
  // 已播放进度条
  .aplayer-played {
    background-color: #b90b0b !important;
    height: 5px !important;
    border-radius: 5px 0 0 5px;
  }
  // 自带播放按钮
  .aplayer-play,
  .aplayer-button {
    display: none;
  }
  // 全部进度条
  .aplayer-loaded {
    height: 5px !important;
    background-color: #535353 !important;
    border-radius: 5px;
  }
  // 进度条圆点
  .aplayer-thumb {
    margin-top: -5px !important;
    margin-right: -10px !important;
    height: 15px !important;
    width: 15px !important;
    transform: scale(1) !important;
    background: #fff !important;
  }
}
.pauseSwitch {
  z-index: 9;
  position: absolute;
  left: 0;
  top: 8px;
  display: flex;
  align-items: center;
  .wyy-shangyiqu,
  .wyy-xiayiqu {
    cursor: pointer;
    font-size: 28px;
    color: #a3a3a3;
    &:hover {
      color: #f1f1f1;
    }
  }
  .wyy-bofang,
  .wyy-zanting {
    cursor: pointer;
    margin: 0 10px;
    font-size: 36px;
    color: #ececec;
    &:hover {
      // opacity: 0.7;
      color: #fff;
    }
  }
}
// 歌曲列表
ol.aplayer-list {
  position: absolute;
  top: -250px;
  background: #1c1919;
  color: #aaa;
  li {
    &:hover {
      background: #000 !important;
    }
  }
}
.aplayer .aplayer-list li.aplayer-list-light {
  background: #000 !important;
  color: #fff;
}

</style>