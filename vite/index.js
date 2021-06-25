const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const compilerSfc = require('@vue/compiler-sfc')
const compilerDom = require('@vue/compiler-dom')


const app = new Koa()

function rewriteImport(content) {
  return content.replace(/ from ['|"]([^./][\w\W]+?)['|"]/g, function ($0, $1) {
    return ` from '/@modules/${$1}'`
  })
}

app.use(ctx => {
  const { url, query } = ctx
  if(url === '/') {
    let content = fs.readFileSync('./index.html', 'utf-8')
    ctx.type = 'text/html'
    content = content.replace(
      '<script',
      `
      <script>
        window.process = { env: {NODE_ENV: 'dev'} }
      </script>
      <script
      `
    )
    ctx.body = rewriteImport(content)
  }else if(url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1))
    let content = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(content)
  }else if(url.startsWith('/@modules/')) {
    const prefix = path.resolve(
      __dirname,
      'node_modules',
      url.replace('/@modules/', '')
    )
    const module = require(prefix + '/package.json').module;
    const p = path.resolve(prefix, module)
    const content = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript';
    ctx.body = rewriteImport(content)
  }else if(url.indexOf('.vue') > -1) {
    const p = path.resolve(__dirname, url.split("?")[0].slice(1))
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, 'utf-8'))
    
    if(!query.type) {
      ctx.type = "application/javascript"
      ctx.body = `
        ${rewriteImport(descriptor.script.content.replace("export default ", "const __script = "))}
        import { render as __render } from '${url}?type=template'
        __script.render = __render
        export default __script
      `
    }else if(query.type === 'template') {
      const template = descriptor.template
      const render = compilerDom.compile(template.content, { mode: "module" }).code
      ctx.type = "application/javascript"
      ctx.body = rewriteImport(render)
    }
  }else if(url.endsWith('.css')) {
    const p = path.resolve(__dirname, url.slice(1))
    const file = fs.readFileSync(p, "utf-8");
    let cssContent = file.replace(/[\r\n|\n]/g, "")
    const content = `
    const css = "${cssContent}"
    let link = document.createElement("style")
    link.setAttribute('type', 'text/css')
    document.head.appendChild(link)
    link.innerHTML = css
    export default css
    `
    ctx.type = "application/javascript";
    ctx.body = content
  }
})


app.listen(3000, () => {
  console.log('koa server listen to 3000');
})