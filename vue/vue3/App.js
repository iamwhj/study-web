// const {reactive, effectWatch} = require('./core/reactivity/index.js')
import {reactive, effectWatch} from './core/reactivity/index.js'
import { h } from './core/h.js'
// v1
// let a = 10, b;

// b = a + 10

// console.log(b);

// a = 20

// b = a + 10
// console.log(b);

// v2
// let a = 1 , b;
// update()

// function update() {
//   b = a + 10
//   console.log(b);
// }
// a = 10
// update()

// v3
// let obj = reactive({
//   name: 'daw',
//   age: 18
// })

// let dooble;

// effectWatch(() => {
//   dooble = obj.age * 2
//   console.log(dooble);
// })　
// obj.age = 20

// v4
// const App = {
//   renden(context) {
//     effectWatch(() => {
//       document.body.innerHTML = ''
//       const div = document.createElement('div')
//       div.innerHTML = context.state.count

//       document.body.append(div)
//     })
//   },
//   setup() {
//     const state = reactive({
//       count: 0
//     })
//     window.state = state
//     return {
//       state
//     }
//   }
// }
// App.renden(App.setup())

// v5 抽离
// template -> vdom -> render
// export default {
//   render(context) {
//     const div = document.createElement('div')
//     div.innerHTML = context.state.count
//     return div
//   },
//   setup() {
//     const state = reactive({
//       count: 0
//     })
//     window.state = state
//     return {
//       state
//     }
//   }
// }

// v6 引入vdom
export default {
  render(context) {
    return h(
      'div',
      {id: 'hei' , class: 'haha'},
      // [ {tag: 'p', props: {id: 'ha'+context.state.count}, children: 'haha'},  {tag: 'p', props: null, children: 'heihei'}]
      context.state.child
    )
  },
  setup() {
    const state = reactive({
      count: 0,
      child: 'string'
    })
    window.state = state
    return {
      state
    }
  }
}