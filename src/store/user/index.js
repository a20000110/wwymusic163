import api from "@/api"
import { setToken, setCookies, setAccount, setBindings,getToken,getCookies,getAccount,getBindings } from "@/utils/auth";
const state = {
    user: {
        token: '',
        account: {},
        profile: {},
        bindings: {},
        cookie: '',
        loginType: ''
    }
};
const actions = {
    // 登录
    async getUserInfo({ commit }, data) {
        const result = await api.user.reqLoginAuth(data);
        // const result = {
        //     code: 200,
        //     token: 100,
        //     cookie: 'asda12',
        //     acc: {
        //         name: 1
        //     },
        //     bin: [{
        //         name: '张三'
        //     }]
        // }
        console.log(result, 'getuserinfo');
        if (result.code == 200) {
            commit('SET_USERINFOR', result)
            return true
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
};
const mutations = {
    SET_USERINFOR: (state, result) => {
        state.user = result
        setToken(result.token)
        setCookies(result.cookie)
        setAccount(result.acc)
        setBindings(result.bin)
        console.log(getToken());
        console.log(getCookies());
        console.log(getAccount());
        console.log(getBindings());
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
