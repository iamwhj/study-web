const fs = require('fs')

let data = fs.readFileSync('data.txt', {encoding: 'utf-8'})

let arr = data.split('\n')

let NodeTree = function (val=0, left=null, right=null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

var buildTree = function(preorder, inorder) {
  if(preorder.length == 0) return null;
  let pos = 0;
  while(inorder[pos] !== preorder[0]) pos++;
  let l_pre = [], l_in = [], r_pre = [], r_in = [];
  for (let i = 0; i < pos; i++) {
    l_pre.push(preorder[i + 1])
    l_in.push(inorder[i])
  }
  for (let i = pos + 1; i < preorder.length; i++) {
    r_pre.push(preorder[i])
    r_in.push(inorder[i])
  }
  let root = new NodeTree(preorder[0])
  root.left = buildTree(l_pre, l_in)
  root.right = buildTree(r_pre, r_in)
  return root
};

let root = buildTree(arr[0].trim().split(' '), arr[1].trim().split(' '))

let posorder = root => {
  if(!root) return null;
  let ans = [];
  let _posorder = root => {
    if(!root) return ;
    _posorder(root.left)
    _posorder(root.right)
    ans.push(root.val)
  }
  _posorder(root)
  return ans;
}

let resArr = posorder(root)
let sum = 0;
for (let i = 0; i < resArr.length; i++) {
  sum += resArr[i] * (i + 1)  
}

console.log(sum);