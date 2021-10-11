const fs = require('fs')

let popArr = []

let Stack = function  () {
  this.stack = []
}

Stack.prototype.push = function (x) {
  this.stack.push(x)
}
Stack.prototype.pop = function () {
  if(this.empty()) return null;
  let pop = this.stack.pop()
  popArr.push(pop)
  return pop
}
Stack.prototype.empty = function () {
  return this.stack.length === 0
}


let stack = new Stack()

let data = fs.readFileSync('123.txt', {encoding: 'utf-8'})

let arr = data.split('\n')

for (let i = 0; i < arr.length; i++) {
  let item = arr[i].split(' ')
  switch (item[0]) {
    case 'push':
      stack.push(Number(item[1]))
      break;
    case 'pop':
      stack.pop()
      break;
  }
  
}

let sum = 0

for (let i = 0; i < popArr.length; i++) {
  sum += popArr[i] * (i + 1)
}

console.log(sum);