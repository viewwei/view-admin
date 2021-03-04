#### VUX状态状态
本框架实行 vuex 来管理数据数据贡献状态.
- 如何使用 vuex 管理使用
在新建一个业务中,如果需要使用 vuex 来贡献数据,那么需要在@/src/store/module 文件下创建一个 store对象.格式参考以下格式
```
const state = {
    isLogin :true
}
const mutations = {}
const actions = {
   
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
```
当创建好了这个文件,不需要要重新导入,框架会自动加载到 vuex 中.actions 的方法表示与 vue 文件沟通的,store 的状态则是通过 mutations 来控制的,在 action 中通过 commit 方式和 mutations 进行通信.actions 属于异步通信.
 - 使用实例
 1. 获取 module 的 state 值
 ```
  this.$store.state.test.a
  ```
  表示获取 modules 文件下 test.js 的状态
  2. actions 使用
  ```
  this.$store.dispatch('test/getUserInfor')
  ```
  表示获取 module 文件下 actions 中的 UserInfor 方法
    