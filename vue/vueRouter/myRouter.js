let Vue = null;

class VueRouter {
  constructor(options) {
    this.$options = options

    Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
    
    // 踩坑，这边使用箭头函数，不然就得用变量保存外部this
    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1)
    })
  }
}

// 实例挂载和两个全局组件
VueRouter.install = function (_Vue) {
  Vue = _Vue

  // 想方设法拿路由表，延迟执行
  Vue.mixin({
    beforeCreate() {
      if(!Vue.prototype.$router && this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h(
        'a',
        {attrs: {href: '#' + this.to}},
        this.$slots.default
      )
    },
  })
    

  Vue.component('router-view', {
    render(h) {
      // 拿到路由表和hash地址，对比拿到component，然后放到h函数中进行渲染
      let route = this.$router.$options.routes.find(route => route.path === this.$router.current)
      let comp = route ? route.component : null;
      return h(comp)
    }
  })
}

export default VueRouter