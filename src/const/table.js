// 表格读取方式
const TableConstValue = {
  NORMAL: 'normal', // 正常方式
  FUNCTION: 'function', // 函数方式
  LINK: 'link', // 超链接
  TAG: 'tag', // 代表tag布局
  MODIFY: 'modify', // 修改按钮
  SWITCH: 'switch'// switch 按钮

}
const TableNomalConstValue = {
  INDEX: 'index', // 序号标记
  EXPORTFUNC: 'exportFunc' // 导出的方法名称
}
const TableConst = Object.freeze(TableConstValue)
const TableNomalConst = Object.freeze(TableNomalConstValue)
export { TableConst, TableNomalConst }
