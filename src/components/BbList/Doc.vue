<script lang="ts">
export const docMeta = {
  name: 'BbList',
  category: '数据展示',
  summary: '基于下拉刷新和上拉加载的列表容器，支持内部或外部受控状态。',
  order: 11,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbList from './BbList.vue';

defineOptions({ name: 'BbListDoc' });

const listItems = ref(['出生信息', '喂养记录', '睡眠记录', '成长曲线']);
const listFinished = ref(true);
function onListRefresh() { listItems.value = ['刷新后的出生信息', '刷新后的喂养记录', '刷新后的睡眠记录']; listFinished.value = true; return Promise.resolve(true); }
function onListLoadMore() { return Promise.resolve(true); }
</script>

<template>
  <section class="doc-page" data-find-item="BbList"><div class="doc-header"><p class="eyebrow">数据展示</p><h2>BbList</h2><p>基于下拉刷新和上拉加载的列表容器，支持内部或外部受控状态。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbList :on-refresh=&quot;onRefresh&quot; :on-load-more=&quot;onLoadMore&quot;&gt;...&lt;/BbList&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>onRefresh / onLoadMore</code><span>刷新和加载更多方法，返回 Promise。</span></div><div class="api-item"><code>refreshing / loadingMore / finished</code><span>可外部控制的加载状态。</span></div><div class="api-item"><code>autoLoad</code><span>是否自动触发加载。</span></div><div class="api-item"><code>useBackTop</code><span>是否显示返回顶部。</span></div><div class="api-item"><code>errorText / hideNoMore / delay</code><span>错误文案、无更多展示和延迟控制。</span></div></div></div><div class="doc-block"><h3>v-model / Slots / Methods</h3><div class="tag-list"><span class="doc-tag">v-model:refreshing</span><span class="doc-tag">v-model:loadingMore</span><span class="doc-tag">v-model:finished</span><span class="doc-tag">default</span><span class="doc-tag">refresh()</span><span class="doc-tag">check(isSingle)</span></div></div></section>
  <section class="demo-section"><h2>BbList 示例</h2><div class="fixed-height-demo"><BbList :auto-load="false" :finished="listFinished" :on-refresh="onListRefresh" :on-load-more="onListLoadMore" :use-back-top="false"><van-cell v-for="item in listItems" :key="item" :title="item" /></BbList></div></section>
</template>
