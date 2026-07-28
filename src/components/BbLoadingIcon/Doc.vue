<script lang="ts">
export const docMeta = { name: 'BbLoadingIcon', category: '反馈', summary: '文字填充动画 loading 图标，支持默认文案、自定义 text、默认插槽和不同 size。', order: 13 };
</script>
<script setup lang="ts">
import BbLoadingIcon from './BbLoadingIcon.vue';
defineOptions({ name: 'BbLoadingIconDoc' });
</script>
<template>
  <section class="doc-page" data-find-item="BbLoadingIcon"><div class="doc-header"><p class="eyebrow">反馈</p><h2>BbLoadingIcon</h2><p>BbLoadingIcon 是一个轻量文字动画 loading，用渐变填充文字制造加载效果。适合列表 loading 插槽、局部模块等待状态或品牌化加载提示。text 优先级高于 type 的默认文案；若提供默认插槽，插槽内容会覆盖 text/type。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbLoadingIcon size=&quot;26px&quot; text=&quot;Loading&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>size</code><span>文字大小；string，默认 28px。</span></div><div class="api-item"><code>text</code><span>自定义 loading 文本；默认空。</span></div><div class="api-item"><code>type</code><span>无 text 时控制默认文案，type='1' 为 Homa，否则为 ●●●；默认 1。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>覆盖默认 loading 文本。</span></div></div></div></section>
  <section class="demo-section"><h2>默认 type 与自定义 text</h2><div class="action-row"><BbLoadingIcon size="26px" /><BbLoadingIcon size="26px" type="2" /><BbLoadingIcon size="26px" text="Loading" /></div></section>
  <section class="demo-section"><h2>slot 与不同 size</h2><div class="action-row"><BbLoadingIcon size="18px">WAIT</BbLoadingIcon><BbLoadingIcon size="32px">BABY</BbLoadingIcon><BbLoadingIcon size="42px" text="Homa" /></div></section>
</template>
