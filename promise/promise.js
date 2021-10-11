class KPromise {
  constructor(handle) {
    this['[[PromiseState]]'] = 'pending'
    this['[[PromiseResult]]'] = undefined

    handle(this.resolve.bind(this), this.rejected.bind(this))

    this.resolveQueue = [];
    this.rejectQueue = [];
  }
  resolve(val) {
    this['[[PromiseState]]'] = 'fulfilled'
    this['[[PromiseResult]]'] = val

    queueMicrotask(() => {
      this.resolveQueue.forEach(cb => cb && cb(val))
      this.resolveQueue = [];
    })
  }
  rejected(err) { 
    this['[[PromiseState]]'] = 'rejected'
    this['[[PromiseResult]]'] = err

    queueMicrotask(() => {
      this.rejectQueue.forEach(cb => cb && cb(err))
      this.rejectQueue = []; 
    });
  }

  then(onResolve, onRejected) {
    // onResolve && this.resolveQueue.push(onResolve) 
    // onRejected && this.rejectQueue.push(onRejected) 

    return new KPromise((resolve, rejcet) => {
      const resolveFn = val => {
        let res = onResolve && onResolve(val)
        // 解决return promise问题
        if (res instanceof KPromise) {
          res.then(resolve)
        } else {
          resolve(res)
        }
      }
      this.resolveQueue.push(resolveFn) 

      const rejectFn = err => {
        onRejected && onRejected(err)
        rejcet(res)
      }
      this.rejectQueue.push(rejectFn) 
    })
  }

  static race() {}

  static all(list) {
    let resArr = [], num = 0;
    return new KPromise(resolve => {
      list.forEach(p => {
        p.then(res => {
          resArr.push(res)
          num++
          if (num === list.length) resolve(resArr)
        })
      })
    })
  }
  static allSettled(list) {
    let resArr = [], num = 0;
    return new KPromise(resolve => {
      list.forEach((p, i) => {
        p.then(res => {
          resArr[i] = {
            status: 'fulfilled',
            value: res
          }

          num++
          if (num === list.length) resolve(resArr)
        }, err => {
          resArr[i] = {
            status: 'rejected',
            reason: err
          }

          num++
          if (num === list.length) resolve(resArr)
        })
      })
    })
  }
} 