<script lang="ts">
export const docMeta = {
  name: 'BbLoadingIcon',
  category: '反馈',
  summary: '文字填充动画 loading 图标。',
  order: 13,
};
</script>

<script setup lang="ts">
import BbLoadingIcon from './BbLoadingIcon.vue';

defineOptions({ name: 'BbLoadingIconDoc' });
</script>

<template>
  <section class="doc-page" data-find-item="BbLoadingIcon"><div class="doc-header"><p class="eyebrow">反馈</p><h2>BbLoadingIcon</h2><p>文字填充动画 loading 图标。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbLoadingIcon size=&quot;26px&quot; text=&quot;Loading&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>size</code><span>图标文字大小，默认 28px。</span></div><div class="api-item"><code>text</code><span>自定义 loading 文本。</span></div><div class="api-item"><code>type</code><span>无 text 时控制默认文案，1 为 Homa，否则为 ●●●。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>覆盖默认 loading 文本。</span></div></div></div></section>
  <section class="demo-section"><h2>BbLoadingIcon 示例</h2><BbLoadingIcon size="26px" text="Loading" /></section>
</template>
