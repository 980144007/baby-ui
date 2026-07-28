<script lang="ts">
export const docMeta = {
  name: 'BbFloatingButton',
  category: '浮层',
  summary: '固定定位的圆形浮动按钮容器。',
  order: 15,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbFloatingButton from './BbFloatingButton.vue';

defineOptions({ name: 'BbFloatingButtonDoc' });

const floatingCount = ref(0);
</script>

<template>
  <section class="doc-page" data-find-item="BbFloatingButton"><div class="doc-header"><p class="eyebrow">浮层</p><h2>BbFloatingButton</h2><p>固定定位的圆形浮动按钮容器。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbFloatingButton text=&quot;操作&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>text</code><span>默认按钮文案。</span></div><div class="api-item"><code>right / bottom</code><span>定位。</span></div><div class="api-item"><code>size</code><span>按钮尺寸。</span></div><div class="api-item"><code>zIndex</code><span>层级。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>替换默认按钮内容。</span></div></div></div></section>
  <section class="demo-section"><h2>BbFloatingButton 示例</h2><div class="floating-card"><BbFloatingButton><van-button class="floating-button inline-floating" size="small" type="primary" @click="floatingCount++">浮动 {{ floatingCount }}</van-button></BbFloatingButton></div></section>
</template>
