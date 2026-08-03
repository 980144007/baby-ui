<script lang="ts">
export const docMeta = { name: 'BbImagesPicker', category: '表单', summary: '图片选择、预览、删除组件，支持单图/多图、本地 base64、函数式触发和只读禁用态。', order: 10 };
</script>
<script setup lang="ts">
import { ref, inject, onMounted, reactive } from 'vue';
import { BbImagesPicker, showBbImagesPicker } from './index';
defineOptions({ name: 'BbImagesPickerDoc' });
const demoCodes = reactive({
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbImagesPicker } from '@sunshine-baby/baby-ui';

const images = ref<string[]>([]);
${'</scr' + 'ipt>'}

<template>
  <BbImagesPicker v-model="images" multiple :upload="false" :col-num="3" />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbImagesPicker } from '@sunshine-baby/baby-ui';

const singleImage = ref<any[]>([]);
const imageRef = ref<InstanceType<typeof BbImagesPicker> | null>(null);
${'</scr' + 'ipt>'}

<template>
  <BbImagesPicker ref="imageRef" v-model="singleImage" :upload="false" :col-num="1" />
  <div class="action-row">
    <van-button size="small" type="primary" @click="imageRef?.triggerUpload()">
      triggerUpload()
    </van-button>
  </div>
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbImagesPicker } from '@sunshine-baby/baby-ui';

const multiImages = ref<any[]>([]);
${'</scr' + 'ipt>'}

<template>
  <BbImagesPicker v-model="multiImages" :upload="false" multiple :col-num="3">
    <template #description="{ index }">
      <div class="image-desc">第 {{ index + 1 }} 张</div>
    </template>
  </BbImagesPicker>
</template>`,
  demo3: `<script setup lang="ts">
import { ref } from 'vue';
import { BbImagesPicker, showBbImagesPicker } from '@sunshine-baby/baby-ui';

const readonlyImages = ref(['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg']);
const functionCount = ref(0);
function openFunctionImagesPicker() {
  showBbImagesPicker({ upload: false, multiple: true }).then((value) => {
    functionCount.value = value.length;
  });
}
${'</scr' + 'ipt>'}

<template>
  <div class="action-row">
    <van-button size="small" plain type="primary" @click="openFunctionImagesPicker">函数式选择</van-button>
  </div>
  <p>函数式选择数量：{{ functionCount }}</p>
  <BbImagesPicker v-model="readonlyImages" readonly :upload="false" />
  <BbImagesPicker v-model="readonlyImages" disabled :upload="false" />
