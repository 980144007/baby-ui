<script lang="ts">
export const docMeta = { name: 'BbDateRangePicker', category: '表单', summary: '独立日期范围弹窗，适合由外部按钮受控打开并选择开始/结束日期。', order: 8 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbDateRangePicker from './BbDateRangePicker.vue';

defineOptions({ name: 'BbDateRangePickerDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangePicker } from '@sunshine-baby/baby-ui';

const range = ref({ startDate: '2026-07-01', endDate: '2026-07-10' });
const show = ref(false);
${'</scr' + 'ipt>'}

<template>
  <van-button type="primary" @click="show = true">选择日期范围</van-button>
  <BbDateRangePicker v-model="range" v-model:show="show" title="选择统计周期" :default-index="0" />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangePicker } from '@sunshine-baby/baby-ui';

type DateRangeValue = { startDate: string; endDate: string };
const range = ref<DateRangeValue>({ startDate: '2026-07-01', endDate: '2026-07-10' });
const showStart = ref(false);
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
function onConfirm(value: DateRangeValue) {
  console.log(\`确认：\${value.startDate || '不限'} 至 \${value.endDate || '不限'}\`);
}
${'</scr' + 'ipt>'}

<template>
  <div class="result-card">{{ range.startDate || '不限' }} 至 {{ range.endDate || '不限' }}</div>
  <div class="action-row">
    <van-button size="small" type="primary" @click="showStart = true">打开开始日期面板</van-button>
  </div>
  <BbDateRangePicker
    v-model="range"
    v-model:show="showStart"
    title="选择统计周期"
    :default-index="0"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
  />
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangePicker } from '@sunshine-baby/baby-ui';

type DateRangeValue = { startDate: string; endDate: string };
const rangeEnd = ref<DateRangeValue>({ startDate: '2026-08-01', endDate: '2026-08-20' });
const showEnd = ref(false);
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
${'</scr' + 'ipt>'}

<template>
  <div class="result-card">{{ rangeEnd.startDate || '不限' }} 至 {{ rangeEnd.endDate || '不限' }}</div>
  <div class="action-row">
    <van-button size="small" plain type="primary" @click="showEnd = true">打开结束日期面板</van-button>
  </div>
  <BbDateRangePicker
    v-model="rangeEnd"
    v-model:show="showEnd"
    title="调整结束日期"
    :default-index="1"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>`
};
const expandedCodes = ref<Record<string, boolean>>({});
function toggleCode(key: string) { expandedCodes.value[key] = !expandedCodes.value[key]; }
const copiedKey = ref('');
async function copyCode(key: string, code: string) {
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
  else { const textarea = document.createElement('textarea'); textarea.value = code; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); document.body.removeChild(textarea); }
  copiedKey.value = key;
  setTimeout(() => { copiedKey.value = ''; }, 1200);
}
type DateRangeValue = { startDate: string; endDate: string };
const range = ref<DateRangeValue>({ startDate: '2026-07-01', endDate: '2026-07-10' });
const rangeEnd = ref<DateRangeValue>({ startDate: '2026-08-01', endDate: '2026-08-20' });
const showStart = ref(false);
const showEnd = ref(false);
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
const eventText = ref('尚未确认');
function onConfirm(value: DateRangeValue) { eventText.value = `确认：${value.startDate || '不限'} 至 ${value.endDate || '不限'}`; }
</script>

<template>
  <section class="doc-page" data-find-item="BbDateRangePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbDateRangePicker</h2><p>BbDateRangePicker 是纯弹窗形态的日期范围选择器，不渲染字段入口，适合筛选按钮、弹窗表单或工具栏中由外部控制显示。内部包含开始日期和结束日期两个日期面板，并提供“清空”选项；确认后通过 v-model 更新 { startDate, endDate }，清空时两个字段为空字符串。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>通过 defineModel 接收范围对象 { startDate, endDate }；默认空字符串字段。</span></div><div class="api-item"><code>show</code><span>通过 v-model:show 控制弹窗显示。</span></div><div class="api-item"><code>title</code><span>弹窗标题；string，默认“选择日期范围”。</span></div><div class="api-item"><code>defaultIndex</code><span>默认激活的面板，0 为开始日期，1 为结束日期；默认 0。</span></div><div class="api-item"><code>minDate / maxDate</code><span>可选日期范围；默认近 10 年至今天。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>确认后更新范围值。</span></div><div class="api-item"><code>update:show</code><span>弹窗显示状态变化。</span></div><div class="api-item"><code>confirm</code><span>确认后返回 { startDate, endDate }。</span></div></div></div></section>
  <section class="demo-section"><h2>受控弹窗与 confirm 事件</h2><div class="result-card">{{ range.startDate || '不限' }} 至 {{ range.endDate || '不限' }}</div><div class="action-row"><van-button size="small" type="primary" @click="showStart = true">打开开始日期面板</van-button></div><BbDateRangePicker v-model="range" v-model:show="showStart" title="选择统计周期" :default-index="0" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><p class="result-text">{{ eventText }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>title / defaultIndex 指向结束日期</h2><div class="result-card">{{ rangeEnd.startDate || '不限' }} 至 {{ rangeEnd.endDate || '不限' }}</div><div class="action-row"><van-button size="small" plain type="primary" @click="showEnd = true">打开结束日期面板</van-button></div><BbDateRangePicker v-model="rangeEnd" v-model:show="showEnd" title="调整结束日期" :default-index="1" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
