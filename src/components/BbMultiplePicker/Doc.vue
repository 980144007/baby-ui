<script lang="ts">
export const docMeta = { name: 'BbMultiplePicker', category: '表单', summary: '弹出式单选/多选列表选择器，适合标签、分类、状态等中短列表选择。', order: 3 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbMultiplePicker from './BbMultiplePicker.vue';

defineOptions({ name: 'BbMultiplePickerDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbMultiplePicker } from '@sunshine-baby/baby-ui';

const value = ref(['sleep']);
const options = [
  { text: '睡眠', value: 'sleep' },
  { text: '喂养', value: 'feed' },
];
${'</scr' + 'ipt>'}

<template>
  <BbMultiplePicker v-model="value" title="标签" :options="options" multiple clearable />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbMultiplePicker } from '@sunshine-baby/baby-ui';

const singleValue = ref(['sleep']);
const options = [
  { text: '睡眠', value: 'sleep' },
  { text: '喂养', value: 'feed' },
  { text: '成长', value: 'growth' },
];
${'</scr' + 'ipt>'}

<template>
  <BbMultiplePicker
    v-model="singleValue"
    title="单选记录"
    :options="options"
    placeholder="请选择一个记录"
    clearable
  />
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbMultiplePicker } from '@sunshine-baby/baby-ui';

const multiValue = ref(['sleep']);
const filterText = ref('本地筛选区：可放搜索框、快捷筛选按钮或统计信息');
const options = [
  { text: '睡眠', value: 'sleep' },
  { text: '喂养', value: 'feed' },
  { text: '成长', value: 'growth' },
];
${'</scr' + 'ipt>'}

<template>
  <BbMultiplePicker
    v-model="multiValue"
    title="多选标签"
    :options="options"
    multiple
    clearable
    placeholder="请选择标签"
  >
    <template #filter>
      <div class="filter-tip">{{ filterText }}</div>
    </template>
  </BbMultiplePicker>
</template>`,
  demo3: `<script setup lang="ts">
import { ref } from 'vue';
import { BbMultiplePicker } from '@sunshine-baby/baby-ui';

const customValue = ref(['feed']);
const options = [
  { text: '睡眠', value: 'sleep' },
  { text: '喂养', value: 'feed' },
  { text: '禁用项', value: 'disabled', disabled: true },
];
${'</scr' + 'ipt>'}

<template>
  <BbMultiplePicker v-model="customValue" title="自定义内容" :options="options" multiple>
    <div class="panel-card">点击打开：{{ customValue.join('、') || '未选择' }}</div>
    <template #option="slotProps">
      <van-tag :type="slotProps.info.disabled ? 'default' : 'primary'">
        {{ slotProps.info.text }}
      </van-tag>
    </template>
  </BbMultiplePicker>
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
const singleValue = ref<any>(['sleep']);
const multiValue = ref(['sleep']);
const customValue = ref(['feed']);
const options = [{ text: '睡眠', value: 'sleep' }, { text: '喂养', value: 'feed' }, { text: '成长', value: 'growth' }, { text: '禁用项', value: 'disabled', disabled: true }];
const filterText = ref('本地筛选区：可放搜索框、快捷筛选按钮或统计信息');
</script>

<template>
  <section class="doc-page" data-find-item="BbMultiplePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbMultiplePicker</h2><p>BbMultiplePicker 以弹窗列表形式呈现选项，适合不需要滚轮联动、但需要 checkbox 反馈的选择场景。multiple=false 时按单选交互处理，multiple=true 时返回值数组；组件内部选项固定使用 text/value/disabled 字段。注意 filter 和 option 都是展示插槽，不会自动过滤数据，真实筛选需由外部维护 options。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前值；单选为单个值，多选为数组。示例为兼容展示，单选初始也可传包含一个值的数组。</span></div><div class="api-item"><code>options</code><span>选项数组，字段为 text、value、disabled；默认 []。</span></div><div class="api-item"><code>multiple</code><span>是否多选；boolean，默认 false。</span></div><div class="api-item"><code>clearable / readonly / border / showIcon</code><span>清空、只读、边框、右侧箭头；默认 false / false / false / true。</span></div><div class="api-item"><code>title / placeholder / name / rules / inputStyle / iconColor / size</code><span>弹窗标题、输入展示、校验和尺寸配置。</span></div><div class="api-item"><code>config</code><span>多选全选文案配置，包含 value 和 allText。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>点击确定或清空时更新值。</span></div><div class="api-item"><code>confirm</code><span>返回选中 option；多选返回 option 数组或 config。</span></div><div class="api-item"><code>onVisible</code><span>弹窗显示状态变化。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>自定义触发区域。</span></div><div class="api-item"><code>filter</code><span>弹窗头部筛选区域。</span></div><div class="api-item"><code>option</code><span>checkbox 内部自定义内容，参数 info。</span></div></div></div></section>
  <section class="demo-section"><h2>单选列表</h2><BbMultiplePicker v-model="singleValue" title="单选记录" :options="options" placeholder="请选择一个记录" clearable /><p class="result-text">当前值：{{ singleValue }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>多选与 filter 插槽</h2><BbMultiplePicker v-model="multiValue" title="多选标签" :options="options" multiple clearable placeholder="请选择标签"><template #filter><div class="filter-tip">{{ filterText }}</div></template></BbMultiplePicker><p class="result-text">当前值：{{ multiValue.join('、') }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
  <section class="demo-section"><h2>自定义触发与 option 插槽</h2><BbMultiplePicker v-model="customValue" title="自定义内容" :options="options" multiple><div class="panel-card">点击打开：{{ customValue.join('、') || '未选择' }}</div><template #option="slotProps"><van-tag :type="(slotProps.info as any).disabled ? 'default' : 'primary'">{{ (slotProps.info as any).text }}</van-tag></template></BbMultiplePicker><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo3')">{{ expandedCodes.demo3 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo3', demoCodes.demo3)">{{ copiedKey === 'demo3' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo3 }"><code>{{ demoCodes.demo3 }}</code></pre></div></section>
</template>
