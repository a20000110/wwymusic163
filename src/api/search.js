import request from "./request";
// 搜索建议
export const reqSearchProp = (keywords)=>request({url:'/search/suggest?type=web',params:{keywords}})
