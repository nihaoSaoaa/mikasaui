
// 通过递归、遍历，找到指定组件的 name 选项匹配的组件实例并返回。
/**
 * 
 * @param {object} context   组件的上下文 
 * @param {string} componentName 组件名
 * @returns {object} parent 
 */
export function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;
  while(parent && (!name || componentName !== name)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

export function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent);
    }
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children = null;
  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

export function findComponentsDownward(context, componentName) {
  return context.$children.reduce( (components, child) => {
    if (child.$options.name === componentName) components.push(child);
    return components.concat(findComponentsDownward(child, componentName));
  }, [])
}

export function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter( item => item.$options.name === componentName);
  let index = res.findIndex( item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

