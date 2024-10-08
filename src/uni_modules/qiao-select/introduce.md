示例代码：

1、引入：

	import qiaoSelect from '@/uni_modules/qiao-select/components/qiao-select/qiaoSelect.vue'

2、添加：

	components: {
		qiaoSelect
	},

3、使用：

	组件默认展示的是【name】字段，可通过showField设置，最终@change返回整个选择的对象
	
	如果需要设置初始默认值，通过showObj设置，赋值要展示的条目对象
	
	组件外层View可以给个宽度

	<view style="width: 300rpx;">
		<qiaoSelect :keyId="1" :dataList="orgArray" phText="选择机构名称" phColor="#999999" showField="name" searchKey="name"
			:showObj="showObj" :showBorder="false" :disabled="false" @change="selectChange" @input='inputChange'></qiaoSelect>
	</view>
					
	selectChange(e) {//返回选择的对象，如果输入框清空，返回null
		if (e) {
			this.mechId = e.id
		} else {
			this.mechId = ''
		}
	},
	inputChange(e) {//返回搜索结果集合,一般用不到
		console.log(e)
	},
	
	可以通过以下2种方法清空指定的组件：
	1、加上 showObj 字段，然后将它设置为null，就清空了
	2、给组件加一个ref='xxx'，然后通过this.$refs.xxx.clickClear()清空
					
					
【属性介绍】：

	dataList：			下拉数据

	keyId：				唯一键，用于多个关闭
	
	showField:		要展示的字段，默认name
	
	showObj:			设置展示的条目对象，可用来设置默认值

	phText：				提示语

	phColor：			提示语颜色

	searchKey：		指定搜索的字段，不设置使用展示字段showField搜索

	showBorder：		是否显示边框
	
	disabled:			是否禁用

	@change:			返回选择的对象，如果输入框清空，返回null

	@input:				返回搜索结果集合
	
	