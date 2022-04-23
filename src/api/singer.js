// 获取歌手
import request from "./request";
// 获取歌手
export const reqSingerAndDj = (params)=>request({url:'/top/artists',params})
// 获取热门主播
export const reqHotDj = (limit)=>request({url:'/dj/toplist/popular',params:limit})
// 获取歌单所有歌曲
export const reqTrack=(id)=>request({url:`/playlist/track/all?id=${id}&limit=10&offset=1`})
// 获取歌单详情
export const reqPlayList = (params)=>request({url:'/playlist/detail',params})
// 获取音乐url
export const reqMusicUrl = (musicId)=>request({url:`/song/url?id=${musicId}`})
// 获取歌词
export const reqLyric = (id)=>request({url:'/lyric',params:id})
// 获取歌曲详情
export const reqSongDetail = (id)=>request({url:'/song/detail',params:{ids:id}})