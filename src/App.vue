<template>
  <div id="app" class="app">
    <Main />
    <el-backtop
      target=".app"
      :visibilityHeight="200"
      :right="110"
      :bottom="100"
    ></el-backtop>
  </div>
</template>

<script>
import Main from "@/layout/main";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style lang="less">
@import url("//at.alicdn.com/t/font_3346479_fnm0s1lnkw.css");
#app {
  height: 100vh;
  overflow-x: hidden;
}
.el-icon-caret-top:before {
  color: #c20c0c;
}

</style>
