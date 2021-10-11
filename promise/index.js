new Promise(res => {
  console.log(11);
  res(22)
}).then(res => {
  console.log(res);
  console.log(33);
  return new Promise(res => {
    res(3.5)
  }).then(res => {
    console.log(res)
    return res
  })
}).then(res => {
  console.log(res);
  console.log(44)
}).then(res => {
  console.log(55);
}).catch(e => {
  console.log(e);
})