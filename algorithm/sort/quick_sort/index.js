function quick_sort(arr) {
  if(arr.length <= 1) return arr;
  function _quick_sort(arr, l, r) {
    if (l >= r) return ;
    let x = l, y = r, base = arr[l];
    while (x < y) {
      while(x < y && arr[y] >= base) y--;
      if(x < y) arr[x++] = arr[y];
      while(x < y && arr[x] < base) x++;
      if(x < y) arr[y--] = arr[x];
    }
    arr[x] = base;
    _quick_sort(arr, l, x - 1);
    _quick_sort(arr, x + 1, r);
  }
  _quick_sort(arr, 0, arr.length - 1)
  return arr;
}

console.log(quick_sort([5,2,1,7,9,8,2,6]));