export function useArea() {
  const { colPickerData, findChildrenByCode } = useColPickerData()
  const addressValue = ref<string[]>([])

  const area = ref<any[]>([
    colPickerData.map((item) => {
      return {
        value: item.value,
        label: item.text,
      }
    }),
  ])

  async function columnChange({ selectedItem, resolve, finish }) {
    await sleep(1) // 模拟异步请求
    const areaData = findChildrenByCode(colPickerData, selectedItem.value)
    if (areaData && areaData.length) {
      resolve(
        areaData.map((item) => {
          return {
            value: item.value,
            label: item.text,
          }
        }),
      )
    }
    else {
      finish()
    }
  }

  function handleConfirmAddress<T extends MY.AreaForm>(form: T) {
    form.province = addressValue.value?.[0]
    form.city = addressValue.value?.[1]
    form.county = addressValue.value?.[2]
  }

  return {
    area,
    addressValue,
    columnChange,
    handleConfirmAddress,
  }
}
