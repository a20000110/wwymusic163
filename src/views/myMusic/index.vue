<template>
  <div class="mymusic">
    <div class="w">
      <!-- 未登录显示 -->
      <div>
        <el-empty
          description="登录网易云音乐，查看并管理你收藏的私房音乐，方便地随时随地收听"
        >
          <el-button type="primary" @click="login"
            >立即登录</el-button
          ></el-empty
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMusic",
  methods: {
    login() {
      this.$bus.$emit("openLogin");
    },
  },
};
</script>

<style lang="less" scoped>
.mymusic {
  height: 700px;
  .w {
    height: 100%;
  }
}
</style>