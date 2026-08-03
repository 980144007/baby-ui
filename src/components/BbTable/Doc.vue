<script lang="ts">
export const docMeta = { name: 'BbTable', category: '数据展示', summary: '轻量表格渲染组件，支持 formatter/onClick、自动合计、二维分组 rowSpan、border 和 size。', order: 19 };
</script>
<script setup lang="ts">
import { ref, inject, onMounted, reactive } from 'vue';
import BbTable from './BbTable.vue';
defineOptions({ name: 'BbTableDoc' });
const demoCodes = reactive({
  basic: `<script setup lang="ts">
import { BbTable } from '@sunshine-baby/baby-ui';

const columns = [
  { title: '项目', prop: 'name' },
  { title: '数量', prop: 'count', needSummary: true },
];
const data = [
  { name: '喂奶', count: 6 },
  { name: '换尿布', count: 5 },
];
${'</scr' + 'ipt>'}

<template>
  <BbTable :columns="columns" :data-list="data" :auto-summary="1" size="small" border />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbTable } from '@sunshine-baby/baby-ui';

const clickText = ref('点击表格中的数值列查看反馈');
const basicColumns = [
  { title: '项目', prop: 'name' },
  {
    title: '今日',
    prop: 'today',
    formatter: (value: number) => \`\${value} 次\`,
    onClick: (value: number, row: any) => {
      clickText.value = \`\${row.name}：\${value}\`;
    },
  },
  { title: '本周', prop: 'week', needSummary: true },
];
const basicData = [
  { name: '喂奶', today: 6, week: 36 },
  { name: '换尿布', today: 5, week: 32 },
];
${'</scr' + 'ipt>'}

<template>
  <div class="table-scroll">
    <BbTable :columns="basicColumns" :data-list="basicData" size="small" border />
  </div>
  <p>{{ clickText }}</p>
</template>`,
  demo2: `<script setup lang="ts">
import { BbTable } from '@sunshine-baby/baby-ui';

const basicColumns = [
  { title: '项目', prop: 'name' },
  { title: '今日', prop: 'today', formatter: (value: number) => \`\${value} 次\` },
  { title: '本周', prop: 'week', needSummary: true },
];
const basicData = [
  { name: '喂奶', today: 6, week: 36 },
  { name: '换尿布', today: 5, week: 32 },
];
${'</scr' + 'ipt>'}

<template>
  <div class="table-scroll">
    <BbTable :columns="basicColumns" :data-list="basicData" :auto-summary="1" size="large" />
  </div>
</template>`,
  demo3: `<script setup lang="ts">
import { BbTable } from '@sunshine-baby/baby-ui';

const summaryColumns = [
  { title: '类别', prop: 'type', rowSpan: true },
  { title: '项目', prop: 'name' },
  { title: '数量', prop: 'count', needSummary: true },
  { title: '备注', prop: 'remark', formatter: (value: string) => \`<span style="color:#e96736">\${value}</span>\` },
];
const groupData = [
  [
    { type: '喂养', name: '母乳', count: 8, remark: '正常' },
    { type: '喂养', name: '辅食', count: 2, remark: '新增' },
  ],
  [
    { type: '睡眠', name: '白天', count: 3, remark: '短睡' },
    { type: '睡眠', name: '夜间', count: 9, remark: '稳定' },
  ],
];
${'</scr' + 'ipt>'}

<template>
  <div class="table-scroll">
    <BbTable :columns="summaryColumns" :data-list="groupData" :auto-summary="1" border size="small" />
  </div>
</template>`
});
const playground = inject('baby-ui-playground') as { activeCode: import('vue').Ref<string>; setPreview: (payload: { title: string; code: string }) => void };
function previewCode(key: keyof typeof demoCodes, label: string) { playground.setPreview({ title: 'BbTable · ' + label, code: demoCodes[key] }); }
onMounted(() => previewCode('basic', '基础用法'));
const expandedCodes = ref<Record<string, boolean>>({});
function toggleCode(key: string) { expandedCodes.value[key] = !expandedCodes.value[key]; }
const copiedKey = ref('');
async function copyCode(key: string, code: string) {
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
  else { const textarea = document.createElement('textarea'); textarea.value = code; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); document.body.removeChild(textarea); }
  copiedKey.value = key;
  setTimeout(() => { copiedKey.value = ''; }, 1200);
}
const clickText = ref('点击表格中的数值列查看反馈');
const basicColumns = [{ title: '项目', prop: 'name' }, { title: '今日', prop: 'today', formatter: (v: number) => `${v} 次`, onClick: (v: number, row: any) => { clickText.value = `${row.name}：${v}`; } }, { title: '本周', prop: 'week', needSummary: true }];
const basicData = [{ name: '喂奶', today: 6, week: 36 }, { name: '换尿布', today: 5, week: 32 }];
const summaryColumns = [{ title: '类别', prop: 'type', rowSpan: true }, { title: '项目', prop: 'name' }, { title: '数量', prop: 'count', needSummary: true }, { title: '备注', prop: 'remark', formatter: (v: string) => `<span style="color:#e96736">${v}</span>` }];
const groupData = [[{ type: '喂养', name: '母乳', count: 8, remark: '正常' }, { type: '喂养', name: '辅食', count: 2, remark: '新增' }], [{ type: '睡眠', name: '白天', count: 3, remark: '短睡' }, { type: '睡眠', name: '夜间', count: 9, remark: '稳定' }]];
</script>
<template>
  <section class="doc-page" data-find-item="BbTable"><div class="doc-header"><p class="eyebrow">数据展示</p><h2>BbTable</h2><p>BbTable 适合展示结构稳定、列数较少的数据摘要。columns 决定表头和单元格渲染，formatter 返回内容会通过 v-html 渲染，因此仅应格式化可信内容，不要拼接未经处理的用户输入。dataList 支持普通对象行，也支持二维数组分组；分组行结合 column.rowSpan 可实现首列跨行。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('basic', '基础用法')">{{ playground.activeCode.value === demoCodes.basic ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.basic" class="demo-code-editor" :class="{ expanded: expandedCodes.basic, active: playground.activeCode.value === demoCodes.basic }" spellcheck="false" @focus="previewCode('basic', '基础用法')" @input="previewCode('basic', '基础用法')" /></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>dataList</code><span>表格数据；array，支持对象行或二维分组数组，默认 []。</span></div><div class="api-item"><code>columns</code><span>列配置；array，支持 prop、title、formatter、onClick、needSummary、rowSpan、thProps、tdProps 等，默认 []。</span></div><div class="api-item"><code>border</code><span>是否显示边框；boolean，默认 true。</span></div><div class="api-item"><code>size</code><span>尺寸 small/large/normal；string，默认 small。</span></div><div class="api-item"><code>autoSummary</code><span>自动合计列数控制；number|string，开启后渲染总计/合计行。</span></div></div></div></section>
  <section class="demo-section"><h2>基础表格与 formatter / onClick</h2><div class="legacy-inline-demo"><div class="table-scroll"><BbTable :columns="basicColumns" :data-list="basicData" size="small" border /></div><p class="result-text">{{ clickText }}</p></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo1', '基础表格与 formatter / onClick')">{{ playground.activeCode.value === demoCodes.demo1 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo1" class="demo-code-editor" :class="{ expanded: expandedCodes.demo1, active: playground.activeCode.value === demoCodes.demo1 }" spellcheck="false" @focus="previewCode('demo1', '基础表格与 formatter / onClick')" @input="previewCode('demo1', '基础表格与 formatter / onClick')" /></div></section>
  <section class="demo-section"><h2>autoSummary 自动合计</h2><div class="legacy-inline-demo"><div class="table-scroll"><BbTable :columns="basicColumns" :data-list="basicData" :auto-summary="1" size="large" /></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo2', 'autoSummary 自动合计')">{{ playground.activeCode.value === demoCodes.demo2 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo2" class="demo-code-editor" :class="{ expanded: expandedCodes.demo2, active: playground.activeCode.value === demoCodes.demo2 }" spellcheck="false" @focus="previewCode('demo2', 'autoSummary 自动合计')" @input="previewCode('demo2', 'autoSummary 自动合计')" /></div></section>
  <section class="demo-section"><h2>二维分组 + rowSpan / border / size</h2><div class="legacy-inline-demo"><div class="table-scroll"><BbTable :columns="summaryColumns" :data-list="groupData" :auto-summary="1" border size="small" /></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo3', '二维分组 + rowSpan / border / size')">{{ playground.activeCode.value === demoCodes.demo3 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo3')">{{ expandedCodes.demo3 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo3', demoCodes.demo3)">{{ copiedKey === 'demo3' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo3" class="demo-code-editor" :class="{ expanded: expandedCodes.demo3, active: playground.activeCode.value === demoCodes.demo3 }" spellcheck="false" @focus="previewCode('demo3', '二维分组 + rowSpan / border / size')" @input="previewCode('demo3', '二维分组 + rowSpan / border / size')" /></div></section>
</template>
