> hash模式：url地址#后面的内容发生变化时，我们使用hashchange事件就可以监听得到，然后拿新变化的hash去比对路由表的path，拿出component放到render函数中从而更新到\<view-router>

听课疑点：
1. this.$slots.default   看下这个属性  ok：this.$slots里存放组件标签内存放的所有内容(包括文本节点和元素节点)，不具名插槽则存放在default里，其是一数组，h函数会帮我们做处理，第一个文本节点的字符串替换
2. 全局组件router-view为了拿到配置表用了全局混入钩子函数达到延迟执行效果，那会不会以后的每个组件都会执行这个钩子里的内容，加个判断避免重复执行？  ok: 需要加判断，避免每个组件挂载时再次赋值



听课结论：
1. Vue.set方法只能在响应式对象上添加新的响应式属性，而不能直接生成一个独立的响应式对象或属性。Vue.set(obj, 'current', '/')，即obj不是响应式时，这个设置将无效。 Vue内部API：Vue.util.defineReactive()