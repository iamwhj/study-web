// 平滑到页面顶部
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 10);
  }
}

// 获取当前滚动位置
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});


// 函数柯里化
const curry = fn => {
  if (typeof fn !== "function") {
    throw Error("No function provided");
  }
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)));
      };
    }
    return fn.apply(null, args);
  };
};

// 文字排序
function fontSort(arr) {
  return arr.sort(
    function compareFunction(param1, param2) {
      return param1.name.localeCompare(param2.name, "zh");
    }
  );
}


// 去除数组中false（null,undefined,NaN,'',false,empty）,不去除0
let removeFlaseArray = arr => arr.filter(item => item === 0 ? true : item)


// RGB颜色转十六进制颜色
let RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');


// bind
Function.prototype.newBind = function () {
  let ctx = arguments[0] || window
  let args = [...arguments].slice(1)
  let _this = this

  let FNOP = function () { }   // 用于中转

  let fBound = function () {
    let bingdArgs = [...arguments]
    return _this.apply(this instanceof FNOP ? this : ctx, args.concat(bingdArgs))
  }
  FNOP.prototype = this.prototype
  fBound.prototype = new FNOP()
  return fBound
}


// 深度克隆
let deepClone = function (obj) {
  if(typeof obj !== 'object') return ;
  let newObj = obj instanceof Array ? [] : {}
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}


// 数组扁平化
Array.prototype.flatten = function () {
  let resArr = []
  this.forEach(item => {
    item instanceof Array ? resArr = resArr.concat(item.flatten()) : resArr.push(item)
  })
  return resArr
}



// JQuery中each
function each(arr, fn) {
  let isArray = arr instanceof Array
  if(isArray) {
      let len = arr.length
      for(let i = 0; i < len; i++) {
          if(fn.call(arr, i, arr[i]) === false) {
              break
          }
      }
  } else {
      for(let prop in arr) {
          if(fn.call(arr, prop, arr[prop]) === false) {
              break
          }
      }
  }
}


// new 封装
let myNew = function (targetObj, ...arg) {
  let obj = Object.create(targetObj.prototype)
  targetObj.apply(obj, arg)
  return obj
}


// ES6 数组高级函数

// find
Array.prototype.find = function (fn) {
  let len = this.length
  for(let i = 0; i < len; i++) {
    if(fn(this[i], i, this)) {
      return this[i]
    }
  }
}

// findIndex
Array.prototype.findIndex = function (fn) {
  let len = this.length
  for(let i = 0; i < len; i++) {
    if(fn(this[i], i, this)) {
      return i
    }
  }
  return -1
}


// Promise.allSettled es2020
function myAllSettled(lists) {
  let resArr = new Array(lists.length)
  let num = 0

  return new Promise(resolve => {
    lists.map((item, index) => {
      item.then(res => {
        let obj = {
          status: 'fulfilled',
          value: res
        }
        resArr[index] = obj
        num++
        if(num === lists.length) {
          resolve(resArr)
        }
      }, err => {
        let obj = {
          status: 'rejected',
          reason: err
        }
        resArr[index] = obj
        num++
        if(num === lists.length) {
          resolve(resArr)
        }
      })
    })
  })
}