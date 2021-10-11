function debounce(fn, wait=200, immediate) {
  let timer = null
  return function () {
    let _this = this
    let args = arguments
    if(immediate) {
      fn.apply(_this, args)
      immediate = false
      return 
    }
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(_this, args)
    }, wait)
  }
}

function throttle(fn, delay=200, immediate) {
  let timer = null
  return function () {
    let _this = this
    let args = arguments
    if(immediate) {
      fn.apply(_this, args)
      immediate = false
      return 
    }
    if(timer) return
    timer = setTimeout(function () {
      fn.apply(_this, args)
      timer = null
    }, delay)
  }
}