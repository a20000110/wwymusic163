import api from '@/api'
const state = {
  searchData:{}
};
const actions = {
    async search({commit},keywords){
        const result = await api.search.reqSearchProp(keywords)
        if(result.code==200){
            commit('SET_SEARCHDATA',result.result)
        }else{
            return Promise.reject(new Error('filde'))
        }
    }
};
const mutations = {
    SET_SEARCHDATA:(state,data)=>{
        state.searchData = data||{}
    }
};
const getters = {
    getSongs(state){
        return state.searchData.songs||[]
    },
    getArtists(state){
        return state.searchData.artists ||[]
    },
    getAlbums(state){
        return state.searchData.albums ||[]
    },
    getPlayLists(state){
        return state.searchData.playlists ||[]
    },
   
};
export default {
    state,
    mutations,
    actions,
    getters,
};
