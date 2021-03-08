const twaver = require("@/utils/twaver/twaver")
class TwaverPlugin {
    constructor() {
        this._twaver = twaver
        this._box = null
        this._network = null
        this.isInit = false
    }
    // 初始化环境
    initNetwork({ canvasDivId, data = {}, viewColor = "oldlace", selectColor = "#57ab9a" }) {
        const { x = 0, y = 0, width, height } = data
        // 初始化一次就不在初始化了
        // if (!this.isInit) {
            this.isInit = true
            this._box = new this._twaver.ElementBox()
            this._network = new this._twaver.vector.Network(this._box)
            this._network.getView().style.background = viewColor
            let targetDiv = document.getElementById(canvasDivId)
            if (!targetDiv) {
                // 节点不存在
                return false
            }
            let canvasWidth = targetDiv.clientWidth
            let canvasHeight = targetDiv.clientHeight
            targetDiv.appendChild(this._network.getView())
            let position = getComputedStyle(targetDiv, null).getPropertyValue("position")
            if (position != "relative" && position != "absolute") {
                targetDiv.setAttribute("style", "position:relative")
            }
            this._network.adjustBounds({
                x,
                y,
                width: width || canvasWidth,
                height: height || canvasHeight
            })
            this._twaver.Styles.setStyle('select.color', selectColor)
            return true
        // } else {
        //     return false
        // }
    }
    //单一节点的注册
    createSigleNode({ name = "", name2, loction, image, size }, belong) {
        var node = new this._twaver.Node()
        node.setName(name)
        if (name2) {
            node.setName2(name2)
        }
        if (loction) {
            const { x, y } = loction
            node.setLocation(x, y)
        }
        if (image) {
            node.setImage(image)
        }
        if (size) {
            const { width = 10, height = 10 } = size
            node.setWidth(width)
            node.setHeight(height)
        }
        let parent = belong || this._box
        parent && parent.add(node)
        return node
    }
    // 创建跟随节点
    createFollowNode({ name = "", name2, location, image, size }, hostNode, belong) {
        const node = new this._twaver.Follow()
        node.setName(name)
        name2 && Object.prototype.toString.call(image) == "[object String]" && node.setName2(name2)
        if (location) {
            if (Object.prototype.toString.call(location) == "[object Object]" &&
                location.hasOwnProperty('x') && location.hasOwnProperty('y')) {
                const { x, y } = location
                node.setLocation(x, y)
            } else {
                console.warn("you should check location params format")
            }
        }
        if (image) {
            if (Object.prototype.toString.call(image) == "[object String]") {
                node.setImage(image)
            } else {
                console.warn("you should check image params format")
            }
        }

        if (size) {
            if (Object.prototype.toString.call(size) == "[object Object]" &&
                size.hasOwnProperty('width') &&
                size.hasOwnProperty("height")) {
                const { width, height } = size
                node.setWidth(width)
                node.setHeight(height)
            } else {
                console.warn("you should check image size format")
            }
        }
        if (hostNode) {
            node.setHost(hostNode)
            node.isHostOn(true)
            node.isLoopedHostOn(true)
        }
        let parent = belong || this._box
        parent && parent.add(node)
        return node
    }
    // 创建基础连线
    createBaseLink(fromNode, toNode, belong, styles) {
        if (!fromNode || !toNode) {
            return false
        }
        const link = this._twaver.Link(fromNode, toNode)
        let parent = belong || this._box
        // 默认已知配置
        setLinkStyle(link, styles)
        parent && parent.add(link)
        return link
    }
    // 创建折线 loctions表示折线需要经过的点 loctions为数组,数组中的对象必须x,y属性
    createShapeLink(fromNode, toNode, belong,locations,styles){
        let link = new this._twaver.ShapeLink(fromNode, toNode);
        let parent = belong || this._box
        // 默认已知配置
        setLinkStyle(link, styles)
        let list
        if (locations && Object.prototype.toString.call(locations) =="[object Array]"){
            list = new this._twaver.List()
            for(let index=0;index<locations.length;index ++){
                let location = locations[index]
                if (
                    location &&
                     location.x != undefined &&
                     location.y != undefined && 
                     (Object.prototype.toString(location.x) == "[object Number]" || !isNaN(Number(location.x))) &&
                     (Object.prototype.toString(location.y) == "[object Number]" || !isNaN(Number(location.y))) 
                    ){
                        // 判断location包含x,y属性，并且属性对应的值为数值，或者能转成数值的字符串
                        const {x,y} = location
                        list.add({x,y})
                    }
               
            }
        }
        if (list && list.length>0){
            link.setPoints(list)
        }
        parent && parent.add(link)
        return link
    }
    // 追加告警
    addAlarm (alarmID, elementID, alarmSeverity, alarmBox) {
        var alarm = new this._twaver.Alarm(alarmID, elementID, alarmSeverity)
        alarmBox.add(alarm)
      }
    // 图片的注册
    registerNormalImage(url, name, network, callbak) {
        if (url == undefined || network == undefined) {
            return false
        }
        let image = new Image()
        image.src = url
        image.onload = function () {
            this._twaver.Util.registerImage(name, image, image.width, image.height)
            image.onload = null;
            network.invalidateElementUIs();
            Object.toString.call(callbak) == "[object Function]" && callbak()
        }
        return true


    }
}
function setLinkStyle(link, styles) {
    let targetObject = {
        "shadow.blur": 10,
        "shadow.xoffset": 6,
        "shadow.yoffset": 6,
        "link.width": 1,
        "link.color": "#309FC9",
        "outer.width": 0,
        "arrow.from.color": "#309FC9",
        "arrow.from": false,
        "arrow.to.color": "#309FC9",
        "arrow.to": false,
        "curve_type": "bundle"
    }
    // 设置
    if (styles && Object.prototype.toString.call(styles) == "[object Object]") {
        // 代表设置了样式
        Object.assign(targetObject, styles)
    }
    let objects = Object.entries(targetObject)
    // 统一设置样式
    for (let index = 0; index < objects.length; index++) {
        let [key, value] = objects[index]
        link.setStyle(key, value)
    }
}
export default TwaverPlugin