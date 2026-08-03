<script lang="ts">
export const docMeta = { name: 'BbDateRangeFieldPicker', category: '表单', summary: '日期范围字段选择器，支持三种字段形态、受控弹窗和函数式调用。', order: 7 };
</script>

<script setup lang="ts">
import { ref, inject, onMounted, reactive } from 'vue';
import { BbDateRangeFieldPicker, showBbDateRangePicker } from './index';

defineOptions({ name: 'BbDateRangeFieldPickerDoc' });
const demoCodes = reactive({
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangeFieldPicker } from '@sunshine-baby/baby-ui';

const range = ref({ startDate: '2026-07-01', endDate: '2026-07-10' });
${'</scr' + 'ipt>'}

<template>
  <BbDateRangeFieldPicker v-model="range" mode="2" :labels="['开始', '结束']" />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangeFieldPicker } from '@sunshine-baby/baby-ui';

type DateRangeValue = { startDate: string; endDate: string };
const range1 = ref<DateRangeValue>({ startDate: '2026-07-01', endDate: '2026-07-10' });
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
const textFormatter = (value: string) => value || '请选择';
function onConfirm(value: DateRangeValue) {
  console.log(\`确认：\${value.startDate || '不限'} 至 \${value.endDate || '不限'}\`);
}
${'</scr' + 'ipt>'}

<template>
  <BbDateRangeFieldPicker
    v-model="range1"
    mode="1"
    :labels="['统计周期', '']"
    :text-formatter="textFormatter"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
  />
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangeFieldPicker, showBbDateRangePicker } from '@sunshine-baby/baby-ui';

type DateRangeValue = { startDate: string; endDate: string };
const range2 = ref<DateRangeValue>({ startDate: '2026-08-01', endDate: '2026-08-15' });
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
function openFunctionDateRangePicker() {
  showBbDateRangePicker({ modelValue: range2.value, minDate, maxDate }).then((value: DateRangeValue) => {
    range2.value = value;
  });
}
${'</scr' + 'ipt>'}

<template>
  <BbDateRangeFieldPicker
    v-model="range2"
    mode="2"
    :min-date="minDate"
    :max-date="maxDate"
  />
  <div class="action-row">
    <van-button size="small" type="primary" @click="openFunctionDateRangePicker">函数式打开</van-button>
  </div>
</template>`,
  demo3: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDateRangeFieldPicker } from '@sunshine-baby/baby-ui';

type DateRangeValue = { startDate: string; endDate: string };
const range3 = ref<DateRangeValue>({ startDate: '2026-09-01', endDate: '2026-09-20' });
const show = ref(false);
const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);
${'</scr' + 'ipt>'}

<template>
  <BbDateRangeFieldPicker
    v-model="range3"
    mode="3"
    :labels="['请选择日期范围']"
    :min-date="minDate"
    :max-date="maxDate"
  />
  <div class="action-row">
    <van-button size="small" type="primary" @click="show = true">受控打开隐藏弹窗</van-button>
  </div>
  <BbDateRangeFieldPicker
    v-model="range3"
    v-model:show="show"
    :show-field="false"
    :min-date="minDate"
    :max-date="maxDate"
  />
