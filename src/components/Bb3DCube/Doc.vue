<script lang="ts">
export const docMeta = {
  name: 'Bb3DCube',
  category: '展示',
  summary: '可通过鼠标移动或触摸拖动改变视角的 3D 立方体文字展示组件。',
  order: 1,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import Bb3DCube from './Bb3DCube.vue';

defineOptions({ name: 'Bb3DCubeDoc' });

const cubeText = ref('Baby UI');
const cubeSize = ref('120px');
const cubeColor = ref('linear-gradient(90deg, #fff, #ffd3c2)');
</script>

<template>
  <section class="doc-page" data-find-item="Bb3DCube">
    <div class="doc-header"><p class="eyebrow">展示</p><h2>Bb3DCube</h2><p>Bb3DCube 用于活动页、品牌露出或趣味化空状态，将同一段文字渲染到立方体的多个面上。组件会根据鼠标位置或触摸拖动实时调整旋转角度；建议放在有足够留白的容器中，移动端注意不要在可滚动密集区域内放置过大的尺寸。</p></div>
    <div class="doc-block"><h3>基础用法</h3><pre><code>&lt;Bb3DCube text=&quot;Baby UI&quot; size=&quot;120px&quot; font-size=&quot;18px&quot; text-color=&quot;#fff&quot; /&gt;</code></pre></div>
    <div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>text</code><span>立方体和每个面的展示文字；类型 string，默认空字符串。</span></div><div class="api-item"><code>size</code><span>立方体宽高，需带 CSS 单位；类型 string，默认 200px。</span></div><div class="api-item"><code>fontSize</code><span>文字大小；类型 string，默认 1.5em。</span></div><div class="api-item"><code>textColor</code><span>文字颜色或可用于 background-clip 的渐变；类型 string，默认 #ffffff。</span></div></div></div>
  </section>

  <section class="demo-section"><h2>基础展示</h2><p class="hint">移动鼠标或在移动端拖动立方体区域查看视角变化。</p><div class="cube-stage"><Bb3DCube text="Baby UI" size="120px" font-size="18px" text-color="#ffffff" /></div></section>
  <section class="demo-section"><h2>尺寸、颜色和文字可调</h2><van-field v-model="cubeText" label="文字" placeholder="请输入立方体文字" /><van-field v-model="cubeSize" label="尺寸" placeholder="例如 140px" /><van-field v-model="cubeColor" label="文字颜色" placeholder="支持颜色或渐变" /><div class="cube-stage"><Bb3DCube :text="cubeText" :size="cubeSize" font-size="20px" :text-color="cubeColor" /></div></section>
</template>
