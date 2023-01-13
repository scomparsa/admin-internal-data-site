import pathToRegexp from 'path-to-regexp-es'
import urlToList from '../utils/path-tools'

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 * @param  pathPrefix
 */
const getFlatMenuKeys = (menuData, pathPrefix) => {
  let keys = []
  menuData.forEach(item => {
    keys.push(pathPrefix + item.path)
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children, pathPrefix))
    }
  })
  return keys
}

const getMenuMatches = (flatMenuKeys, path) => {
  return flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path)
    }
    return false
  })
}

/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys
  } = props

  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item)
    .reduce((acc, curr) => [...acc, curr], ['/'])
}

export { getFlatMenuKeys, getMenuMatches, getDefaultCollapsedSubMenus }