</template>`
});
const playground = inject('baby-ui-playground') as { activeCode: import('vue').Ref<string>; setPreview: (payload: { title: string; code: string }) => void };
function previewCode(key: keyof typeof demoCodes, label: string) { playground.setPreview({ title: 'BbDateRangeFieldPicker · ' + label, code: demoCodes[key] }); }
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
  <section class="doc-page" data-find-item="BbDateRangeFieldPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbDateRangeFieldPicker</h2><p>BbDateRangeFieldPicker 将日期范围弹窗和字段入口组合在一起，适合筛选栏、表单日期区间、统计周期选择等场景。modelValue 是包含 startDate/endDate 的对象；mode=1 是紧凑横向区间，mode=2 是双字段布局，mode=3 是单输入框布局。showField=false 可作为函数式或外部按钮触发的隐藏字段弹窗使用。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('basic', '基础用法')">{{ playground.activeCode.value === demoCodes.basic ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.basic" class="demo-code-editor" :class="{ expanded: expandedCodes.basic, active: playground.activeCode.value === demoCodes.basic }" spellcheck="false" @focus="previewCode('basic', '基础用法')" @input="previewCode('basic', '基础用法')" /></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>范围对象 { startDate, endDate }；默认两个字段为 null。</span></div><div class="api-item"><code>show / showField</code><span>受控弹窗显示、是否渲染字段；默认 undefined / true。</span></div><div class="api-item"><code>mode</code><span>字段展示模式 1/2/3；number|string，默认 1。</span></div><div class="api-item"><code>labels</code><span>开始/结束文案；array，默认 ['开始时间','结束时间']。</span></div><div class="api-item"><code>textFormatter</code><span>展示文本格式化函数；默认原样返回。</span></div><div class="api-item"><code>minDate / maxDate / disabled</code><span>可选日期范围和禁用状态；默认近 10 年至今天。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue / update:show</code><span>范围值或弹窗状态变化。</span></div><div class="api-item"><code>confirm</code><span>确认时返回 { startDate, endDate }。</span></div><div class="api-item"><code>cancel / closed</code><span>当前包装组件声明了事件；closed 在受控关闭时触发。</span></div></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbDateRangePicker(options)</code><span>函数式打开范围选择，确认 resolve(range)，取消 reject(cancelError)，返回 Promise 并带 close()。</span></div><div class="api-item"><code>showBbDateRangeFieldPicker(options)</code><span>同 showBbDateRangePicker。</span></div></div></div></section>
  <section class="demo-section"><h2>mode 1 / labels / textFormatter</h2><div class="legacy-inline-demo"><BbDateRangeFieldPicker v-model="range1" mode="1" :labels="['统计周期', '']" :text-formatter="textFormatter" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><p class="result-text">{{ eventText }}</p></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo1', 'mode 1 / labels / textFormatter')">{{ playground.activeCode.value === demoCodes.demo1 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo1" class="demo-code-editor" :class="{ expanded: expandedCodes.demo1, active: playground.activeCode.value === demoCodes.demo1 }" spellcheck="false" @focus="previewCode('demo1', 'mode 1 / labels / textFormatter')" @input="previewCode('demo1', 'mode 1 / labels / textFormatter')" /></div></section>
  <section class="demo-section"><h2>mode 2 与函数式 API</h2><div class="legacy-inline-demo"><BbDateRangeFieldPicker v-model="range2" mode="2" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><div class="action-row"><van-button size="small" type="primary" @click="openFunctionDateRangePicker">函数式打开</van-button></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo2', 'mode 2 与函数式 API')">{{ playground.activeCode.value === demoCodes.demo2 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo2" class="demo-code-editor" :class="{ expanded: expandedCodes.demo2, active: playground.activeCode.value === demoCodes.demo2 }" spellcheck="false" @focus="previewCode('demo2', 'mode 2 与函数式 API')" @input="previewCode('demo2', 'mode 2 与函数式 API')" /></div></section>
  <section class="demo-section"><h2>mode 3 与受控 show</h2><div class="legacy-inline-demo"><BbDateRangeFieldPicker v-model="range3" mode="3" :labels="['请选择日期范围']" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /><div class="action-row"><van-button size="small" type="primary" @click="show = true">受控打开隐藏弹窗</van-button></div><BbDateRangeFieldPicker v-model="range3" v-model:show="show" :show-field="false" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" /></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo3', 'mode 3 与受控 show')">{{ playground.activeCode.value === demoCodes.demo3 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo3')">{{ expandedCodes.demo3 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo3', demoCodes.demo3)">{{ copiedKey === 'demo3' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo3" class="demo-code-editor" :class="{ expanded: expandedCodes.demo3, active: playground.activeCode.value === demoCodes.demo3 }" spellcheck="false" @focus="previewCode('demo3', 'mode 3 与受控 show')" @input="previewCode('demo3', 'mode 3 与受控 show')" /></div></section>
</template>
