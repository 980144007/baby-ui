<script lang="ts">
export const docMeta = { name: 'BbTable', category: '数据展示', summary: '轻量表格渲染组件，支持 formatter/onClick、自动合计、二维分组 rowSpan、border 和 size。', order: 19 };
</script>
<script setup lang="ts">
import { ref } from 'vue';
import BbTable from './BbTable.vue';
defineOptions({ name: 'BbTableDoc' });
const clickText = ref('点击表格中的数值列查看反馈');
const basicColumns = [{ title: '项目', prop: 'name' }, { title: '今日', prop: 'today', formatter: (v: number) => `${v} 次`, onClick: (v: number, row: any) => { clickText.value = `${row.name}：${v}`; } }, { title: '本周', prop: 'week', needSummary: true }];
const basicData = [{ name: '喂奶', today: 6, week: 36 }, { name: '换尿布', today: 5, week: 32 }];
const summaryColumns = [{ title: '类别', prop: 'type', rowSpan: true }, { title: '项目', prop: 'name' }, { title: '数量', prop: 'count', needSummary: true }, { title: '备注', prop: 'remark', formatter: (v: string) => `<span style="color:#e96736">${v}</span>` }];
const groupData = [[{ type: '喂养', name: '母乳', count: 8, remark: '正常' }, { type: '喂养', name: '辅食', count: 2, remark: '新增' }], [{ type: '睡眠', name: '白天', count: 3, remark: '短睡' }, { type: '睡眠', name: '夜间', count: 9, remark: '稳定' }]];
</script>
<template>
  <section class="doc-page" data-find-item="BbTable"><div class="doc-header"><p class="eyebrow">数据展示</p><h2>BbTable</h2><p>BbTable 适合展示结构稳定、列数较少的数据摘要。columns 决定表头和单元格渲染，formatter 返回内容会通过 v-html 渲染，因此仅应格式化可信内容，不要拼接未经处理的用户输入。dataList 支持普通对象行，也支持二维数组分组；分组行结合 column.rowSpan 可实现首列跨行。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbTable :columns=&quot;columns&quot; :data-list=&quot;data&quot; :auto-summary=&quot;1&quot; size=&quot;small&quot; border /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>dataList</code><span>表格数据；array，支持对象行或二维分组数组，默认 []。</span></div><div class="api-item"><code>columns</code><span>列配置；array，支持 prop、title、formatter、onClick、needSummary、rowSpan、thProps、tdProps 等，默认 []。</span></div><div class="api-item"><code>border</code><span>是否显示边框；boolean，默认 true。</span></div><div class="api-item"><code>size</code><span>尺寸 small/large/normal；string，默认 small。</span></div><div class="api-item"><code>autoSummary</code><span>自动合计列数控制；number|string，开启后渲染总计/合计行。</span></div></div></div></section>
  <section class="demo-section"><h2>基础表格与 formatter / onClick</h2><div class="table-scroll"><BbTable :columns="basicColumns" :data-list="basicData" size="small" border /></div><p class="result-text">{{ clickText }}</p></section>
  <section class="demo-section"><h2>autoSummary 自动合计</h2><div class="table-scroll"><BbTable :columns="basicColumns" :data-list="basicData" :auto-summary="1" size="large" /></div></section>
  <section class="demo-section"><h2>二维分组 + rowSpan / border / size</h2><div class="table-scroll"><BbTable :columns="summaryColumns" :data-list="groupData" :auto-summary="1" border size="small" /></div></section>
</template>
