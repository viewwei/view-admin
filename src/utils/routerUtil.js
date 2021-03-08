// 路由方法
import store from "@/store/index"
const computedRouting =(path) =>{
    let rules = []
    getRouter(rules,store.state.router.systemRouters,path)
    return rules
}
function getRouter(saveAddress,routes,targetPath){
    for(let index=0;index<routes.length;index++){
        let route = routes[index]
        const {path,children} = route
        if (path == targetPath){
            saveAddress.push(route)
            return true
        }
         if (Object.prototype.toString.call(children) =="[object Array]"){
            saveAddress.push(route)
           let result =  getRouter(saveAddress,children,targetPath)
           if (!result){
               saveAddress.pop()
           }else{
               return true
           }
        }
    }
    return false
}

export {computedRouting}