### tree-shaking

> 一般说到树摇的实现思路，首先想到的就是从import语句做依赖收集，遍历一次将import到的所有模块引入，然后再次遍历下面的语句将未用到的删除掉，如下：

```js
  // foo.js
  export const a = () => {};
  export const b = () => {};

  // index.js
  import { a, b } from 'foot.js'

  console.log(a())

  // 常规tree-sharking，index里直接放入a,b方法，则index变成
  const a = () => {};
  const b = () => {};

  console.log(a())

  // 然后再次遍历下面的代码，发现b没用到，删除b，最后index变成
  const a = () => {};

  console.log(a())
```

> 上面的常规做法需要多次遍历明显比较臃肿，下面换种做法：**反向引入**。  
思路：从执行语句入手，还是上面的例子，遇到import语句将其变量存起来，遇到执行语句 console.log(a())，然后从存起来的import语句变量中查找到a的引用，则引入，省去了删除b步骤。所以真正的树摇实现方式并不是修枝剪叶，而是要啥拿啥。



## rollup

> 构建化工具库（webpack、rollup、eslint、prettier等），一般都分为三个步骤：   
code --**parse**-> ast --**transform**-> new ast --**generate**->code   
即code通过parse成ast，在ast中进行复杂的处理得到想要的结果，最后复原回code。


- rollup并没有用babel等库进行上面的步骤处理，可能是babel等库太重了，所以rollup自己实现了。

1. magic-string，用于字符串切割和代码合并，并且能产生sourceMap

2. acorn，编译器,可以生成ast 

3. walk封装，ast访问者，如果只是遍历对象的话就不用封装了，但是访问者需要遍历ast的每一个节点，有很多层。

4. scope封装，如果变量只用数组或者对象来存储的话是不符合规则的，因为还要描述作用域，封装一个描述作用域类，该类提供判断该变量是否被声明、返回变量所在的作用域等方法，然后每个作用域放在单向链表里存储能串起来。
