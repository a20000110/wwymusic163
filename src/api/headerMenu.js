
import request from './request'

export const reqHeaderMenu = () => request({ url: '/playlist/catlist', method: 'get' })