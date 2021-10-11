// 精简版 使用移位运算符进行除法取整
class Heap {
  constructor(sign=0) {
    this.heap = [];
    this.cnt = 0; // 方便堆排序

    // sign: 0 大顶堆，1 小顶堆
    this.sign = sign;
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
    let condition = this.sign ? heap[(ind - 1) >> 1] > heap[ind] : heap[(ind - 1) >> 1] < heap[ind]
    while (ind && condition) {
      [heap[(ind - 1) >> 1], heap[ind]] = [heap[ind], heap[(ind - 1) >> 1]]
      ind = (ind - 1) >> 1;
      condition = this.sign ? heap[(ind - 1) >> 1] > heap[ind] : heap[(ind - 1) >> 1] < heap[ind]
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
      let lchild = this.sign ? heap[temp] > heap[ind * 2 + 1] : heap[temp] < heap[ind * 2 + 1];
      if(lchild) temp = ind * 2 + 1;
      let rchild = this.sign ? heap[temp] > heap[ind * 2 + 2] : heap[temp] < heap[ind * 2 + 2];
      if(ind * 2 + 2 <= n && rchild) temp = ind * 2 + 2;
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