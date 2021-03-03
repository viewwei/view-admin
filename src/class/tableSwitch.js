class TableSwitch {
  constructor (
    state,
    activeColor,
    inactiveColor) {
    this.activeColor = activeColor || '#13ce66'
    this.inactiveColor = inactiveColor || '#ff4949'
    this.state = state == undefined ? false : state
  }
}
export default TableSwitch
