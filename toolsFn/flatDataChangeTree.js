// 扁平化数据转树结构

function genetateTree(data) {
  let tree = []
  let findFather = parentId => data.find(item => item.id === parentId) 
  let addChild = item => {
    let parent = findFather(item.parent)
    parent.child = parent.child ? [...parent.child, item] : [item]
  }
  data.forEach(item =>　{
    if (item.parent === -1) {
      tree.push(item)
    } else {
      addChild(item)
    }
  })
  return tree
}

// v2 递归
function genetateTree2(data) {
  let tree = [], cacheArr = new Set();
  let findParent = (item) => {
    if (!item) return ;

    let father = data.find(v => v.id === item.parent);
    cacheArr.add(item)
    if (!father) return tree.push(item);
    father.child = father.child ? [...father.child, item] : [item];
    
    if (cacheArr.has(father)) {
      return ;
    }
    return findParent(father)
  }
  data.forEach(i => {
    findParent(i)
  })
  return tree
}

let flatData = [
  {
    parent: -1,
    id: 1,
    name: '顶层1'
  }, {
    parent: -1,
    id: 2,
    name: '顶层2'
  }, {
    parent: 2,
    id: 3,
    name: '二层3'
  }, {
    parent: 2,
    id: 4,
    name: '二层4'
  }, {
    parent: 1,
    id: 5,
    name: '二层5'
  }, {
    parent: 3,
    id: 6,
    name: '三层6'
  }, {
    parent: 6,
    id: 7,
    name: '末层7'
  }, {
    parent: 4,
    id: 8,
    name: '三层8'
  }, 
]
console.dir(genetateTree2(flatData));
