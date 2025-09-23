<template>
  <view class="container-editor">
    <view class="textarea">
      <view class="page-body">
        <view class='wrapper'>
          <PickerColor ref="colorPicker" :color="{ r: 255, g: 0, b: 0, a: 0.6 }" @confirm="confirm"></PickerColor>
          <view class='toolbar' @tap="format">
            <view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-font-size"
              data-name="fontSize" data-value="24px"></view>
            <view :class="formats.color ? 'ql-active' : ''" class="iconfont icon-zitiyanse" data-name="color"
              :data-value="formats.color">
            </view>
            <view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-formatheader1"
              data-name="header" :data-value="1"></view>
            <view :class="formats.header === 2 ? 'ql-active' : ''" class="iconfont icon-formatheader2"
              data-name="header" :data-value="2"></view>
            <view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold">
            </view>
            <view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti"
              data-name="italic"></view>
            <view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
              data-name="underline"></view>
            <view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-shanchuxian"
              data-name="strike"></view>
            <view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
              data-name="align" data-value="left"></view>
            <view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
              data-name="align" data-value="center"></view>
            <view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
              data-name="align" data-value="right"></view>
            <view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
              data-name="align" data-value="justify"></view>
            <view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-LineHeight"
              data-name="lineHeight" data-value="2"></view>
            <view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing"
              data-name="letterSpacing" data-value="2em">
            </view>
            <view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-duanqianju"
              data-name="marginTop" data-value="10px"></view>
            <view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-duanhouju"
              data-name="marginBottom" data-value="10px"></view>
            <!-- <view class="iconfont icon-rili4" @tap="insertDate"></view> -->
            <view class="iconfont icon-checklist" data-name="list" data-value="check"></view>
            <view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
              data-name="list" data-value="ordered"></view>
            <view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
              data-name="list" data-value="bullet"></view>
            <view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
            <view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
            <view class="iconfont icon-fengexian" @tap="insertDivider"></view>
            <view class="iconfont icon-charutupian" @tap="insertImage"></view>
            <view class="iconfont icon-undo" @tap="undo"></view>
            <view class="iconfont icon-redo" @tap="redo"></view>
            <view class="iconfont icon-format" @tap="clear"></view>
          </view>
          <view class="editor-wrapper">
            <editor id="editor" class="editor" placeholder="开始输入..." showImgSize showImgToolbar showImgResize
              @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady"
              @input="saveContents" @select="handleFilePickerUpload2" @delete="handleFileDelete">
            </editor>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import PickerColor from "./color-picker.vue"
  import { reactive } from 'vue'

  const ossConfig = reactive({
    ossBucketDomain: 'https://meiyux.oss-cn-beijing.aliyuncs.com', // 替换为你的OSS Bucket实际域名
    signatureApiUrl: '/business/upload-oss-generate-signature', // 替换为你的签名接口实际地址
    policy: '',
    xOssSecurityToken: '',
    xOssSignatureVersion: '',
    xOssCredential: '',
    xOssDate: '',
    xOssSignature: ''
  })

  function getOssSignature(fileName, callback) {
    // 动态生成OSS存储key（格式：product/时间戳/随机串.后缀，避免文件名重复）
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileExt = fileName.split('.').pop() || 'png';
    const randomStr = Math.random().toString(36).slice(2, 8);
    const ossKey = `product/${timestamp}/${randomStr}.${fileExt}`;

    // 调用签名接口获取参数
    uni.request({
      url: ossConfig.signatureApiUrl,
      success: (res) => {
        const data = res.data.data;
        // 赋值OSS签名参数
        ossConfig.policy = data.policy;
        ossConfig.xOssSecurityToken = data.security_token;
        ossConfig.xOssSignatureVersion = data.x_oss_signature_version;
        ossConfig.xOssCredential = data.x_oss_credential;
        ossConfig.xOssDate = data.x_oss_date;
        ossConfig.xOssSignature = data.signature;
        // 回调传递生成的ossKey（用于后续上传）
        callback(null, ossKey);
      },
      fail: (err) => {
        console.error('获取OSS签名失败:', err);
        uni.showToast({ title: '获取上传参数失败，请重试!', icon: 'none' });
        callback(err);
      }
    });
  }

    // 2. 单个文件上传到OSS（对应官方示例的wx.uploadFile逻辑）
  function uploadSingleToOSS(tempFilePath, fileName, callback) {
    // 先获取签名
    getOssSignature(tempFilePath, (err, ossKey) => {
      if (err || !ossKey) {
        callback(err);
        return;
      }
      console.log('ossKey:', ossKey);

      // 构造OSS上传的formData
      const formData = {
        key: ossKey,
        policy: ossConfig.policy,
        'x-oss-signature-version': ossConfig.xOssSignatureVersion,
        'x-oss-credential': ossConfig.xOssCredential,
        'x-oss-date': ossConfig.xOssDate,
        'x-oss-signature': ossConfig.xOssSignature,
        'x-oss-security-token': ossConfig.xOssSecurityToken,
        success_action_status: "200"
      };

      // 执行文件上传
      uni.uploadFile({
        url: ossConfig.ossBucketDomain,
        filePath: tempFilePath,
        name: 'file', // OSS要求固定为"file"
        formData: formData,
        success: (res) => {
          if (res.statusCode === 200) {
            // 上传成功，拼接OSS文件完整地址
            const ossFileUrl = `${ossConfig.ossBucketDomain}/${ossKey}`;
            console.log('上传成功 data:', ossFileUrl);
            callback(null, ossFileUrl);

          } else {
            console.error('OSS上传失败，状态码:', res.statusCode);
            callback(new Error(`上传失败，状态码: ${res.statusCode}`));
          }
        },
        fail: (err) => {
          console.error('OSS上传失败:', err);
          uni.showToast({ title: '文件上传失败，请重试!', icon: 'none' });
          callback(err);
        }
      });
    });
  }

  // rich-text中的Img添加class 通过class 调整图片样式tag 默认图片宽度最宽为父组件宽度
  function richTextImg(value) {
    if (value && value.includes('<img'))
      return value.replace(/<img/gi, '<img class=\'richTextImg\' style=\'max-width:100%;height:auto\'')
    return value
  }

  export default {
    components: {
      PickerColor
    },
    props: {
      api: {
        type: String,
        default: ''
      },
      photoUrl: {
        type: String,
        default: ''
      },
      values: {
        type: String,
        default: ''
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: 300
      },
      name: {
        type: String,
        default: 'file'
      }
    },
    data() {
      return {
        currentTab: 0,
        curColor: '#000000',
        show: true,
        hdid: "",
        myHtml: "",
        formats: {}
      }
    },
    methods: {
      showPicker() {
        this.$refs.colorPicker.open()
      },
      confirm(e) {
        this.editorCtx.format('color', e.hex)
      },
      saveContents() {
        let that = this;
        let maxlength = parseInt(that.maxlength);
        that.editorCtx.getContents({
          success: function (res) {
            let html_text = richTextImg(res.html);
            let html_length = html_text.length;
            if (html_length > maxlength) {
              uni.showModal({
                title: '最多只能输入' + maxlength + '字',
                confirmText: '确定',
                showCancel: false,
                success(res) {
                  that.$emit("input", {
                    html: html_text,
                    length: html_length
                  });
                }
              });
            } else {
              that.$emit("input", {
                html: html_text,
                length: html_length
              });
            }
          },
        })
      },
      update() {
        //获取一下是否有数据
        let that = this;
        setTimeout(() => {
          that.editorCtx.setContents({
            "html": that.values
          });
        }, 1000)
      },
      onEditorReady() {
        let that = this;
        uni.createSelectorQuery().in(this).select('#editor').context((res) => {
          that.editorCtx = res.context;
          that.update();
        }).exec((result) => { });
      },
      undo() {
        this.editorCtx.undo()
      },
      redo() {
        this.editorCtx.redo()
      },
      format(e) {
        let {
          name,
          value
        } = e.target.dataset
        if (!name) return
        if (name == 'color') {
          this.showPicker()
        } else {
          this.editorCtx.format(name, value)
        }
      },
      onStatusChange(e) {
        const formats = e.detail
        this.formats = formats
      },
      insertDivider() {
        this.editorCtx.insertDivider();
      },
      clear() {
        this.editorCtx.clear();
        this.$emit()
      },
      insertDate() {
        const date = new Date()
        const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        this.editorCtx.insertText({
          text: formatDate
        })
      },
      insertImage() {
        let that = this;
        // #ifdef APP-PLUS || H5
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册或者相机选择
          success: (res) => {
            const tempFilePaths = res.tempFilePaths[0]
            if (!this.api || !this.photoUrl) {
              that.editorCtx.insertImage({
                src: tempFilePaths,
                alt: '图像',
                success: function () { }
              })
              uni.showToast({
                title: '未传入api字段或者photoUrl字段，此为临时图片路径',
                duration: 3000,
                icon: 'none'
              })
            } else {
              uni.uploadFile({
                url: this.photoUrl + this.api,
                filePath: tempFilePaths,
                name: this.name,
                formData: {},
                success: (uploadFileRes) => {
                  var obj = JSON.parse(uploadFileRes.data)
                  if (obj.code == 200) {
                    this.img = this.photoUrl + '/' + obj.data
                    wx.showToast({
                      title: obj.msg,
                      icon: 'none'
                    })
                    this.editorCtx.insertImage({
                      src: this.img,
                      alt: '图像',
                      success: function () { }
                    })
                  } else {
                    wx.showToast({
                      title: obj.msg,
                      icon: 'none'
                    })
                  }
                }
              });
            }
          },
          fail() {
            uni.showToast({
              title: '未授权访问相册权限，请授权后使用',
              icon: 'none'
            })
          }
        });
        // #endif
        // #ifdef MP
        uni.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sourceType: ['album'],
          sizeType: 'compressed',
          success: (chooseImageRes) => {
            uni.showLoading({
              title: '上传中'
            })
            const tempFilePaths = chooseImageRes.tempFiles[0].tempFilePath;
            uploadSingleToOSS(tempFilePaths, chooseImageRes.tempFiles[0].name, (err, fileUrl) => {
                if (err) {
                  uni.hideLoading()
                  uni.showToast({
                    title: '上传失败',
                    icon: 'none'
                  })
                  return
                }
                console.log('fileUrl:', fileUrl);
                uni.hideLoading()
                this.img = fileUrl
                this.editorCtx.insertImage({
                  src: this.img,
                  alt: '图像',
                  success: function () { }
                })
            });
            // uni.uploadFile({
            //   url: this.photoUrl + this.api,
            //   name: this.name,
            //   formData: {},
            //   filePath: tempFilePaths,
            //   // cloudPath: this.name + (+new Date()), // aaa.png
            //   success: (uploadFileRes) => {
            //     uni.hideLoading()
            //     this.img = uploadFileRes.fileID
            //     this.editorCtx.insertImage({
            //       src: this.img,
            //       alt: '图像',
            //       success: function () { }
            //     })
            //   },
            //   fail(err) {
            //     console.log(err)
            //     uni.hideLoading()
            //     uni.showToast({
            //       title: '上传失败',
            //       icon: 'none'
            //     })
            //   }
            // });
          }
        })
        // #endif
      }
    }
  }
