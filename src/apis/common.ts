export interface UploadFileItem {
  file?: File;
  [key: string]: any;
}

export function uploadFiles(list: UploadFileItem[] = [], url = '/new_up_files') {
  if (typeof window === 'undefined' || !window.$uploadFile) {
    return Promise.reject('请先配置 window.$uploadFile 上传方法');
  }

  return window.$uploadFile({
    url,
    data: list.map((item) => ({
      ...item,
      name: 'files',
      value: item.file,
    })),
  });
}
