<script lang="ts">
export const docMeta = {
  name: 'BbFloatingFind',
  category: '浮层',
  summary: '页面浮动查找工具，可在指定容器内定位匹配内容。',
  order: 16,
};
</script>

<script setup lang="ts">
import { BbFloatingFind } from './index.js';

defineOptions({ name: 'BbFloatingFindDoc' });
</script>

<template>
  <section class="doc-page" data-find-item="BbFloatingFind"><div class="doc-header"><p class="eyebrow">浮层</p><h2>BbFloatingFind</h2><p>页面浮动查找工具，可在指定容器内定位匹配内容。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbFloatingFind search-root=&quot;.demo-page&quot; remember-position /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>placeholder</code><span>搜索输入占位文案。</span></div><div class="api-item"><code>searchRoot</code><span>搜索根节点，可传选择器或元素。</span></div><div class="api-item"><code>candidateSelector</code><span>候选匹配元素选择器。</span></div><div class="api-item"><code>offsetTop</code><span>滚动定位顶部偏移。</span></div><div class="api-item"><code>right / bottom / zIndex</code><span>初始位置和层级。</span></div><div class="api-item"><code>rememberPosition / positionKey</code><span>是否记忆拖拽位置及保存 key。</span></div></div></div></section>
  <section class="demo-section"><h2>BbFloatingFind 示例</h2><p class="hint">点击右下角搜索按钮，输入“宝宝”“记录”等关键词，可在当前文档页内查找并滚动定位匹配内容。</p><div class="result-card" data-find-item>宝宝资料、喂养记录、睡眠记录和成长曲线都可作为查找候选内容。</div><BbFloatingFind search-root=".demo-page" remember-position position-key="playground-floating-find" :z-index="30" /></section>
</template>
