import request from './request'
// 获取 banner  type=0  PC
export const reqBanner = ()=>request({url:'/banner?type=0'})
// 获取 推荐-热门推荐 歌单列表
export const reqPersonaLized = (data) => request({ url: '/personalized',params:data, method: 'get' })
// 获取 推荐-热门推荐 菜单
export const reqHotMenu = () => request({ url: '/playlist/hot', method: 'get' })
// 获取 推荐-热门推荐 电台节目
export const reqDjProgram = () => request({ url: '/personalized/djprogram' })
// 获取 推荐-新碟上架(数字专辑-新碟上架)
export const reqAlBum = (data={}) => request({ url: `/album/list`,params:data})
// 获取推荐-榜单 (推荐新音乐)
export const reqSRanking = (data={}) => request({ url: `/personalized/newsong`,params:data })
