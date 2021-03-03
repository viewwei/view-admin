import router from './router/index'
import store from './store/index'
import { isLogin } from '@/utils/user'
const whiteRoutes = ['/login']
router.beforeEach(async (to, from, next) => {
  const loginResult = isLogin()
  if (loginResult) {
    // 代表已经登录
    if (to.path === '/login') {
      // 如果是登录界面直接跳转到首页
      next('/')
    } else {
      if (store.state.router.systemRouters.length > 0) {
        // 代表已经添加动态路由

        await store.dispatch('router/setCurrentRouter', to.path)
        next()
      } else {
        const roles = await store.dispatch('login/getRoles')
        const accessRouters = await store.dispatch('router/getRouter', roles)
        router.addRoutes(accessRouters)
        next({ ...to, replace: true })
      }
      // 需要动态路由
    }
  } else {
    // 处理尚未登录的情况
    // 判断当前路由是否是白名单路由，如果是白名单，则直接登录
    const isExist = whiteRoutes.includes(to.path)
    if (isExist) {
      // 白名单，直接登录
      next()
    } else {
      // 不是白名单，说明是权限路由，跳转到登录界面
      next(`/login?redirect=${to.path}`)
    }
  }
})
