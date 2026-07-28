<script lang="ts">
export const docMeta = {
  name: 'BbDateRangeFieldPicker',
  category: '表单',
  summary: '日期范围选择字段，内部弹出日期范围选择器。',
  order: 7,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangeFieldPicker, showBbDateRangePicker } from './index';

defineOptions({ name: 'BbDateRangeFieldPickerDoc' });

type DateRangeValue = { startDate: string; endDate: string };
const dateRangeValue = ref<DateRangeValue>({ startDate: '2026-07-01', endDate: '2026-07-10' });
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
function openFunctionDateRangePicker() {
  showBbDateRangePicker({ modelValue: dateRangeValue.value, minDate, maxDate }).then((value: DateRangeValue) => { dateRangeValue.value = value; }).catch(() => undefined);
}
</script>

<template>
  <section class="doc-page" data-find-item="BbDateRangeFieldPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbDateRangeFieldPicker</h2><p>日期范围选择字段，内部弹出日期范围选择器。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbDateRangeFieldPicker v-model=&quot;range&quot; mode=&quot;2&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>日期范围对象，包含 startDate 和 endDate。</span></div><div class="api-item"><code>show / showField</code><span>控制弹窗显示，以及是否渲染字段入口。</span></div><div class="api-item"><code>mode</code><span>展示模式：1 横向、2 双列、3 单输入框。</span></div><div class="api-item"><code>labels</code><span>开始/结束字段文案，默认开始时间、结束时间。</span></div><div class="api-item"><code>minDate / maxDate</code><span>可选日期范围。</span></div><div class="api-item"><code>textFormatter</code><span>展示文本格式化函数。</span></div></div></div><div class="doc-block"><h3>v-model / Events</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">v-model:show</span><span class="doc-tag">confirm</span><span class="doc-tag">closed</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbDateRangePicker(options)</code><span>函数式打开日期范围选择器，返回 Promise，并附带 close()。</span></div><div class="api-item"><code>showBbDateRangeFieldPicker(options)</code><span>showBbDateRangePicker 的别名。</span></div></div></div></section>
  <section class="demo-section"><h2>BbDateRangeFieldPicker 示例</h2><div class="result-card">{{ dateRangeValue.startDate || '不限' }} 至 {{ dateRangeValue.endDate || '不限' }}</div><BbDateRangeFieldPicker v-model="dateRangeValue" mode="2" :min-date="minDate" :max-date="maxDate" /><div class="action-row"><van-button size="small" type="primary" @click="openFunctionDateRangePicker">函数式 API</van-button></div></section>
</template>
