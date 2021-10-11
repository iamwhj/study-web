const fs = require('fs')
class Heap {
  constructor() {
    this.heap = [];
    this.cnt = 0; // 方便堆排序
  }
  top() {
    return this.heap[0]
  }
  size() {
    return this.cnt
  }
  push(x) {
    let heap = this.heap;
    heap[this.cnt++] = x;
    let ind = heap.length - 1;
    while (ind && heap[Math.floor((ind - 1) / 2)] < heap[ind]) {
      [heap[Math.floor((ind - 1) / 2)], heap[ind]] = [heap[ind], heap[Math.floor((ind - 1) / 2)]]
      ind = Math.floor((ind - 1) / 2);
    }
  }
  pop() {
    if(this.size() === 0) return ;
    let heap = this.heap;
    // [heap[0], heap[this.cnt - 1]] = [heap[this.cnt - 1], heap[0]]
    heap[0] = heap[this.cnt - 1];
    heap.length -= 1;
    this.cnt -= 1;
    let ind = 0, n = this.cnt - 1;
    while (ind * 2 + 1 <= n) {
      let temp = ind;
      if(heap[temp] < heap[ind * 2 + 1]) temp = ind * 2 + 1;
      if(ind * 2 + 2 <= n && heap[temp] < heap[ind * 2 + 2]) temp = ind * 2 + 2;
      if(temp === ind) break;
      [heap[temp], heap[ind]] = [heap[ind], heap[temp]]
      ind = temp;
    }
  }
}
var lastStoneWeight = function(stones) {
  let h = new Heap()
  for (const x of stones) {
    h.push(BigInt(x))
  }
  while (h.size() > 5) {
    let x = h.top(); h.pop();
    let y = h.top(); h.pop();
    if(x === y) continue;
    h.push(x - y);
  }
  if(h.size() === 0) return 0;
  return h.heap;
};

// I/O
let data = fs.readFileSync('./data.txt', 'utf-8')
data = data.split(' ')
let res = lastStoneWeight(data);
console.log(res)