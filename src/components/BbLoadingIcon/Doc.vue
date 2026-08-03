<script lang="ts">
export const docMeta = { name: 'BbLoadingIcon', category: '反馈', summary: '文字填充动画 loading 图标，支持默认文案、自定义 text、默认插槽和不同 size。', order: 13 };
</script>
<script setup lang="ts">
import { ref, inject, onMounted, reactive } from 'vue';
import BbLoadingIcon from './BbLoadingIcon.vue';
defineOptions({ name: 'BbLoadingIconDoc' });
const demoCodes = reactive({
  basic: `<script setup lang="ts">
import { BbLoadingIcon } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <BbLoadingIcon size="26px" text="Loading" />
</template>`,
  demo1: `<script setup lang="ts">
import { BbLoadingIcon } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <div class="action-row">
    <BbLoadingIcon size="26px" />
    <BbLoadingIcon size="26px" type="2" />
    <BbLoadingIcon size="26px" text="Loading" />
  </div>
</template>`,
  demo2: `<script setup lang="ts">
import { BbLoadingIcon } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <div class="action-row">
    <BbLoadingIcon size="18px">WAIT</BbLoadingIcon>
    <BbLoadingIcon size="32px">BABY</BbLoadingIcon>
    <BbLoadingIcon size="42px" text="Homa" />
  </div>
</template>`
});
const playground = inject('baby-ui-playground') as { activeCode: import('vue').Ref<string>; setPreview: (payload: { title: string; code: string }) => void };
function previewCode(key: keyof typeof demoCodes, label: string) { playground.setPreview({ title: 'BbLoadingIcon · ' + label, code: demoCodes[key] }); }
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
</script>
<template>
  <section class="doc-page" data-find-item="BbLoadingIcon"><div class="doc-header"><p class="eyebrow">反馈</p><h2>BbLoadingIcon</h2><p>BbLoadingIcon 是一个轻量文字动画 loading，用渐变填充文字制造加载效果。适合列表 loading 插槽、局部模块等待状态或品牌化加载提示。text 优先级高于 type 的默认文案；若提供默认插槽，插槽内容会覆盖 text/type。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('basic', '基础用法')">{{ playground.activeCode.value === demoCodes.basic ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.basic" class="demo-code-editor" :class="{ expanded: expandedCodes.basic, active: playground.activeCode.value === demoCodes.basic }" spellcheck="false" @focus="previewCode('basic', '基础用法')" @input="previewCode('basic', '基础用法')" /></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>size</code><span>文字大小；string，默认 28px。</span></div><div class="api-item"><code>text</code><span>自定义 loading 文本；默认空。</span></div><div class="api-item"><code>type</code><span>无 text 时控制默认文案，type='1' 为 Homa，否则为 ●●●；默认 1。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>覆盖默认 loading 文本。</span></div></div></div></section>
  <section class="demo-section"><h2>默认 type 与自定义 text</h2><div class="legacy-inline-demo"><div class="action-row"><BbLoadingIcon size="26px" /><BbLoadingIcon size="26px" type="2" /><BbLoadingIcon size="26px" text="Loading" /></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo1', '默认 type 与自定义 text')">{{ playground.activeCode.value === demoCodes.demo1 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo1" class="demo-code-editor" :class="{ expanded: expandedCodes.demo1, active: playground.activeCode.value === demoCodes.demo1 }" spellcheck="false" @focus="previewCode('demo1', '默认 type 与自定义 text')" @input="previewCode('demo1', '默认 type 与自定义 text')" /></div></section>
  <section class="demo-section"><h2>slot 与不同 size</h2><div class="legacy-inline-demo"><div class="action-row"><BbLoadingIcon size="18px">WAIT</BbLoadingIcon><BbLoadingIcon size="32px">BABY</BbLoadingIcon><BbLoadingIcon size="42px" text="Homa" /></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo2', 'slot 与不同 size')">{{ playground.activeCode.value === demoCodes.demo2 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo2" class="demo-code-editor" :class="{ expanded: expandedCodes.demo2, active: playground.activeCode.value === demoCodes.demo2 }" spellcheck="false" @focus="previewCode('demo2', 'slot 与不同 size')" @input="previewCode('demo2', 'slot 与不同 size')" /></div></section>
</template>
