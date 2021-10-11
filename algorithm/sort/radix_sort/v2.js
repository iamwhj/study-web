// 基数排序 对负数进行兼容 
function radix_sort(arr) {
  // 分别获取数字的高16位和低16位
  let low16 = (a) => a & 0xffff; 
  let __high16 = (a) => a & 0xffff0000 >> 16;
  let high16 = (a) => __high16(a) > 32767 ? (__high16(a) - 32768) : (__high16(a) + 32768);

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
