function defineReactive (data, key, value) {
  // 递归调用，监听所有属性
  observer(value)
  var dep = new Dep()
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal
        // 通知订阅器
        dep.notify()
      }
    }
  })
}

function observer (data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function Dep () {
  this.subs = []
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}
Dep.prototype.notify = function () {
  console.log('属性变化通知 Watcher 执行更新视图函数')
  this.subs.forEach(sub => {
    sub.update()
  })
}
Dep.target = null
