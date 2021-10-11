// 依赖
class Dep {
  constructor(val) {
    this.effects = new Set()
    this._val = val
  }
  get value() {
    dep.depend()
    return this._val
  }
  set value(newVal) {
    this._val = newVal
    dep.notice()
  }

  depend() {
    if(Dep.target) {
      this.effects.add(Dep.target)
    }
  }

  notice() {
    this.effects.forEach(effect => effect())
  }
}

export function effectWatch(effect) {
  Dep.target = effect
  effect()
  Dep.target = null   
}

// 上面实现一个基础的响应式拦截，只能基础单值使用
// 下面结合实现多值

/*
targetMap: {
  obj1: {
    name: (Dep)[effect1, effect2],
    age: (Dep)[effect1, effect2]
  }
}
*/

const effectMap = new Map()
function getDep(target, key) {
  let targetMap = effectMap.get(target)
  if(!targetMap) {
    targetMap = new Map()
    effectMap.set(target, targetMap)
  }

  let dep = targetMap.get(key)
  if(!dep) {
    dep = new Dep()
    targetMap.set(key, dep)
  }
  return dep
}
export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // 收集依赖
      const dep = getDep()
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value)
      // 触发依赖
      const dep = getDep()
      dep.notice()
      return result
    }
  })
}

// node module
// module.exports = {
//   reactive,
//   effectWatch
// }