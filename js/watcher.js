/* eslint-disable no-undef */
function Watcher (vm, prop, callback) {
  this.vm = vm
  this.prop = prop
  this.callback = callback
  this.value = this.get()
}
Watcher.prototype = {
  update: function () {
    const value = this.vm.$data[this.prop]
    const oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.callback(value)
    }
  },
  get: function () {
    // 储存订阅器
    Dep.target = this
    // 因为属性被监听，这一步会执行监听器里的 get方法
    const value = this.vm.$data[this.prop]
    Dep.target = null
    return value
  }
}
