import isEqual from 'lodash.isequal'
import { siteMetadata } from '~/config'

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null
      }

      let locale = 'menu'
      if (parentName) {
        locale = `${parentName}.${item.name}`
      } else {
        locale = `menu.${item.name}`
      }
      const { name } = item
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority
      }
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale)
        // Reduce memory usage
        result.children = children
      }
      delete result.routes
      return result
    })
    .filter(item => item)
}

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
    return {
      ...item,
      children: filterMenuData(item.children) // eslint-disable-line
    }
  }
  return item
}

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return []
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => getSubMenu(item))
    .filter(item => item)
}
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {}

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children)
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem
    })
  }
  flattenMenuData(menuData)
  return routerMap
}

const memoizeOneFormatter = window.memoizeOne(formatter, isEqual)

const memoizeOneGetBreadcrumbNameMap = window.memoizeOne(getBreadcrumbNameMap, isEqual)

const useMenu = () => {
  const { menuLinks } = siteMetadata
  const authority = []
  const originalMenuData = memoizeOneFormatter(menuLinks, authority)
  const menuData = filterMenuData(originalMenuData)
  const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData)

  return {
    menuData,
    breadcrumbNameMap
  }
}

export default useMenu
