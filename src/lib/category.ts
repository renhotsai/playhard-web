import type { Script } from '../types/script'
import { categories, categoryTranslations, categoryDescriptions, type Category } from '../data/category'

export * from '../data/category'

export const getAllUniqueCategories = (scripts: Script[]): string[] => {
  const allCategories = scripts.map(script => script.category)
  return Array.from(new Set(allCategories))
}

export const getScriptsByCategory = (scripts: Script[], category: string): Script[] => {
  return scripts.filter(script => script.category === category)
}

export const getCategoryByKey = (key: string): Category | undefined => {
  return categories.find(category => category.key === key)
}

export const getCategoryScriptCount = (scripts: Script[], categoryKey: string): number => {
  return getScriptsByCategory(scripts, categoryKey).length
}

export const getCategoriesWithScriptCount = (scripts: Script[]): Array<Category & { scriptCount: number }> => {
  const uniqueCategories = getAllUniqueCategories(scripts)
  
  return uniqueCategories.map(categoryKey => {
    const category = getCategoryByKey(categoryKey)
    const scriptCount = getCategoryScriptCount(scripts, categoryKey)
    
    return {
      id: categoryKey,
      key: categoryKey,
      name: categoryTranslations[categoryKey] || categoryKey,
      description: categoryDescriptions[categoryKey] || '精彩劇本等你探索',
      icon: category?.icon || 'FolderOpen',
      color: category?.color || 'mystery-accent-primary',
      textColor: category?.textColor || 'mystery-text-primary',
      scriptCount
    }
  })
}

export const formatCategoryForDropdown = (scripts: Script[]) => {
  const categoriesWithCount = getCategoriesWithScriptCount(scripts)
  
  return categoriesWithCount.map(category => ({
    key: category.key,
    label: category.name,
    count: category.scriptCount,
    description: category.description,
    icon: category.icon,
    color: category.color
  }))
}

export { categoryTranslations, categoryDescriptions }