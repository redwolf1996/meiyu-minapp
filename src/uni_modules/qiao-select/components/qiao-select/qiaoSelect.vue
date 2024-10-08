<template>
	<view class="qiaoSelect" :class="{'ban':disabled}">
		<input type="text" class="input" :class="{'input-border':showBorder}" @input="watchInput" @focus="focus"
			@blur="blur" :placeholder="phText" :placeholder-style="'color:'+phColor" @tap="open" :disabled="disabled"
			v-model="inputText" />
		<view class="icon">
			<uni-icons type="close" size="15" color="#515151" class="img-close" @click="clickClear"
				v-if="inputText!==''&&!disabled"></uni-icons>
			<uni-icons v-show="popupShow" type="bottom" size="15" color="#515151"></uni-icons>
			<uni-icons v-show="!popupShow" type="right" size="15" color="#515151"></uni-icons>
		</view>
		<view class="select" v-show="popupShow">
			<view class="box">
				<view style="color: #515151;font-size: 30rpx;" v-if="dataList.length==0">暂无数据</view>
				<view style="color: #515151;font-size: 30rpx;" v-if="filPersons.length==0&&dataList.length!=0">
					暂无数据
				</view>
				<view @touchstart="touchst" v-for="(item,index) in filPersons" :key="index">
					<view @click.stop="Check(item)" style="text-align: left;" class="li"
						:class="item.qiaoSelectKey==inputText?'blue':''">
						{{item[showField]}}
					</view>
				</view>
			</view>
		</view>
		<view class="popup" v-show="popupShow" @click="close">
			<view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//下拉数据
			dataList: {
				type: Array,
				default () {
					return []
				}
			},
			//唯一键，用于多个关闭
			keyId: Number | String,
			//提示语
			phText: String,
			//提示语颜色
			phColor: {
				type: String,
				default: '#999999',
			},
			//指定搜索的属性
			searchKey: {
				type: String,
				default: 'name'
			},
			//是否显示边框
			showBorder: {
				type: Boolean,
				default: true,
			},
			//默认显示的条目
			showObj: {
				type: Object,
				default: null,
			},
			//展示的字段
			showField: {
				type: String,
				default: 'name'
			},
			//是否禁用
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				timer: '', //定时器
				popupShow: false,
				inputText: '',
				isInput: true, //是否输入，如果输入开始模糊查询
			}
		},
		onLoad() {},
		computed: {
			filPersons: {
				get() {
					if (!this.isInput) {
						return this.dataList
					} else {
						return this.dataList.filter((item) => {
							if (item.qiaoSelectKey) {
								return item.qiaoSelectKey.indexOf(this.inputText) != -1
							} else {
								return []
							}
						})
					}
				},
				set(val) {}
			}

		},
		watch: {
			inputText: {
				immediate: true,
				handler(val) {
					this.filPersons = this.dataList.filter((item) => {
						if (!item.qiaoSelectKey) return
						return item.qiaoSelectKey.indexOf(val) != -1
					})
				}
			},
			dataList: {
				immediate: true,
				handler(val) {
					if (this.dataList.length > 0) {
						this.dataList.forEach(item => {
							Object.keys(item).map((key) => {
								if (item[this.searchKey]) {
									item.qiaoSelectKey = item[this.searchKey].toString()
								} else if (item[this.showField]) { //没有指定搜索字段，默认搜索展示字段
									item.qiaoSelectKey = item[this.showField].toString()
								}
							})
						})
						this.inputText = ''
					}
				}
			},
			//监听赋值
			showObj: {
				handler(val) {
					if (val) {
						this.inputText = val[this.showField]
						this.$emit('input', [val])
						this.$emit('change', val)
					} else {
						this.inputText = ''
						this.$emit('input', [])
						this.$emit('change', null)
					}
				},
				deep: true,
				immediate: true,
			},
		},
		methods: {
			clickClear() {
				this.inputText = ''
				this.$emit('input', [])
				this.$emit('change', null)
			},
			touchst() {
				if (this.disabled) return;
				this.popupShow = true
			},
			focus() {
				this.isInput = false
			},
			watchInput(e) { //键盘输入
				this.isInput = true
				if (this.inputText) {
					this.$emit('input', this.filPersons)
				}
				if (this.inputText === '') {
					this.$emit('input', [])
					this.$emit('change', null)
				}
			},
			Check(i) { //选择选项
				this.inputText = i[this.showField]
				this.isInput = false
				this.close()
				this.$emit('change', i)
			},
			open() {
				if (this.disabled) return;
				uni.setStorageSync('keyId', this.keyId)
				this.popupShow = true
			},
			close() { //关闭
				this.popupShow = false
			},
			blur() {
				this.timer = setInterval(() => {
					if (this.popupShow && uni.getStorageSync('keyId') != this.keyId) {
						this.popupShow = false
					}
					setTimeout(() => {
						clearInterval(this.timer)
					}, 100)
				}, 200)
			},
		}
	}
</script>

<style lang="scss" scoped>
	$height: 60rpx;

	.ban {
		background: #F7F7F6;
	}

	.qiaoSelect {
		margin: 0;
		padding: 0;
		position: relative;
		height: $height;
		display: flex;
		align-items: center;

		.img-close {
			margin: 0 10rpx;
		}

		.icon {
			z-index: 99;
		}

		.input {
			flex: 1;
			border-radius: 10rpx;
			height: $height;
			padding: 0;
			font-size: 30rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}

		.input-border {
			border: 1rpx solid #ECECEC;
			padding-left: 20rpx;
		}

		.select {
			padding: 20rpx;
			color: #515151;
			position: absolute;
			top: 90rpx;
			left: 0;
			right: 0;
			z-index: 100;
			background-color: white;
			border: 2px #f3f3f3 solid;
			font-size: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;

			.box {
				max-height: 300rpx;
				overflow: scroll;
			}

			.li {
				padding: 10rpx 0;
			}

			.blue {
				color: #55aaff;
			}
		}

		.select::after {
			width: 0px;
			height: 0px;
			position: absolute;
			bottom: 100%;
			left: 10%;
			padding: 0;
			border: 16rpx solid transparent;
			border-color: transparent transparent #fff transparent;
			content: '';
		}

		.select::before {
			width: 0px;
			height: 0px;
			position: absolute;
			bottom: 100%;
			left: 10%;
			padding: 0;
			border: 20rpx solid transparent;
			border-color: transparent transparent #f3f3f3 transparent;
			transform: translate(-4rpx, 0);
			content: '';
		}

		.popup {
			position: absolute;
			z-index: 9;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;

			view {
				position: fixed;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
			}
		}

	}
</style>