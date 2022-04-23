import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import home from "./home";
import user from "./user"
import singer from "./singer";
// 对外暴露store类的一个实例
export default new Vuex.Store({
    // 实现
    modules: {
        home,
        user,
        singer,
    }
});
