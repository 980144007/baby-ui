<script lang="ts">
export const docMeta = {
  name: 'BbDateRangePicker',
  category: '表单',
  summary: '独立日期范围弹窗选择器，适合直接受控弹出选择开始和结束日期。',
  order: 8,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbDateRangePicker from './BbDateRangePicker.vue';

defineOptions({ name: 'BbDateRangePickerDoc' });

type DateRangeValue = { startDate: string; endDate: string };
const dateRangeValue = ref<DateRangeValue>({ startDate: '2026-07-01', endDate: '2026-07-10' });
const dateRangePickerShow = ref(false);
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
</script>

<template>
  <section class="doc-page" data-find-item="BbDateRangePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbDateRangePicker</h2><p>独立日期范围弹窗选择器，适合直接受控弹出选择开始和结束日期。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbDateRangePicker v-model=&quot;range&quot; v-model:show=&quot;show&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>日期范围对象，包含 startDate 和 endDate。</span></div><div class="api-item"><code>show</code><span>控制日期范围弹窗显示。</span></div><div class="api-item"><code>title</code><span>弹窗标题，默认“选择日期范围”。</span></div><div class="api-item"><code>defaultIndex</code><span>默认激活的开始/结束日期面板。</span></div><div class="api-item"><code>minDate / maxDate</code><span>可选日期范围。</span></div></div></div><div class="doc-block"><h3>v-model / Events</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">v-model:show</span><span class="doc-tag">confirm</span></div></div></section>
  <section class="demo-section"><h2>BbDateRangePicker 示例</h2><div class="result-card">{{ dateRangeValue.startDate || '不限' }} 至 {{ dateRangeValue.endDate || '不限' }}</div><div class="action-row"><van-button size="small" type="primary" @click="dateRangePickerShow = true">打开日期范围选择器</van-button></div><BbDateRangePicker v-model="dateRangeValue" v-model:show="dateRangePickerShow" :min-date="minDate" :max-date="maxDate" /></section>
</template>
