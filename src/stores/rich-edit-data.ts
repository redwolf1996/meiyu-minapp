interface RichEdit {
  title: string
  content: string
  key: string // 上传图片的key
  length: number // 文本总长度
}

export const richData = ref<RichEdit>({
  title: '富文本编辑器',
  content: '',
  key: '',
  length: 0,
})
