> vite原理：有效利用浏览器支持esm的特性。  
> 浏览器遇到 import html类型 或者 js类型会自动发起另外一个get请求进行获取，获取其他类型时虽然请求到了，但是浏览器会报错，所以要支持其他类型的话需要转成 js类型或者 html类型。

- 1. 处理js类型，拼接第三方库路径使浏览器发起请求 'vue' -> '/@modules/vue'

- 2. 处理第三方库，读取三方库中package.json，拿到有效文件打包路径，读取

- 3. 处理.vue类型，通过@vue/compiler-sfc拆分templeate、script。改写并返回script，拼接app.vue?type=template，再次发起请求引入template，template通过@vue/compiler-dom生成render函数返回。

- 4. 处理.css类型，通过拼接成代码，dom API生成style元素返回