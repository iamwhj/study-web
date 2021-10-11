function insert_sort(arr) {
  if(arr.length <= 1) return arr;
  let cnt = 0, len = arr.length;
  while (cnt < len) {
    let ind = cnt;
    for (let i = cnt - 1; i < len; i++) {
      if(arr[ind] > arr[i] ) ind = i;      
    }
    let min = arr[ind];
    arr.splice(ind, 1);
    arr.splice(cnt - 1, 0, min);
    cnt++;
  }
  return arr
}

console.log(insert_sort([5,2,6,1,6,8,9]));