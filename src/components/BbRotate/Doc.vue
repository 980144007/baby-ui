<script lang="ts">
export const docMeta = {
  name: 'BbRotate',
  category: '浮层',
  summary: '可拖拽的旋转屏幕浮动按钮，支持记忆位置。',
  order: 14,
};
</script>

<script setup lang="ts">
import BbRotate from './BbRotate.vue';

defineOptions({ name: 'BbRotateDoc' });
</script>

<template>
  <section class="doc-page" data-find-item="BbRotate"><div class="doc-header"><p class="eyebrow">浮层</p><h2>BbRotate</h2><p>可拖拽的旋转屏幕浮动按钮，支持记忆位置。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbRotate remember-position position-key=&quot;page-rotate&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>right / bottom</code><span>初始定位。</span></div><div class="api-item"><code>rememberPosition</code><span>是否保存拖拽后的位置。</span></div><div class="api-item"><code>positionKey</code><span>位置保存 key。</span></div><div class="api-item"><code>zIndex</code><span>层级。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>自定义按钮内容。</span></div></div></div></section>
  <section class="demo-section"><h2>BbRotate 示例</h2><p class="hint">固定在当前视口右下角的圆形浮动按钮。</p><BbRotate right="18px" bottom="92px" z-index="20" remember-position position-key="playground-rotate" /></section>
</template>
