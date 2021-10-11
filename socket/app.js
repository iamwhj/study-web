const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static-cache')

const http = require('http')
const socketServer = require('socket.io')

const app = new Koa()

const server = http.createServer(app.callback())
const io = socketServer(server)


app.use(koaStatic({
    prefix: '/public',
    dir: './public',
    dynamic: true,
    gzip: true
}))


io.on('connection', socket => {
    socket.on('data', e => {
        console.log(e)

        // 广播数据发给所有连接(除自己)
        socket.broadcast.emit('message', {
            id: socket.id,
            ...e,
            nowTime: nowTime()
        })

        // 也发给自己(如果需要的话)
        socket.emit('message', {
            id: socket.id,
            ...e,
            nowTime: nowTime()
        })
    })
})


server.listen(3000, () => {
    console.log('server listen to 3000')
})

function nowTime() {
    let date = new Date();
  
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
  
    let y = formatObj.y;
    let m = formatObj.m > 9 ? formatObj.m : `0${formatObj.m}`;
    let d = formatObj.d > 9 ? formatObj.d : `0${formatObj.d}`;
    let h = formatObj.h > 9 ? formatObj.h : `0${formatObj.h}`;
    let i = formatObj.i > 9 ? formatObj.i : `0${formatObj.i}`;
    let s = formatObj.s > 9 ? formatObj.s : `0${formatObj.s}`;
  
    let str = `${y}-${m}-${d} ${h}:${i}:${s}`
  
    return str
}
