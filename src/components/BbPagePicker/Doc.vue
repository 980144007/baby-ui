<script lang="ts">
export const docMeta = {
  name: 'BbPagePicker',
  category: '表单',
  summary: '带分页刷新和加载更多能力的弹出式选择器。',
  order: 4,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbPagePicker from './BbPagePicker.vue';

defineOptions({ name: 'BbPagePickerDoc' });

const pagePickerValue = ref(['page-a']);
const pageOptions = [{ text: '第一页选项 A', value: 'page-a' }, { text: '第一页选项 B', value: 'page-b' }, { text: '第一页选项 C', value: 'page-c' }];
function onListRefresh() { return Promise.resolve(true); }
function onListLoadMore() { return Promise.resolve(true); }
</script>

<template>
  <section class="doc-page" data-find-item="BbPagePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbPagePicker</h2><p>带分页刷新和加载更多能力的弹出式选择器。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbPagePicker v-model=&quot;value&quot; :options=&quot;options&quot; :on-refresh=&quot;onRefresh&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>单选为单个值，多选为值数组。</span></div><div class="api-item"><code>options</code><span>选项数组，使用 text、value、disabled 字段。</span></div><div class="api-item"><code>multiple</code><span>是否多选。</span></div><div class="api-item"><code>onRefresh / onLoadMore</code><span>下拉刷新和上拉加载方法，返回 Promise。</span></div><div class="api-item"><code>clearable / readonly / border</code><span>清空、只读和边框展示控制。</span></div><div class="api-item"><code>title / placeholder / rules</code><span>弹窗标题、占位和校验规则。</span></div></div></div><div class="doc-block"><h3>v-model / Events / Slots</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">confirm</span><span class="doc-tag">onVisible</span><span class="doc-tag">default</span><span class="doc-tag">filter</span><span class="doc-tag">option</span></div></div></section>
  <section class="demo-section"><h2>BbPagePicker 示例</h2><BbPagePicker v-model="pagePickerValue" title="分页选择" :options="pageOptions" multiple clearable :on-refresh="onListRefresh" :on-load-more="onListLoadMore" placeholder="请选择分页项"><template #filter><div class="filter-tip">示例使用本地数据，不请求外部接口。</div></template></BbPagePicker><p class="result-text">当前值：{{ pagePickerValue.join('、') }}</p></section>
</template>
