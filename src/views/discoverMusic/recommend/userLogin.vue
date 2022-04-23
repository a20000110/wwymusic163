<template>
  <div class="userlogin">
    <span>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</span>
    <a @click="userLogin" class="login">用户登录</a>
  </div>
</template>

<script>
export default {
  name: "UserLogin",
  methods:{
    // 打开登录框
    userLogin(){
      this.$bus.$emit('openLogin')
    }
  }
};
</script>

<style lang="less">
.userlogin {
  padding: 20px;
  width: 250px;
  height: 126px;
  font-size: 12px;
  background: url("~@/assets/image/index.png") no-repeat 0 9999px;
  background-position: 0 0;
  span {
    width: 205px;
    margin: 0 auto;
    padding: 16px 0;
    color: #666;
    line-height: 22px;
  }
}
</style>
<style lang="less" scoped>
.login {
  margin: 10px auto;
  display: block;
  width: 100px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  color: #fff;
  text-shadow: 0 1px 0 #8a060b;
  background: url("~@/assets/image/index.png") no-repeat 0 9999px;
  background-position: 0 -195px;
  &:hover{
  background-position: -110px -195px;
  }
}
</style>