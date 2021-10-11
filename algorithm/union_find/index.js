// 精简版quick_union(带路径压缩)

class QuickUnion {
  constructor(n) {
    this.fa = []
    for (let i = 0; i <= n; i++) {
      this.fa[i] = i      
    }
  }
  get(x) { 
    return this.fa[x] = (this.fa[x] === x ? x : this.get(this.fa[x]))
  }
  merge(a, b) {
    this.fa[this.get(a)] = this.get(b)
  }
}