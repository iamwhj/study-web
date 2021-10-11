// js模拟 大顶堆
class Heap {
  constructor() {
    this.heap = [];
    this.cnt = 0; // 方便堆排序
  }
  print() {
    console.log(this.size())
    console.log(this.heap)
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

let h = new Heap()
h.push(2)
h.push(5)
h.push(1)
h.push(6)
h.push(8)
h.push(3)
console.log(h.heap)