</template>`
});
const playground = inject('baby-ui-playground') as { activeCode: import('vue').Ref<string>; setPreview: (payload: { title: string; code: string }) => void };
function previewCode(key: keyof typeof demoCodes, label: string) { playground.setPreview({ title: 'BbImagesPicker · ' + label, code: demoCodes[key] }); }
onMounted(() => previewCode('basic', '基础用法'));
const expandedCodes = ref<Record<string, boolean>>({});
function toggleCode(key: string) { expandedCodes.value[key] = !expandedCodes.value[key]; }
const copiedKey = ref('');
async function copyCode(key: string, code: string) {
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
  else { const textarea = document.createElement('textarea'); textarea.value = code; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); document.body.removeChild(textarea); }
  copiedKey.value = key;
  setTimeout(() => { copiedKey.value = ''; }, 1200);
}
const singleImage = ref<any[]>([]); const multiImages = ref<any[]>([]); const readonlyImages = ref(['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg']); const imageRef = ref<any>(null); const functionCount = ref(0);
function openFunctionImagesPicker() { showBbImagesPicker({ upload: false, multiple: true }).then((value) => { functionCount.value = value.length; }).catch(() => undefined); }
</script>
<template>
  <section class="doc-page" data-find-item="BbImagesPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbImagesPicker</h2><p>BbImagesPicker 用于头像、凭证、相册等图片选择场景。默认会调用全局 $uploadFile 上传；文档示例均设置 upload=false，避免依赖真实接口，此时组件通过 FileReader 返回 base64。multiple=false 适合单图，multiple=true 适合多图；readonly/disabled 会隐藏上传与删除入口，但仍可预览已存在图片。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('basic', '基础用法')">{{ playground.activeCode.value === demoCodes.basic ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.basic" class="demo-code-editor" :class="{ expanded: expandedCodes.basic, active: playground.activeCode.value === demoCodes.basic }" spellcheck="false" @focus="previewCode('basic', '基础用法')" @input="previewCode('basic', '基础用法')" /></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>图片数据，支持 URL 字符串或 { url } 对象数组；默认 []。</span></div><div class="api-item"><code>colNum</code><span>每行列数；number，默认 3。</span></div><div class="api-item"><code>multiple</code><span>是否多选；boolean，默认 false。</span></div><div class="api-item"><code>readonly / disabled</code><span>只读/禁用时不可新增删除；默认 false。</span></div><div class="api-item"><code>upload</code><span>是否调用 $uploadFile；boolean，默认 true，示例使用 false。</span></div><div class="api-item"><code>params / responseUrlKey / returnObject</code><span>上传参数、响应 URL 字段、是否返回对象；默认 {} / url_friendly_path / false。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>选择或删除图片后更新。</span></div><div class="api-item"><code>cancel</code><span>文件选择取消时触发。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>description</code><span>预览图下方说明，参数 item、index、modelIndex。</span></div></div></div><div class="doc-block"><h3>Methods / Expose</h3><div class="tag-list"><span class="doc-tag">triggerUpload()</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbImagesPicker(options)</code><span>函数式触发文件选择，resolve 图片列表，取消 reject(cancelError)。</span></div></div></div></section>
  <section class="demo-section"><h2>单图与手动 triggerUpload</h2><div class="legacy-inline-demo"><BbImagesPicker ref="imageRef" v-model="singleImage" :upload="false" :col-num="1" /><div class="action-row"><van-button size="small" type="primary" @click="imageRef?.triggerUpload()">triggerUpload()</van-button></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo1', '单图与手动 triggerUpload')">{{ playground.activeCode.value === demoCodes.demo1 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo1" class="demo-code-editor" :class="{ expanded: expandedCodes.demo1, active: playground.activeCode.value === demoCodes.demo1 }" spellcheck="false" @focus="previewCode('demo1', '单图与手动 triggerUpload')" @input="previewCode('demo1', '单图与手动 triggerUpload')" /></div></section>
  <section class="demo-section"><h2>多图与 description 插槽</h2><div class="legacy-inline-demo"><BbImagesPicker v-model="multiImages" :upload="false" multiple :col-num="3"><template #description="{ index }"><div class="image-desc">第 {{ index + 1 }} 张</div></template></BbImagesPicker></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo2', '多图与 description 插槽')">{{ playground.activeCode.value === demoCodes.demo2 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo2" class="demo-code-editor" :class="{ expanded: expandedCodes.demo2, active: playground.activeCode.value === demoCodes.demo2 }" spellcheck="false" @focus="previewCode('demo2', '多图与 description 插槽')" @input="previewCode('demo2', '多图与 description 插槽')" /></div></section>
  <section class="demo-section"><h2>函数式 API / readonly / disabled</h2><div class="legacy-inline-demo"><div class="action-row"><van-button size="small" plain type="primary" @click="openFunctionImagesPicker">函数式选择</van-button></div><p class="result-text">函数式选择数量：{{ functionCount }}</p><BbImagesPicker v-model="readonlyImages" readonly :upload="false" /><BbImagesPicker v-model="readonlyImages" disabled :upload="false" /></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo3', '函数式 API / readonly / disabled')">{{ playground.activeCode.value === demoCodes.demo3 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo3')">{{ expandedCodes.demo3 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo3', demoCodes.demo3)">{{ copiedKey === 'demo3' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo3" class="demo-code-editor" :class="{ expanded: expandedCodes.demo3, active: playground.activeCode.value === demoCodes.demo3 }" spellcheck="false" @focus="previewCode('demo3', '函数式 API / readonly / disabled')" @input="previewCode('demo3', '函数式 API / readonly / disabled')" /></div></section>
</template>
