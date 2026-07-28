<script lang="ts">
export const docMeta = { name: 'BbDateRangeFieldPicker', category: '表单', summary: '日期范围字段选择器，支持三种字段形态、受控弹窗和函数式调用。', order: 7 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangeFieldPicker, showBbDateRangePicker } from './index';

defineOptions({ name: 'BbDateRangeFieldPickerDoc' });
type DateRangeValue = { startDate: string; endDate: string };
const range1 = ref<DateRangeValue>({ startDate: '2026-07-01', endDate: '2026-07-10' });
const range2 = ref<DateRangeValue>({ startDate: '2026-08-01', endDate: '2026-08-15' });
const range3 = ref<DateRangeValue>({ startDate: '2026-09-01', endDate: '2026-09-20' });
const show = ref(false);
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
const eventText = ref('尚未确认');
const textFormatter = (value: string) => value || '请选择';
function onConfirm(value: DateRangeValue) { eventText.value = `确认：${value.startDate || '不限'} 至 ${value.endDate || '不限'}`; }
function openFunctionDateRangePicker() { showBbDateRangePicker({ modelValue: range1.value, minDate, maxDate }).then((value: DateRangeValue) => { range1.value = value; onConfirm(value); }).catch(() => { eventText.value = '函数式选择已取消'; }); }
</script>

<template>
  <section class="doc-page" data-find-item="BbDateRangeFieldPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbDateRangeFieldPicker</h2><p>BbDateRangeFieldPicker 将日期范围弹窗和字段入口组合在一起，适合筛选栏、表单日期区间、统计周期选择等场景。modelValue 是包含 startDate/endDate 的对象；mode=1 是紧凑横向区间，mode=2 是双字段布局，mode=3 是单输入框布局。showField=false 可作为函数式或外部按钮触发的隐藏字段弹窗使用。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbDateRangeFieldPicker v-model=&quot;range&quot; mode=&quot;2&quot; :labels=&quot;['开始', '结束']&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>范围对象 { startDate, endDate }；默认两个字段为 null。</span></div><div class="api-item"><code>show / showField</code><span>受控弹窗显示、是否渲染字段；默认 undefined / true。</span></div><div class="api-item"><code>mode</code><span>字段展示模式 1/2/3；number|string，默认 1。</span></div><div class="api-item"><code>labels</code><span>开始/结束文案；array，默认 ['开始时间','结束时间']。</span></div><div class="api-item"><code>textFormatter</code><span>展示文本格式化函数；默认原样返回。</span></div><div class="api-item"><code>minDate / maxDate / disabled</code><span>可选日期范围和禁用状态；默认近 10 年至今天。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue / update:show</code><span>范围值或弹窗状态变化。</span></div><div class="api-item"><code>confirm</code><span>确认时返回 { startDate, endDate }。</span></div><div class="api-item"><code>cancel / closed</code><span>当前包装组件声明了事件；closed 在受控关闭时触发。</span></div></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbDateRangePicker(options)</code><span>函数式打开范围选择，确认 resolve(range)，取消 reject(cancelError)，返回 Promise 并带 close()。</span></div><div class="api-item"><code>showBbDateRangeFieldPicker(options)</code><span>同 showBbDateRangePicker。</span></div></div></div></section>
  <section class="demo-section"><h2>mode 1 / labels / textFormatter</h2><BbDateRangeFieldPicker v-model="range1" mode="1" :labels="['统计周期', '']" :text-formatter="textFormatter" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><p class="result-text">{{ eventText }}</p></section>
  <section class="demo-section"><h2>mode 2 与函数式 API</h2><BbDateRangeFieldPicker v-model="range2" mode="2" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><div class="action-row"><van-button size="small" type="primary" @click="openFunctionDateRangePicker">函数式打开</van-button></div></section>
  <section class="demo-section"><h2>mode 3 与受控 show</h2><BbDateRangeFieldPicker v-model="range3" mode="3" :labels="['请选择日期范围']" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><div class="action-row"><van-button size="small" type="primary" @click="show = true">受控打开隐藏弹窗</van-button></div><BbDateRangeFieldPicker v-model="range3" v-model:show="show" :show-field="false" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /></section>
</template>
