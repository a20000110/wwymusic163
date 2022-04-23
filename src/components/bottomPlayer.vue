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
      :lrc-type="1"
      :audio="audio"
      theme="#fff7d0"
      :lrc="audio.lrc"
      ref="aplayer"
      :listFolded="true"
      @playing="onPlaying"
      @pause="onPause"
      @listShow="onListShow"
      @listSwitch="onListSwitch"
    ></a-player>
  </div>
</template>

<script>
import debounce from "lodash/debounce.js";
export default {
  name: "BottomPlayer",
  data() {
    return {
      // 播放列表
      trackList: [],
      // 播放列表单曲ID
      songsList: "",
      // 歌词
      lyricList: "",
      audio: [],
      isPlay: false,
      // 保存电台节目的封面
      djInfo: {},
      // 页面切换歌曲的定时器
      switchTimer: null,
    };
  },
  computed: {},
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
    // 上一曲
    lastSong() {
      this.$refs.aplayer.skipBack();
    },
    // 播放暂停
    playMusic() {
      this.$refs.aplayer.toggle();
      this.isPlay = !this.isPlay;
    },
    // 下一曲
    nextSong() {
      this.$refs.aplayer.skipForward();
    },
    // 当播放器暂停时触发
    onPause() {
      this.isPlay = false;
      document.title = "music163wyy";
    },
    // 当播放器播放时触发
    onPlaying(e) {
      this.isPlay = true;
      document.title = "▶  " + this.$refs.aplayer.currentMusic.name;
    },
    // 播放列表显示时触发获取歌词
    onListShow() {
      console.log(this.$refs.aplayer.currentMusic.id);
    },
    // 切换播放音频时触发
    onListSwitch(e) {
      this.switchPlay(e.id);
    },
    // 初始化播放器
    initPlay() {
      this.audio = [];
      this.trackList = [];
      this.songsList = "";
      this.lyricList = "";
    },
    // 播放列表
    playList: debounce(async function ({ item, play }) {
      let playId = "";
      let flag = "";
      // 判断类型 歌单（0） 电台节目(1)
      if (item.type == 0) {
        // play代表用户主动点击页面上的一些播放按钮
        // 每次获取新的歌单时都需要清空这些播放列表
        this.initPlay();
        const result = await this.$API.singer.reqPlayList({ id: item.id });
        if (result.code == 200) {
          this.trackList = result.playlist.tracks.map((item) => {
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
          this.trackList.forEach((item, index) => {
            item.commentThreadId = result.playlist.commentThreadId;
            item.privilege = result.privileges[index];
          });
          playId = this.trackList[0].id;
        }
      } else if (item.type == 1) {
        this.djInfo = {
          picUrl: item.picUrl,
          name: item.name,
        };
        const result = await this.$API.singer.reqDjDetail({ id: item.id });
        // 因为电台只有一首所以直接Push 要先判断是否存在
        // flag判断当前是否已经存在该歌曲
        playId = result.program.mainSong.id;
        if (result.code == 200) {
          flag = this.trackList.some(
            (item) => item.id == result.program.mainSong.id
          );
          if (!flag) {
            Object.assign(result.program.mainSong.album, this.djInfo);
            this.trackList.push(result.program.mainSong);
          }
        }
      }
      localStorage.setItem("track-queue", JSON.stringify(this.trackList));
      this.getTrackList();
      this.getMusicUrl(this.songsList, playId);
      playId = "";
      flag = "";
    }, 300),
    // 切换播放以及获取歌词
    async switchPlay(id, from) {
      // from表示来自哪个函数调用
      // 获取歌词

      const result = await this.$API.singer.reqLyric(id);

      this.audio.some((item, index) => {
        if (item.id == id) {
          item.lrc = result.lrc.lyric;
          console.log(item.lrc);
          // 切换播放根据ID获取传递下标
          //在页面上切换歌曲无法播放 播放器组件的原因，没有找到解决办法，最后只能设定一个定时器来解决，

          if (from) {
            this.$nextTick(() => {
              this.switchTimer = setTimeout(() => {
                this.$refs.aplayer.switch(index);
                this.$refs.aplayer.play();
                clearTimeout(this.switchTimer);
                this.switchTimer = null;
              }, 100);
            });
          } else {
            return;
          }
        }
      });
    },
    // 获取播放列表
    getTrackList() {
      this.songsList = "";
      let list = JSON.parse(localStorage.getItem("track-queue"));
      this.trackList = list || [];
      if (this.trackList) {
        this.trackList.forEach((item) => {
          this.songsList += item.id + ",";
        });
        let strIndex = this.songsList.indexOf(",", this.songsList.length - 1);
        this.songsList = this.songsList.slice(0, strIndex);
      }
    },
    // 获取音乐URL
    async getMusicUrl(id, playId) {
      const result = await this.$API.singer.reqMusicUrl(id);
      if (result.code == 200) {
        // 这里需要清空播放列表重新赋值，才能更新播放器的数据
        this.audio = [];
        // 获取歌手，歌名，海报等信息
        this.trackList.forEach((item, index) => {
          this.audio.push({
            name: item.name,
            artist: item.artists[0].name,
            cover: item.album.picUrl + "?param=34y34",
            id: item.id,
            // lrc: "",
          });
        });
        result.data.forEach((item) => {
          this.audio.forEach((lis) => {
            if (item.id == lis.id) {
              lis.url = item.url;
            }
          });
        });

        playId
          ? this.switchPlay(playId, "getMusicUrl")
          : this.switchPlay(this.$refs.aplayer.currentMusic.id); //初始化当前播放的歌曲获取歌词
      }
    },
  },
  mounted() {
    // 绑定window方法
    window.addEventListener("keyup", this.songkeyUp);
    // 获取播放列表
    this.getTrackList();
    this.getMusicUrl(this.songsList);
    // 全局事件播放事件
    this.$bus.$on("playList", (item) => {
      this.playList(item);
    });
  },
  destroyed() {
    window.removeEventListener("keyup", this.songkeyUp);
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
      position: absolute !important;
      top: -250px !important;
      background: #fff !important;
      width: 100% !important;
      height: 250px !important;
      text-align: center !important;
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
// 隐藏播放器通知
.aplayer-notice {
  display: none !important;
}
// 歌词
.aplayer-lrc-contents {
  padding-top: 20px;
}
</style>