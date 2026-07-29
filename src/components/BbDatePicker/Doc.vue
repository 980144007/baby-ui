<script lang="ts">
export const docMeta = { name: 'BbDatePicker', category: '表单', summary: '基于 Vant DatePicker 的日期选择字段，确认后输出 YYYY-MM-DD 字符串。', order: 6 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbDatePicker, showBbDatePicker } from './index';

defineOptions({ name: 'BbDatePickerDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDatePicker } from '@sunshine-baby/baby-ui';

const date = ref('2026-07-10');
${'</scr' + 'ipt>'}

<template>
  <BbDatePicker v-model="date" label="生日" placeholder="请选择日期" />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDatePicker } from '@sunshine-baby/baby-ui';

const dateValue = ref('2026-07-10');
function onConfirm(value?: string) {
  console.log(value ? \`确认：\${value}\` : '已清空');
}
${'</scr' + 'ipt>'}

<template>
  <BbDatePicker v-model="dateValue" label="生日" placeholder="请选择生日" @confirm="onConfirm">
    <template #left-icon>
      <van-icon name="calendar-o" />
    </template>
  </BbDatePicker>
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbDatePicker, showBbDatePicker } from '@sunshine-baby/baby-ui';

const controlledValue = ref('2026-08-01');
const show = ref(false);

function openFunctionDatePicker() {
  showBbDatePicker({ modelValue: controlledValue.value }).then((value: string) => {
    controlledValue.value = value;
  });
}
${'</scr' + 'ipt>'}

<template>
  <div class="action-row">
    <van-button size="small" type="primary" @click="show = true">受控打开</van-button>
    <van-button size="small" plain type="primary" @click="openFunctionDatePicker">函数式打开</van-button>
  </div>
  <BbDatePicker v-model="controlledValue" v-model:show="show" :show-field="false" />
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
const dateValue = ref('2026-07-10');
const controlledValue = ref('2026-08-01');
const show = ref(false);
const eventText = ref('尚未操作');
function onConfirm(value?: string) { eventText.value = value ? `确认：${value}` : '已清空'; }
function openFunctionDatePicker() { showBbDatePicker({ modelValue: dateValue.value, label: '生日', placeholder: '请选择日期' }).then((value: string) => { dateValue.value = value; eventText.value = `函数式确认：${value}`; }).catch(() => { eventText.value = '函数式选择已取消'; }); }
</script>

<template>
  <section class="doc-page" data-find-item="BbDatePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbDatePicker</h2><p>BbDatePicker 用于生日、记录日期、计划日期等单日期选择。组件显示字段时会渲染只读 van-field，点击后从底部弹出日期选择器；确认输出 YYYY-MM-DD 字符串。showField=false 可仅保留弹窗，适合由外部按钮或函数式 API 控制。清空会把 modelValue 更新为空并触发 confirm。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>日期字符串，格式 YYYY-MM-DD；类型 string，默认空字符串。</span></div><div class="api-item"><code>show</code><span>受控弹窗显示状态；boolean，默认 undefined。</span></div><div class="api-item"><code>showField</code><span>是否渲染字段入口；boolean，默认 true。</span></div><div class="api-item"><code>readonly / disabled / clearable</code><span>只读、禁用、可清空；默认 false / false / true。</span></div><div class="api-item"><code>label / placeholder / name / rules / required</code><span>字段标签、占位、表单 name、校验规则和必填状态。</span></div><div class="api-item"><code>iconColor</code><span>清空图标颜色；string，默认空。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>确认或清空时更新日期。</span></div><div class="api-item"><code>update:show / onVisible</code><span>弹窗显示状态变化时触发。</span></div><div class="api-item"><code>confirm</code><span>确认时返回 YYYY-MM-DD；清空时无参数。</span></div><div class="api-item"><code>closed</code><span>弹窗关闭后触发。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>left-icon</code><span>字段左侧图标。</span></div></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbDatePicker(options)</code><span>函数式打开，确认 resolve(date)，取消 reject(cancelError)，返回 Promise 并带 close()。</span></div></div></div></section>
  <section class="demo-section"><h2>字段模式、left-icon 与清空</h2><BbDatePicker v-model="dateValue" label="生日" placeholder="请选择生日" @confirm="onConfirm"><template #left-icon><van-icon name="calendar-o" /></template></BbDatePicker><p class="result-text">{{ eventText }}；当前值：{{ dateValue || '未选择' }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>受控 show 与函数式 API</h2><div class="action-row"><van-button size="small" type="primary" @click="show = true">受控打开</van-button><van-button size="small" plain type="primary" @click="openFunctionDatePicker">函数式打开</van-button></div><BbDatePicker v-model="controlledValue" v-model:show="show" :show-field="false" @confirm="onConfirm" /><p class="result-text">受控值：{{ controlledValue }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