</script>

<style>
  @import url('iconfont.css');

  .tabs {
    display: flex;
    justify-content: space-around;
    background-color: #FFFFFF;
  }

  .tabs .current {
    border-bottom: 2px solid #0369D6;
  }

  .tabs .tab {
    font-size: 32upx;
  }

  .main {
    padding: 20upx;
    background-color: #FFFFFF;
  }

  .main .item {
    display: flex;
    justify-content: space-between;
    line-height: 80upx;
    border-bottom: 1px solid #F2F2F2;
  }

  .main .item .left {
    min-width: 200upx;
  }

  .main .title {
    padding-bottom: 20upx;
    font-weight: bold;
    border-bottom: 1px solid #F2F2F2;
  }

  .main .textarea {
    border: 1px solid #F2F2F2;
  }

  .wrapper {
    padding: 0 10upx;
  }

  .iconfont {
    display: inline-block;
    width: 9%;
    cursor: pointer;
    font-size: 40upx !important;
    text-align: center;
    padding: 10upx 0;
  }

  .icon-rili4 {
    font-size: 48upx !important;
  }

  .icon-duanqianju,
  .icon-duanhouju,
  .icon-zitijiacu,
  .icon-zitixieti,
  .icon-zitixiahuaxian,
  .icon-shanchuxian {
    font-size: 36upx !important;
  }

  .toolbar {
    box-sizing: border-box;
    border-bottom: 0;
    margin-bottom: 10upx;
    padding: 0 10px;
  }

  .ql-container {
    box-sizing: border-box;
    width: 100%;
    min-height: 100% !important;
    height: auto;
    background: #fff;
    font-size: 32upx;
    line-height: 1;
    padding-bottom: 60upx;
  }

  :deep(.ql-editor.ql-blank:before) {
    font-size: 28upx;
    font-style: inherit;
  }

  .ql-active {
    color: #ff0000;
  }

  .editor-wrapper {
    height: calc(100vh - var(--window-top) - var(--status-bar-height) - 160px);
    background: #fff;
  }

  .editor {
    color: #333;
    padding: 12px 15px;
    height: 100% !important;
  }
</style>
