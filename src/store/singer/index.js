// /top/artists?offset=0&limit=5
import api from "@/api"
const state = {
    // 入驻歌手
    artists:[],
    // 热门主播
    host:[]
};
const actions = {
   async getSingerAndDj({commit},params){
    const result = await api.singer.reqSingerAndDj(params)
    if(result.code==200){
        commit('SET_SINGERANDDJ',result)
    }else{
      return Promise.reject(new Error("faile"));
    }
},
async getHost({commit},limit){
    // console.log(limit)
    const result = await api.singer.reqHotDj(limit)
    // console.log(result);
    if(result.code==200){
        commit('SET_HOST',result)
    }else{
      return Promise.reject(new Error("faile"));
    }
}
};
const mutations = {
    SET_SINGERANDDJ(state,result){
        state.artists = result.artists||[]
    },
    SET_HOST(state,result){
        state.host = result.data.list||[]
        // console.log(state.host);
    }
};
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters,
};
