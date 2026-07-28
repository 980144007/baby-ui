<script lang="ts">
export const docMeta = {
  name: 'BbTable',
  category: '数据展示',
  summary: '简单表格渲染组件，支持格式化、行列属性、列点击和自动合计。',
  order: 19,
};
</script>

<script setup lang="ts">
import BbTable from './BbTable.vue';

defineOptions({ name: 'BbTableDoc' });

const tableColumns = [{ title: '项目', prop: 'name' }, { title: '今日', prop: 'today', needSummary: true }, { title: '本周', prop: 'week', needSummary: true }];
const tableData = [{ name: '喂奶次数', today: 6, week: 36 }, { name: '睡眠小时', today: 12, week: 82 }];
</script>

<template>
  <section class="doc-page" data-find-item="BbTable"><div class="doc-header"><p class="eyebrow">数据展示</p><h2>BbTable</h2><p>简单表格渲染组件，支持格式化、行列属性、列点击和自动合计。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbTable :columns=&quot;columns&quot; :data-list=&quot;data&quot; :auto-summary=&quot;1&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>dataList</code><span>表格数据，支持对象行和数组分组行。</span></div><div class="api-item"><code>columns</code><span>列配置，支持 prop、title、formatter、onClick、needSummary、rowSpan 等。</span></div><div class="api-item"><code>border</code><span>是否显示边框。</span></div><div class="api-item"><code>size</code><span>尺寸，支持 small / large。</span></div><div class="api-item"><code>autoSummary</code><span>开启自动合计，首列按该值设置 colspan。</span></div></div></div></section>
  <section class="demo-section"><h2>BbTable 示例</h2><div class="table-scroll"><BbTable :columns="tableColumns" :data-list="tableData" size="small" :auto-summary="1" /></div></section>
</template>
