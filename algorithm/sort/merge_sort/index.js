function merge_sort(arr, l, r) {
  if(l >= r) return ;
  let mid = (l + r) >> 1;
  merge_sort(arr, l, mid)
  merge_sort(arr, mid + 1, r)
  let temp = []
  let k = 0, p1 = l, p2 = mid + 1;
  while (p1 <= mid || p2 <= r) {
    if((p2 > r) || (p1 <= mid && arr[p1] <= arr[p2])) {
      temp[k++] = arr[p1++]
    } else {
      temp[k++] = arr[p2++]
    }
  }
  for (let i = l; i <= r; i++) arr[i] = temp[i - l];
  return ;
}

let a = [2,3,51,5,78,92,52,97,5,1,8]

merge_sort(a, 0, a.length - 1)

console.log(a);