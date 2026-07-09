export function getFileType(suffix = '') {
  const ext = suffix.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) return 'image';
  if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'aac', 'flac'].includes(ext)) return 'audio';
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt'].includes(ext)) return 'file';
  return ext || 'file';
}
