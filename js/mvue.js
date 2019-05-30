/* eslint-disable no-new */
/* eslint-disable no-undef */
function mvue (options) {
  this.$options = options
  this.$data = options.data
  this.$el = document.querySelector(options.el)
  // 数据代理
  Object.keys(this.$data).forEach(key => {
    this.proxyData(key)
  })
  this.init()
}
mvue.prototype.init = function () {
  observer(this.$data)
  new Compile(this)
}
mvue.prototype.proxyData = function (key) {
  Object.defineProperty(this, key, {
    get: function () {
      return this.$data[key]
    },
    set: function (value) {
      this.$data[key] = value
    }
  })
}
