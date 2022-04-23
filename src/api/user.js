import request from "./request";
// 发送验证码
export const reqSendAuth = (params) => request({ url: '/captcha/sent', params })
// 校验验证码 (传递手机号，验证码)
export const reqAuthCode = (params) => request({ url: '/captcha/verify', params })
// 登录校验
export const reqLoginAuth = (data) => request({ url: '/login/cellphone', data, method: 'post' })
// 登录时校验，手机号是否已注册
export const reqIsPhone = (phone) => request({ url: `/cellphone/existence/check?phone=${phone}`, method: 'get' })
// 注册(修改密码)

// 二维码key生成
export const reqQRKey = ()=>request({url:`/login/qr/key`,method:'get'})

// 二维码生成接口
export const reqQRUrl=(key)=>request({url:`/login/qr/create?key=${key}&timerstamp=${Date.now()}`})
// 二维码轮询是否失效||是否已扫码
export const reqQRCheck=(key)=>request({url:`/login/qr/check?key=${key}&timerstamp=${Date.now()}`})


