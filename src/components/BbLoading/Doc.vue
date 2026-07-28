<script lang="ts">
export const docMeta = {
  name: 'BbLoading',
  category: '反馈',
  summary: '注册 Vant Loading 为 BbLoading，并提供全局 $loading 遮罩控制。',
  order: 12,
};
</script>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import BbLoadingPlugin from './index';

defineOptions({ name: 'BbLoadingDoc' });

type LoadingApi = { open: () => void; close: () => void };
const loadingText = ref('点击按钮体验遮罩加载');
const loadingApi = inject<LoadingApi>('$loading');
const hasLoadingPlugin = computed(() => Boolean(BbLoadingPlugin));
function openLoading() { loadingApi?.open(); loadingText.value = '加载中，1 秒后自动关闭'; window.setTimeout(() => { loadingApi?.close(); loadingText.value = '遮罩加载已关闭'; }, 1000); }
</script>

<template>
  <section class="doc-page" data-find-item="BbLoading"><div class="doc-header"><p class="eyebrow">反馈</p><h2>BbLoading</h2><p>注册 Vant Loading 为 BbLoading，并提供全局 $loading 遮罩控制。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbLoading size=&quot;24px&quot; type=&quot;spinner&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>Vant Loading props</code><span>组件本体使用 Vant Loading 的属性。</span></div></div></div><div class="doc-block"><h3>Methods</h3><div class="tag-list"><span class="doc-tag">$loading.open()</span><span class="doc-tag">$loading.close(num)</span><span class="doc-tag">$loading.clear()</span></div></div></section>
  <section class="demo-section"><h2>BbLoading 示例</h2><div class="action-row"><BbLoading size="24px" type="spinner" /><van-button size="small" type="primary" :disabled="!hasLoadingPlugin" @click="openLoading">打开遮罩加载</van-button></div><p class="result-text">{{ loadingText }}</p></section>
</template>
