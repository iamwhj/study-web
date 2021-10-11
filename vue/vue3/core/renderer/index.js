// n1 oldTree n2 newTree
export function diff(n1, n2) {
  // 1. tag
  if(n1.tag !== n2.tag) {
    n1.el.replaceWith(document.createElement(n2.tag))
  } else {
    const el = (n2.el = n1.el)
    // 2. props
    // 新的比老的，多则增，少则删，值变则改
    const {props: newProps} = n2
    const {props: oldProps} = n1

    // 多增、值改
    if(newProps && oldProps) {
      Object.keys(newProps).forEach((key) => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        if(newVal !== oldVal) {
          el.setAttribute(key, newVal)
        }
      })
    }

    // 少删
    if(oldProps) {
      Object.keys(oldProps).forEach(key => {
        if(!newProps[key]) {
          el.removeAttribute(key)
        }
      })
    }

    // 3. children -> 暴力解法    以下四种情况
    //    1) newChildren -> string (oldChildren -> string || array)
    //    2) newChildren -> array (oldChildren -> string || array)
    const {children: newChildren} = n2
    const {children: oldChildren} = n1

    if(typeof newChildren === 'string') {
      if(typeof oldChildren === 'string') {
        if(newChildren !== oldChildren) {
          el.textContent = newChildren
        }
      }else if(Array.isArray(oldChildren)) {
        el.textContent = newChildren
      }
    }else if(Array.isArray(newChildren)) {
      if(typeof oldChildren === 'string') {
        el.innerText = '';

        // mountElement(n2, el)
        for (const child of n2.children) {
          mountElement(child, el)
        }
      } else if(Array.isArray(oldChildren)) {
        // 数组对比
        let length = Math.min(newChildren.length, oldChildren.length)

        // 处理公共长度的vnode
        for (let i = 0; i < length; i++) {
          const newVnode = newChildren[i]
          const oldVnode = oldChildren[i]
          diff(oldVnode, newVnode)
        }

        if(newChildren.length > length) {
          // 创建节点
          for (let i = length; i < newChildren.length; i++) {
            const newVnode = newChildren[i]
            mountElement(newVnode, el)
          }
        }

        if(oldChildren.length > length) {
          for (let i = 0; i < oldChildren.length; i++) {
            const oldVnode = oldChildren[i];
            oldVnode.el.parentNode.removeChild(oldVnode.el)
          }
        }
      }
    }
  }
}

export function mountElement(vnode, container) {
  const { tag, props, children } = vnode
  // 1. tag
  const el = document.createElement(tag)
  vnode.el = el
  console.log(container);
  // 2. props
  if(props) {
    for (const key in props) {
      el.setAttribute(key, props[key])        
    }
  }

  // 3. children
  if(typeof children === 'string') {
  // 1) 字符串
    const textNode = document.createTextNode(children)
    el.append(textNode)

  } else if(Array.isArray(children)) {
  // 2) 数组
    children.forEach(v => {
      mountElement(v, el)
    });
  }

  container.append(el)
}