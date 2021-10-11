// 加入二分0 1模型
// 1,5,9,9,9,11,15,15,18  找到第一个大于等于9的位置

function binary_search_01(arr, len, x) {
  let head = 0, tail = len - 1, mid;
  while (head < tail) {
    mid = head + ((tail - head) >> 1);
    if(arr[mid] < x) head = mid + 1;
    else tail = mid;
  }
  return head;
}

console.log(binary_search_01([1,5,6,8,10,12,15,20], 8, 11));