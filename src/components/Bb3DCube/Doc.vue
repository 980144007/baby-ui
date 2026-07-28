<script lang="ts">
export const docMeta = {
  name: 'Bb3DCube',
  category: '展示',
  summary: '可通过鼠标或触摸拖动旋转的 3D 立方体文字效果。',
  order: 1,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import Bb3DCube from './Bb3DCube.vue';

defineOptions({ name: 'Bb3DCubeDoc' });

const textValue = ref('Baby UI');
</script>

<template>
  <section class="doc-page" data-find-item="Bb3DCube">
    <div class="doc-header"><p class="eyebrow">展示</p><h2>Bb3DCube</h2><p>可通过鼠标或触摸拖动旋转的 3D 立方体文字效果。</p></div>
    <div class="doc-block"><h3>基础用法</h3><pre><code>&lt;Bb3DCube text=&quot;Baby UI&quot; size=&quot;120px&quot; /&gt;</code></pre></div>
    <div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>text</code><span>立方体每个面的展示文字，默认空字符串。</span></div><div class="api-item"><code>size</code><span>立方体宽高，默认 200px。</span></div><div class="api-item"><code>fontSize</code><span>文字大小，默认 1.5em。</span></div><div class="api-item"><code>textColor</code><span>文字颜色或渐变背景，默认 #ffffff。</span></div></div></div>
  </section>
  <section class="demo-section"><h2>Bb3DCube 示例</h2><p class="hint">拖动或移动鼠标查看立方体旋转。</p><van-field v-model="textValue" label="文字" placeholder="请输入立方体文字" /><div class="cube-stage"><Bb3DCube :text="textValue" size="120px" font-size="18px" text-color="linear-gradient(90deg, #fff, #ffd3c2)" /></div></section>
</template>
