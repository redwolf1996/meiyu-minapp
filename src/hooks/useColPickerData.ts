// 可以将此代码放置于项目src/hooks/useColPickerData.ts中
import { useCascaderAreaData } from '@vant/area-data'

export interface CascaderOption {
  text: string
  value: string
  children?: CascaderOption[]
}

/**
 * 使用'@vant/area-data'作为数据源，构造ColPicker组件的数据
 * @returns void
 */
export function useColPickerData() {
  const areaData = useCascaderAreaData()
  const codeToNodeMap = new Map<string, { text: string, parent?: string }>()

  // 一次性预处理数据，构建 code -> node 的映射
  function buildMap(nodes: CascaderOption[], parent?: string) {
    for (const node of nodes) {
      codeToNodeMap.set(node.value, { text: node.text, parent })
      if (node.children) {
        buildMap(node.children, node.value)
      }
    }
  }
  buildMap(areaData)

  /**
   * 根据省、市、县的代码获取对应的文本标签并拼接
   * @param codes - 包含 province, city, county 代码的对象
   * @param codes.province - 省份代码
   * @param codes.city - 城市代码
   * @param codes.county - 区县代码
   * @param displayType - 显示类型: 'full' 表示完整路径, 'partial' 表示部分路径
   * @returns 拼接后的地址字符串
   */
  function getAreaTextByCodes(
    codes: { province?: string, city?: string, county?: string },
    displayType: 'full' | 'partial' = 'full',
  ): string {
    const { province, city, county } = codes
    const labels: string[] = []

    if (displayType === 'full') {
      const finalCode = county || city || province
      if (!finalCode)
        return ''

      let currentCode: string | undefined = finalCode
      while (currentCode) {
        const node = codeToNodeMap.get(currentCode)
        if (node) {
          labels.unshift(node.text)
          currentCode = node.parent
        }
        else {
          currentCode = undefined
        }
      }
    }
    else {
      // partial mode
      if (province) {
        const node = codeToNodeMap.get(province)
        if (node)
          labels.push(node.text)
      }
      if (city) {
        const node = codeToNodeMap.get(city)
        if (node)
          labels.push(node.text)
      }
      if (county) {
        const node = codeToNodeMap.get(county)
        if (node)
          labels.push(node.text)
      }
    }

    return labels.join('')
  }

  // 兼容旧接口，但现在可以直接使用 areaData
  const colPickerData: CascaderOption[] = areaData
  function findChildrenByCode(data: CascaderOption[], code?: string): CascaderOption[] | null {
    if (!code) {
      return data
    }
    for (const item of data) {
      if (item.value === code) {
        return item.children || null
      }
      if (item.children) {
        const childrenResult = findChildrenByCode(item.children, code)
        if (childrenResult) {
          return childrenResult
        }
      }
    }
    return null
  }

  return { colPickerData, findChildrenByCode, getAreaTextByCodes }
}
