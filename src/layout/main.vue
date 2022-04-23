<template>
  <!-- 渲染红条导航栏 -->
  <div>
    <el-container>
      <el-header class="header">
        <div class="top-box">
          <div class="header-top">
            <h1 class="logo">
              <a href="JavaScript:;"></a>
            </h1>
            <!-- 黑色背景菜单 -->
            <div class="nav-box" v-for="item in routes" :key="item.path">
              <router-link
                active-class="active"
                class="nav-menu-link"
                :to="item.path"
                ><em>{{ item.meta.title }}</em> <sub class="cor"></sub>
              </router-link>
              <div
                class="bottom-box"
                v-if="item.meta.title == '发现音乐'"
                ref="btmbox"
              >
                <router-link
                  :to="sub.path"
                  class="subMenu"
                  active-class="subactive"
                  v-for="sub in item.children"
                  :key="sub.path"
                  :ref="`${sub.name}`"
                  >{{ sub.meta.title }}</router-link
                >
              </div>
            </div>
            <el-badge :value="'HOT'" class="hot"> </el-badge>
            <!-- 搜索框 -->
            <div class="searchbox">
              <el-input
                v-model.trim="keyword"
                class="search"
                placeholder="音乐/视频/电台/用户"
                @input="search"
                @focus="searchFocus"
                @blur="searchBlur"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i
              ></el-input>
              <Search :keyword="keyword" ref="searchPropBox"></Search>
            </div>
            <!-- 创作者中心 -->
            <div calss="creatorCenter" style="margin-left: 15px">
              <el-button
                round
                class="creatorCenter-btn"
                style="
                  padding: 0 5px;
                  width: 90px;
                  height: 32px;
                  background-color: transparent;
                "
                >创作者中心</el-button
              >
            </div>
            <!-- 登录 -->
            <span class="login" @click="openLogin">登录</span>
          </div>
        </div>
        <div class="header-bottom"></div>
      </el-header>
      <div class="main">
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </div>
      <el-footer>
        <com-footer></com-footer>
      </el-footer>
    </el-container>
    <User ref="user"></User>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import ComFooter from "../components/comFooter.vue";
import debounce from "lodash/debounce.js";
import User from "@/components/user.vue";
import Search from "@/components/search"
import BottomBar from "@/components/bottomBar.vue"
export default {
  components: { ComFooter, User,Search,BottomBar },
  name: "Main",
  data() {
    return {
      // active选中状态
      activeIndex: 0,
      //   搜索框
      keyword: "",
    };
  },
  computed: {
    // 计算路由 渲染路由
    routes() {
      const router = [];
      this.$router.options.routes.forEach((item) => {
        if (item.hidden) {
          return;
        }
        router.push(item);
      });
      return router;
    },
  },
  mounted() {},
  methods: {
    // 打开登录框
    openLogin() {
      this.$bus.$emit("openLogin");
    },
    // 搜索
    search: debounce(function () {
      this.$refs.searchPropBox.searching();
    }, 300),
    searchFocus() {
      this.$refs.searchPropBox.searchFocus();
    },
    searchBlur() {
      this.$refs.searchPropBox.searchBlur();
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(v1, v2) {
        //控制红色菜单  *
        if (this.$route.path.indexOf("/discovermusic") == -1) {
          this.$refs.btmbox[0].style.display = "none";
        } else {
          this.$refs.btmbox[0].style.display = "flex";
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  flex-direction: column;
  .top-box {
    width: 100%;
    background-color: #242424;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #000;
  }
  .header-bottom {
    width: 100%;
    background-color: #c20c0c;
    height: 35px;
    position: relative;
    z-index: 0;
  }
  .header-top {
    display: flex;
    width: 1100px;
    margin: 0 auto;
    position: relative;
    .logo {
      width: 176px;
      height: 69px;
      a {
        display: flex;
        width: 100%;
        height: 100%;
        background: url("~@/assets/image/topbar.png") no-repeat;
      }
    }
    .nav-box {
      display: flex;
      flex-direction: column;
      .bottom-box {
        display: flex;
        align-items: center;
        padding-left: 177px;
        height: 35px;
        line-height: 35px;
        background-color: #c20c0c;
        position: absolute;
        left: 0;
        bottom: -35px;
        z-index: 1;
        width: 1100px;
        .subMenu {
          height: 21px;
          border-radius: 20px;
          display: flex;
          line-height: 21px;
          padding: 0 10px;
          font-size: 12px;
          margin-left: 25px;
          color: #fff;
        }
        .subactive {
          background: #9b0909;
        }
      }
    }
    .nav-menu-link {
      display: flex;
      color: #ccc;
      height: 70px;
      padding: 0 19px;
      &:hover {
        color: #fff;
        background: #000;
      }
      em {
        font-size: 14px;
        line-height: 70px;
      }
    }

    .active {
      color: #fff;
      background: #000;
      position: relative;
      z-index: 0;
      .cor {
        display: block;
        position: absolute;
        left: 50%;
        top: 64px;
        width: 12px;
        height: 7px;
        margin-left: -6px;
        overflow: hidden;
        background: url("~@/assets/image/topbar.png") no-repeat 0 9999px;
        background-position: -226px 0;
      }
    }
    .hot /deep/.el-badge__content {
      background: #c20c0c;
      border: none;
    }
    // 搜索框
    .searchbox {
      position: relative;
      .search {
        width: 158px;
        margin-left: 50px;
        /deep/.el-input__inner {
          height: 32px;
          border-radius: 30px;
          font-size: 12px;
        }
        /deep/.el-input__icon {
          height: 70px;
        }
      }
     
    }

    .creatorCenter-btn {
      color: #ccc;
      border-color: #4f4f4f;
      font-size: 12px;
      transition: all 0.3s;
      &:hover {
        border-color: #fff;
      }
    }
    .login {
      font-size: 12px;
      color: #787878;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>

<style scoped lang="less">
/deep/.el-dialog {
  max-width: 550px;
}
/deep/.el-dialog__body {
  min-height: 350px;
}
/deep/.el-dialog__header {
  background: #2d2d2d;
  padding: 10px 20px 10px;
}
/deep/.el-dialog__headerbtn {
  top: 12px;
}
/deep/ span.el-dialog__title {
  color: #fff;
  font-size: 16px;
}
.el-header {
  text-align: center;
}
.el-header {
  color: #ccc;
  height: 105px !important;
  padding: 0;
  /* background-color: #242424; */
}
.el-footer {
  color: #333;
  background-color: #f2f2f2;
  border-top: 1px solid #d3d3d3;
}
.main {
  position: relative;
  width: 100%;
}
.el-main {
  background-color: #f2f2f2;
  color: #333;
  padding: 0;
  width: 100%;
  min-height: 700px;
  _height: 700px;
  margin: 0 auto;
  border-bottom: 1px solid #d3d3d3;
  border-width: 0 1px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
<style lang="less">
</style>
