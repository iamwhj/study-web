// 基数排序 一个数字用32位存储， 我们将其分为高16位，低16位（65536）进行基数排序  
// 理解：把数字看成65536进制，取个位 & 0xffff相当于 % 65536，取十位 & 0xffff0000 >> 16相当于 / 65536， 可以相互替换
function radix_sort(arr) {
  // 分别获取数字的高16位和低16位
  let low16 = (a) => a & 0xffff; 
  let high16 = (a) => a & 0xffff0000 >> 16;

  // low16
  let cnt = new Array(65536).fill(0), temp = [], len = arr.length;
  // 1. 统计低位出现的个数；2.低位数组前缀合；3.按照前缀合复位到temp
  for (let i = 0; i < len; i++) cnt[low16(arr[i])] += 1;
  for (let i = 1; i < 65536; i++) cnt[i] += cnt[i - 1];
  for (let i = len - 1; i >= 0; --i) temp[--cnt[low16(arr[i])]] = arr[i];
  
  // init cnt
  cnt = new Array(65536).fill(0)

  // high16
  for (let i = 0; i < len; i++) cnt[high16(temp[i])] += 1;
  for (let i = 1; i < 65536; i++) cnt[i] += cnt[i - 1];
  for (let i = len - 1; i >= 0; --i) arr[--cnt[high16(temp[i])]] = temp[i];
  cnt = null //free
  return ;
}

let arr = [15,23,17,56,43,29,12,69,34]
radix_sort(arr)
console.log(arr);