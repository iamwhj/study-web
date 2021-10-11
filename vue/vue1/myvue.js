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

    new Compile(options.el, this)
  }
} 

class Compile {
  constructor(el, vm) {
    this.$vm = vm

    let dom = document.querySelector(el)

    this.compile(dom)
  }

  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        let attrs = node.attributes
        Array.from(attrs).forEach(attr => { 
          let attrName = attr.name
          let exp = attr.value
          if (this.isDir(attrName)) {
            let dirName = attrName.split('-')[1]
            this[dirName] && this[dirName](node, exp)
          }
        })
        node.childNodes.length && this.compile(node)
      } else if (this.isInter(node)) {
        this.compileText(node)
      }
    })
  }

  isElement(node) {
    return node.nodeType === 1
  }
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/g.test(node.textContent)
  }

  isDir(attrName) {
    return attrName.startsWith('v-')
  }

  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }

  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }

  text(node, exp) {
    this.update(node, exp, 'text')
  }
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  
  textUpdater(node, val) {
    node.textContent = val
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }
}


class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm 
    this.key = key
    this.updater = updater

    Dep.target = this
    vm[key]
    Dep.target = null
  }

  update() {
    const val = this.vm[this.key]
    this.updater.call(this.vm, val)
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(w => w.update())
  }
}