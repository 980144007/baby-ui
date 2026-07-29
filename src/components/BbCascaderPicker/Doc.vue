<script lang="ts">
export const docMeta = { name: 'BbCascaderPicker', category: '表单', summary: '基于 Vant Cascader 的级联选择器，支持字段模式、自定义触发和清空反馈。', order: 5 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbCascaderPicker from './BbCascaderPicker.vue';

defineOptions({ name: 'BbCascaderPickerDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbCascaderPicker } from '@sunshine-baby/baby-ui';

const area = ref('pudong');
const options = [{ label: '上海', value: 'shanghai', children: [{ label: '浦东新区', value: 'pudong' }] }];
${'</scr' + 'ipt>'}

<template>
  <BbCascaderPicker v-model="area" type="input" label="地区" :options="options" />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbCascaderPicker } from '@sunshine-baby/baby-ui';

const inputValue = ref('pudong');
const options = [
  {
    label: '上海',
    value: 'shanghai',
    children: [{ label: '浦东新区', value: 'pudong' }],
  },
];
function onConfirm(value?: string) {
  console.log(value ? \`确认：\${value}\` : '已清空');
}
${'</scr' + 'ipt>'}

<template>
  <BbCascaderPicker
    v-model="inputValue"
    type="input"
    label="地区"
    :options="options"
    placeholder="请选择地区"
    @confirm="onConfirm"
  >
    <template #left-icon>
      <van-icon name="location-o" />
    </template>
  </BbCascaderPicker>
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbCascaderPicker } from '@sunshine-baby/baby-ui';

const customValue = ref('hangzhou');
const options = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [{ label: '杭州', value: 'hangzhou' }],
  },
];
${'</scr' + 'ipt>'}

<template>
  <BbCascaderPicker v-model="customValue" :options="options" label="地区">
    <div class="panel-card">点击选择常住地：{{ customValue || '未选择' }}</div>
  </BbCascaderPicker>
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
const inputValue = ref('pudong');
const customValue = ref('hangzhou');
const eventText = ref('尚未操作');
const options = [{ text: '上海', label: '上海', value: 'shanghai', children: [{ text: '浦东新区', label: '浦东新区', value: 'pudong' }, { text: '徐汇区', label: '徐汇区', value: 'xuhui' }] }, { text: '浙江', label: '浙江', value: 'zhejiang', children: [{ text: '杭州', label: '杭州', value: 'hangzhou' }, { text: '宁波', label: '宁波', value: 'ningbo' }] }];
function onConfirm(value?: string) { eventText.value = value ? `确认：${value}` : '已清空'; }
</script>

<template>
  <section class="doc-page" data-find-item="BbCascaderPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbCascaderPicker</h2><p>BbCascaderPicker 适合省市区、组织层级、分类树等需要逐级选择的场景。组件选中的是当前节点 value，并通过 options 中的 label 展示文本；请确保叶子节点 value 唯一。type=input 使用表单字段模式，默认插槽可替换触发区域。清空时会同时触发 update:modelValue 和 confirm。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前选中的节点 value；默认 undefined。</span></div><div class="api-item"><code>options</code><span>级联选项，字段 label/value/children；默认 []。</span></div><div class="api-item"><code>type</code><span>type=input 时渲染 van-field；默认空字符串时使用自定义触发区域。</span></div><div class="api-item"><code>readonly / disabled / clearable</code><span>只读、禁用、可清空；默认 false / false / true。</span></div><div class="api-item"><code>label / placeholder / name / rules / required</code><span>字段标签、占位、校验相关配置。</span></div><div class="api-item"><code>iconColor / inputStyle</code><span>图标颜色和非 input 模式文本样式。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>完成选择或清空时更新值。</span></div><div class="api-item"><code>confirm</code><span>完成选择时返回 value；清空时无参数。</span></div><div class="api-item"><code>onVisible</code><span>弹窗显示状态变化。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>非 input 模式下自定义触发区域。</span></div><div class="api-item"><code>left-icon</code><span>input 模式字段左侧图标。</span></div></div></div></section>
  <section class="demo-section"><h2>input 模式、left-icon 与清空反馈</h2><BbCascaderPicker v-model="inputValue" type="input" label="地区" :options="options" placeholder="请选择地区" @confirm="onConfirm"><template #left-icon><van-icon name="location-o" /></template></BbCascaderPicker><p class="result-text">当前值：{{ inputValue || '未选择' }}；{{ eventText }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>自定义触发区域</h2><BbCascaderPicker v-model="customValue" :options="options" label="地区" @confirm="onConfirm"><div class="panel-card">点击选择常住地：{{ customValue || '未选择' }}</div></BbCascaderPicker><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
