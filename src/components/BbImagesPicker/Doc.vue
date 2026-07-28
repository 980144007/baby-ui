<script lang="ts">
export const docMeta = {
  name: 'BbImagesPicker',
  category: '表单',
  summary: '图片选择、预览、删除、上传组件，也可关闭上传返回 base64。',
  order: 10,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbImagesPicker, showBbImagesPicker } from './index';

defineOptions({ name: 'BbImagesPickerDoc' });

const imageList = ref<string[]>([]);
const functionImageList = ref<string[]>([]);
function openFunctionImagesPicker() { showBbImagesPicker({ upload: false, multiple: true }).then((value) => { functionImageList.value = value; }).catch(() => undefined); }
</script>

<template>
  <section class="doc-page" data-find-item="BbImagesPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbImagesPicker</h2><p>图片选择、预览、删除、上传组件，也可关闭上传返回 base64。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbImagesPicker v-model=&quot;images&quot; multiple :upload=&quot;false&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>图片列表，支持字符串 URL 或对象。</span></div><div class="api-item"><code>colNum</code><span>每行列数，默认 3。</span></div><div class="api-item"><code>multiple</code><span>是否允许多选。</span></div><div class="api-item"><code>readonly / disabled</code><span>只读和禁用控制。</span></div><div class="api-item"><code>upload</code><span>是否调用 $uploadFile 上传；false 时转 base64。</span></div><div class="api-item"><code>returnObject / responseUrlKey</code><span>上传结果返回结构和值字段。</span></div></div></div><div class="doc-block"><h3>v-model / Events / Slots / Methods</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">cancel</span><span class="doc-tag">description</span><span class="doc-tag">triggerUpload()</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbImagesPicker(options)</code><span>函数式触发文件选择，返回 Promise&lt;string[]&gt;。</span></div></div></div></section>
  <section class="demo-section"><h2>BbImagesPicker 示例</h2><p class="hint">关闭真实上传，仅本地选择和预览。</p><BbImagesPicker v-model="imageList" :upload="false" multiple :col-num="3"><template #description="{ index }"><div class="image-desc">图片 {{ index + 1 }}</div></template></BbImagesPicker><div class="action-row"><van-button size="small" plain type="primary" @click="openFunctionImagesPicker">函数式 API</van-button></div><p class="result-text">函数式已选择：{{ functionImageList.length }} 张</p></section>
</template>
