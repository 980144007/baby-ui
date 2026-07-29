<script lang="ts">
export const docMeta = { name: 'BbRotate', category: '浮层', summary: '可拖拽的旋转屏幕浮动按钮，支持默认按钮、自定义插槽和位置记忆。', order: 14 };
</script>
<script setup lang="ts">
import { ref } from 'vue';
import BbRotate from './BbRotate.vue';
defineOptions({ name: 'BbRotateDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { BbRotate } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <BbRotate :right="18" :bottom="92" remember-position position-key="page-rotate" />
</template>`,
  demo1: `<script setup lang="ts">
import { BbRotate } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <BbRotate
    :right="18"
    :bottom="92"
    remember-position
    position-key="playground-rotate-default"
  />
</template>`,
  demo2: `<script setup lang="ts">
import { BbRotate } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <BbRotate
    :right="18"
    :bottom="150"
    remember-position
    position-key="playground-rotate-custom"
  >
    <van-button size="mini" type="success" round>旋转</van-button>
  </BbRotate>
</template>`
};
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
  <section class="doc-page" data-find-item="BbRotate"><div class="doc-header"><p class="eyebrow">浮层</p><h2>BbRotate</h2><p>BbRotate 是面向横竖屏切换的悬浮操作按钮，默认按钮会调用设备信息 store 的 rotateScreen 方法。组件支持拖拽，rememberPosition=true 时会把拖拽后的位置保存到 localStorage；建议为不同页面设置稳定的 positionKey，避免多个浮层互相覆盖位置。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>right / bottom</code><span>距离视口右侧/底部的初始像素值；number|string，默认 18 / 92。</span></div><div class="api-item"><code>rememberPosition</code><span>是否记忆拖拽位置；boolean，默认 false。</span></div><div class="api-item"><code>positionKey</code><span>localStorage 保存 key；默认按当前 pathname 生成。</span></div><div class="api-item"><code>zIndex</code><span>浮层层级；number|string，默认 20。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>替换默认“旋转屏幕”按钮；拖拽仍由外层容器处理。</span></div></div></div></section>
  <section class="demo-section"><h2>默认按钮与记忆位置</h2><p class="hint">按钮固定在视口右下角，可拖拽；点击默认按钮会调用内部旋转方法。</p><BbRotate :right="18" :bottom="92" remember-position position-key="playground-rotate-default" /><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>自定义 slot</h2><p class="hint">自定义内容会替换默认按钮，但仍可拖拽并记忆位置。</p><BbRotate :right="18" :bottom="150" remember-position position-key="playground-rotate-custom"><van-button size="mini" type="success" round>旋转</van-button></BbRotate><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
