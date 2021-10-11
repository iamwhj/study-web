/**
 * 
 * @param {*} arr 有序数组
 * @param {*} len 数组长度
 * @param {*} x 查找值
 * @returns 查找到的下标，-1即找不到
 */
function binary_search (arr, len, x) {
  let head = 0, tail = len - 1, mid;
  while (head <= tail) {
    // mid = (head + tail) >> 1; // 瑕疵：当head与tail很大的时候可能回越界，导致mid不准确
    mid = head + ((tail - head) >> 1);
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) head = mid + 1;
    else tail = mid - 1;
  }
  return -1
}

console.log(binary_search([1,5,6,8,10,12,15,20], 8, 12));