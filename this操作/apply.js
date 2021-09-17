// ES3
Function.prototype.apply3 = function () {
  var ctx = arguments[0] || window
  ctx.fn = this

  var res
  if (!arguments[1]) {
    res = ctx.fn()
  } else {
    var args = []
    for (var i = 1; i < arguments.length; i++) {
      args.push('arguments[' + i + ']')
    }
  
    res = eval('ctx.fn(' + args + ')')
  }

  delete ctx.fn
  return res
}

// ES6
Function.prototype.apply6 = function (ctx, args) {
  ctx = ctx || window
  ctx.fn = this

  let res
  if (!args) {
    res = ctx.fn()
  } else {
    res = ctx.fn(...args)
  }
  delete ctx.fn
  return res
}