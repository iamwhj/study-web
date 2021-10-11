let Vue = null;
class Store {
  constructor(options) {
    this._state = new Vue({
      data: {
        $$state: options.state
      },
    })

    this._mutations = options.mutations
    this._actions = options.actions

    let getters = options.getters || {}
    this.getters = {}
    for (const key in getters) {
      // let res = getters[key](this.state)
      let _this = this
      Object.defineProperty(this.getters, key, {
        get() {
          return getters[key](_this.state)
        }
      })
    }

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  
  get state() {
    return this._state._data.$$state
  }
  set state(val) {
    console.error("不能直接覆盖state，请使用API");
  }

  commit(type, ...payload) {
    const fn = this._mutations[type]

    if (!fn) {
      console.error('mutation is not defined');
      return ;
    }

    fn(this.state, ...payload)
  }

  dispatch(type, ...payload) {
    const fn = this._actions[type]

    if (!fn) {
      console.error('action is not defined');
      return ;
    }

    fn(this, ...payload)
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

export default {
  Store,
  install
}