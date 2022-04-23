<template>
  <div class="w">
    <div class="comfooter">
      <ul class="comfooter-box">
        <li v-for="(item,index) in footermenu" :key="index">
          <a>{{item}}</a>
          <span class="line">|</span>
        </li>
      </ul>
      <p class="comfooter-msg">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
      <p class="comfooter-msg">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX<i class="police"></i> XXXXXXXXXXXXXXXXXXXXX</p>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "ComFooter",
  data(){
    return{
      footermenu:['服务条款','隐私政策','儿童隐私','政策版权','投诉指引','联系我们','广告合作','廉正举报'],
       
    }
  },
  methods:{
  }
};
</script>

<style lang="less" scoped>
.w {
  background: transparent;
  border: none;
}
.comfooter {
  padding: 10px 5px 50px;
  .comfooter-box {
    display: flex;
    li {
      line-height: 24px;
      display: flex;
      align-items: center;
      a {
        color: #999;
      }
    }
  }
  .comfooter-msg{
    font-size: 12px;
    color: #666;
    margin-bottom: 3px;
    .police{
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("~@/views/discoverMusic/recommend/img/police.png") no-repeat;
      background-size: 100%;
      position: relative;
      top: 2px;
    }
  }
}
.line {
  margin: -3px 2px 0 4px;
  color: #c2c2c2;
  font-size: 12px;
}
</style>