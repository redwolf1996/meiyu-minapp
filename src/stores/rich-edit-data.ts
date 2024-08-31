interface RichEdit {
  title: string
  content: string
  key: string // 上传图片的key
  len: number
}

export const richData = ref<RichEdit>({
  title: '富文本编辑器',
  content: '',
  key: '',
  len: 0,
})

export function resetRichData() {
  richData.value = {
    title: '富文本编辑器',
    content: '',
    key: '',
    len: 0,
  }
}
