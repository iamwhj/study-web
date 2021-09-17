// ES3
Function.prototype.bind3 = function () {
  var ctx = arguments[0] || window
  var args = Array.prototype.slice.call(arguments, 1)
  var _this = this
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments)
    return _this.apply(ctx, args.concat(bindArgs))
  }
}

// 兼容new版
Function.prototype.bind5 = function () {
  var ctx = arguments[0] || window
  var args = Array.prototype.slice.call(arguments, 1)
  var _this = this

  function fBound() {
    var bindArgs = Array.prototype.slice.call(arguments)
    return _this.apply(this instanceof fBound ? this : ctx, args.concat(bindArgs))
  }

  var fNOP = function () {}
  fNOP.prototype = this.prototype

  fBound.prototype = new fNOP()
  return fBound
}