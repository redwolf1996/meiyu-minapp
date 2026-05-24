export function useOss() {
  const imageValue = ref<any>([])
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

  // ====================== 仅新增OSS上传相关函数，不修改原有逻辑 ======================
  // 1. 获取OSS签名（对应官方示例的wx.request逻辑）
  function getOssSignature(fileName: string, callback: (err?: any) => void) {
    // 动态生成OSS存储key（格式：product/时间戳/随机串.后缀，避免文件名重复）
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileExt = fileName.split('.').pop() || 'png';
    const randomStr = Math.random().toString(36).slice(2, 8);
    const ossKey = `product/${timestamp}/${randomStr}.${fileExt}`;

    // 调用签名接口获取参数
    uni.request({
      url: ossConfig.signatureApiUrl,
      success: (res: any) => {
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
function uploadSingleToOSS(tempFilePath: string, fileName: string, callback: (err?: any, fileUrl?: string) => void) {
  // 先获取签名
  getOssSignature(fileName, (err, ossKey) => {
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

// 3. 适配uni-file-picker的上传逻辑（覆盖默认上传，改用OSS）
function handleFilePickerUpload(e: any) {
  // @success事件中，文件列表在e.tempFiles里（与@select参数结构一致，仅事件名不同）
  const tempFiles = e.tempFiles;
  if (!tempFiles || tempFiles.length === 0) return;

  // 清空原有数据（保持原逻辑）
  imageValue.value = [];

  // 批量上传（保持原逻辑）
  tempFiles.forEach((tempFile: any, index: number) => {
    uploadSingleToOSS(tempFile.path, tempFile.name, (err, fileUrl) => {
      if (err) return;
      console.log('imageValue data:', fileUrl);
      imageValue.value.push({
        name: index,
        url: fileUrl,
        extname: tempFile.name.split('.').pop() || 'img',
        fileID: fileUrl
      });
    });
  });
  console.log('imageValuessss data:', imageValue);
}
function handleFilePickerUpload2(e: any) {
// 使用@select事件的临时文件列表
const tempFiles = e.tempFiles;
if (!tempFiles || tempFiles.length === 0) return;

// 记录已上传成功的文件，用于最终更新
const uploadedFiles = [];

tempFiles.forEach((tempFile: any, index: number) => {
  uploadSingleToOSS(tempFile.path, tempFile.name, (err, fileUrl) => {
    if (err) return;

    // 构建符合uni-file-picker要求的文件格式
    const fileItem = {
      name: tempFile.name,        // 保留原始文件名
      url: fileUrl,               // OSS返回的URL
      extname: tempFile.name.split('.').pop() || 'img',
      fileID: fileUrl,
      path: tempFile.path,        // 保留本地临时路径用于预览
      size: tempFile.size,        // 保留文件大小
      type: tempFile.type         // 保留文件类型
    };

    uploadedFiles.push(fileItem);

    // 所有文件都上传完成后再更新imageValue
    if (uploadedFiles.length === tempFiles.length) {
      imageValue.value = uploadedFiles;
    }
  });
});
}
function handleFileDelete(e: any) {
// 更新imageValue，保留未被删除的文件
imageValue.value = e.tempFiles;
}

  return {
    ossConfig,
    imageValue,
    handleFilePickerUpload,
    handleFilePickerUpload2,
    handleFileDelete
  }
}
