// ES3
Function.prototype.call3 = function () {
  var ctx = arguments[0] || window
  ctx.fn = this
  
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('ctx.fn(' + args + ')')
  delete ctx.fn
  return result
}


// ES6
Function.prototype.call6 = function (ctx, ...arg) {
  ctx = ctx || window
  ctx.fn = this
  const res = ctx.fn(...arg)
  delete ctx.fn
  return res
}