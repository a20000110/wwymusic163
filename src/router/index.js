import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace
// 重写push|replacec
// 第一个参数：告诉原来Push方法，你往那里跳转，（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数: 失败回调
//call|apply区别：相同点，都可以调用函数一次，都可以篡改函数的this指向
// 不同点Lcall与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
}
export const constantRoutes = [
    {
        path: "*",
        redirect: { name: 'DiscoverMusic' },
        hidden: true
    },
    {
        path: '/discovermusic',
        name: 'DiscoverMusic',
        redirect: { name: 'Recommend' },
        component: () => import('@/views/discoverMusic'),
        meta: { title: "发现音乐" },
        children: [{
            path: 'recommend',
            name: 'Recommend',
            component: () => import('@/views/discoverMusic/recommend'),
            meta: { title: "推荐" }
        }, {
            path: 'rankinglist',
            name: 'RankingList',
            component: () => import('@/views/discoverMusic/rankingList'),
            meta: { title: "排行榜" }
        }, {
            path: 'songsheet',
            name: 'SongSheet',
            component: () => import('@/views/discoverMusic/songSheet'),
            meta: { title: "歌单" }
        }, {
            path: 'anchorStation',
            name: 'AnchorStation',
            component: () => import('@/views/discoverMusic/anchorStation'),
            meta: { title: "主播电台" }
        }, {
            path: 'singer',
            name: 'Singer',
            component: () => import('@/views/discoverMusic/singer'),
            meta: { title: "歌手" }
        }, {
            path: 'newShelf',
            name: 'NewShelf',
            component: () => import('@/views/discoverMusic/newShelf'),
            meta: { title: "新碟上架" }
        }]
    },
    {
        path: '/mymusic',
        name: 'MyMusic',
        component: () => import('@/views/myMusic'),
        meta: { title: "我的音乐" },
    },
    {
        path: '/follow',
        name: 'Follow',
        component: () => import('@/views/follow'),
        meta: { title: "关注" }
    },
    {
        path: '/mall',
        name: 'Mall',
        component: () => import('@/views/mall'),
        meta: { title: '商城' }
    },
    {
        path: '/musician',
        name: 'Musician',
        component: () => import('@/views/musician'),
        meta: { title: '音乐人' }
    },
    {
        path: '/downclient',
        name: 'DownClient',
        component: () => import('@/views/downClient'),
        meta: { title: '下载客户端' }
    },

]

const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
// 重置路由
export function resetRouter(params) {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
    params && router.addRoutes(params)
}
export default router
