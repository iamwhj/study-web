function defineReactive(obj, key, val) {
  observe(val)

  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (val !== newVal) {
        console.log('set', key);
        observe(newVal)
        val = newVal
        dep.notify()
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return ;

  for (const key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

function set(obj, key, val) { 
  defineReactive(obj, key, val)
}

function proxy(vm, target) {
  for (const key in vm[target]) {
    Object.defineProperty(vm, key, {
      get() {
        return vm[target][key]
      },
      set(newVal) {
        vm[target][key] = newVal
      }
    })
  }
}

class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    observe(this.$data)

    proxy(this, '$data')

    // new Compile(options.el, this)
    if (options.el) {
      this.$mount(options.el)
    }
  }

  $mount(el) {
    this.$el = document.querySelector(el)
    const updateComponent = () => {
      // const el = this.$options.render.call(this)
      // const parent = this.$el.parentElement
      // parent.insertBefore(el, this.$el.nextSibling)
      // parent.removeChild(this.$el)
      // this.$el = el

      const vnode = this.$options.render.call(this, this.$createElement)
      this.__update__(vnode)
    }
    new Watcher(this, updateComponent)
  }
  $createElement(tag, props, children) {
    return { tag, props, children }
  }
  __update__(vnode) {
    const prevVnode = this._vnode
    if (!prevVnode) {
      // init
      this.__patch__(this.$el, vnode)
    }else {
      // update
      this.__patch__(prevVnode, vnode)
    }
    this._vnode = vnode
  }

  __patch__(oldVnode, vnode) {
    if (oldVnode.nodeType) {
      // create
      const parent = oldVnode.parentElement
      const ref = oldVnode.nextSibling
      const el = this.createElm(vnode)
      parent.insertBefore(el, ref)
      parent.removeChild(oldVnode)
    }else {
      // update
      if (oldVnode.tag === vnode.tag) {
        const el = vnode.el = oldVnode.el

        const oldCh = oldVnode.children
        const newCh = vnode.children

        if (typeof newCh === 'string') {
          if (typeof oldCh === 'string') {
            if (newCh !== oldCh) {
              el.textContent = newCh
            }
          } else {
            el.textContent = newCh
          }
        } else {
          if (typeof oldCh === 'string') {
            el.textContent = ''
            newCh.forEach(child => el.append(this.createElm(child)))
          } else {
            // newCh and oldCh => Array
            this.updateChildren(el, oldCh, newCh)
          }
        }
      }else {
        // replace ..
      }
    }
  }

  createElm(vnode) {
    const el = document.createElement(vnode.tag)

    // props ...

    // children
    if (typeof vnode.children === 'string') {
      el.innerHTML = vnode.children
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => el.append(this.createElm(child)))
    }
    vnode.el = el
    return el
  }
  updateChildren(parentEl, oldCh, newCh) {
    const len = Math.min(oldCh.length, newCh.length)

    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i])
    }

    if (newCh.length > len) {
      newCh.slice(len).forEach(child => {
        const el = this.createElm(child)
        parentEl.appendChild(el)
      })
    }else if (oldCh > len) {
      oldCh.slice(len).forEach(child => {
        parentEl.removeChild(child.el)
      })
    }
  }
} 

class Watcher {
  constructor(vm, fn) {
    this.vm = vm 
    this.getter = fn

    this.get()
  }

  get() {
    Dep.target = this
    this.getter.call(this.vm)
    Dep.target = null
  }

  update() {
    this.get()
  }
}

class Dep {
  constructor() {
    this.deps = new Set() // 去重
  }

  addDep(dep) {
    this.deps.add(dep)
  }

  notify() {
    this.deps.forEach(w => w.update())
  }
}