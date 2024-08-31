interface RichEdit {
  title: string
  content: string
}

export const richData = ref<RichEdit>({
  title: '富文本编辑器',
  content: '',
})
