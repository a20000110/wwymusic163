import Cookies from "js-cookie";
// 保存token
export const getToken = () => {
    return JSON.parse(Cookies.get('MUSIC_U_TOKEN'))
}
export const setToken = (token) => {
    let millisecond = new Date().getTime();
    let expiresTime = new Date(millisecond + 60 * 1000 * 10);
    Cookies.set("MUSIC_U_TOKEN", token, { expires: expiresTime });
}
export const removeToken = () => {
    Cookies.remove('MUSIC_U_TOKEN')
}
// 保存cookie
export const getCookies = () => {
    return JSON.parse(localStorage.get('MUSIC_U_CRFS'))
}
export const setCookies = (cookie) => {
    let cookies = encodeURIComponent(cookie)
    localStorage.set('MUSIC_U_CRFS', cookies)
}
export const removeCookies = () => {
    localStorage.remove('MUSIC_U_CRFS')
}
// 保存账号信息
export const getAccount = () => {
    return JSON.parse(localStorage.get('MUSIC_U_ACCOUNT'))
}
export const setAccount = (account) => {
    localStorage.set('MUSIC_U_ACCOUNT', JSON.stringify(account))
}
export const removeAccount = () => {
    localStorage.remove('MUSIC_U_ACCOUNT')
}
// 保存配置文件信息
export const getProfile = () => {
    return JSON.parse(localStorage.get('MUSIC_U_PROFILE'))
}
export const setProfile = (profile) => {
    localStorage.set('MUSIC_U_PROFILE', JSON.stringify(profile))
}
export const removeProfile = () => {
    localStorage.remove('MUSIC_U_PROFILE')
}
// 保存bindings
export const getBindings = () => {
    return JSON.parse(localStorage.get('MUSIC_U_BINDINGS'))
}
export const setBindings = (bindings) => {
    localStorage.set('MUSIC_U_BINDINGS', JSON.stringify(bindings))
}
export const removeBindings = () => {
    localStorage.remove('MUSIC_U_BINDINGS')
}