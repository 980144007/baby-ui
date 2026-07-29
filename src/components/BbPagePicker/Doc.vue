<script lang="ts">
export const docMeta = { name: 'BbPagePicker', category: '表单', summary: '内置 BbList 的分页选择器，支持刷新、加载更多、单选/多选和自定义列表内容。', order: 4 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbPagePicker from './BbPagePicker.vue';

defineOptions({ name: 'BbPagePickerDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbPagePicker } from '@sunshine-baby/baby-ui';

const value = ref('page-a');
const options = ref([{ text: '选项 A', value: 'page-a' }]);
const onRefresh = () => Promise.resolve(false);
const onLoadMore = () => Promise.resolve(true);
${'</scr' + 'ipt>'}

<template>
  <BbPagePicker v-model="value" :options="options" :on-refresh="onRefresh" :on-load-more="onLoadMore" />
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbPagePicker } from '@sunshine-baby/baby-ui';

const singleValue = ref(['page-a']);
const multiValue = ref(['page-a']);
const page = ref(1);
const options = ref([
  { text: '第一页选项 A', value: 'page-a' },
  { text: '第一页选项 B', value: 'page-b' },
]);
function onRefresh() {
  page.value = 1;
  options.value = [{ text: '刷新后选项 A', value: 'page-a' }];
  return Promise.resolve(false);
}
function onLoadMore() {
  page.value += 1;
  options.value.push({ text: \`第 \${page.value} 页新增项\`, value: \`page-\${page.value}\` });
  return Promise.resolve(page.value >= 3);
}
${'</scr' + 'ipt>'}

<template>
  <BbPagePicker
    v-model="singleValue"
    title="单选分页项"
    :options="options"
    :on-refresh="onRefresh"
    :on-load-more="onLoadMore"
    clearable
    placeholder="请选择一个分页项"
  />
  <BbPagePicker
    v-model="multiValue"
    title="多选分页项"
    :options="options"
    multiple
    :on-refresh="onRefresh"
    :on-load-more="onLoadMore"
    clearable
    placeholder="请选择多个分页项"
  />
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbPagePicker } from '@sunshine-baby/baby-ui';

const multiValue = ref(['page-a']);
const page = ref(1);
const options = ref([{ text: '第一页选项 A', value: 'page-a' }]);
function onRefresh() {
  page.value = 1;
  return Promise.resolve(false);
}
function onLoadMore() {
  page.value += 1;
  options.value.push({ text: \`第 \${page.value} 页新增项\`, value: \`page-\${page.value}\` });
  return Promise.resolve(page.value >= 3);
}
${'</scr' + 'ipt>'}

<template>
  <BbPagePicker
    v-model="multiValue"
    title="带插槽的分页选择"
    :options="options"
    multiple
    :on-refresh="onRefresh"
    :on-load-more="onLoadMore"
  >
    <template #filter>
      <div class="filter-tip">当前第 {{ page }} 页，拖动列表可触发刷新/加载更多。</div>
    </template>
    <template #option="slotProps">
      <van-tag plain type="primary">{{ slotProps.info.value }}</van-tag>
    </template>
    <div class="panel-card">点击打开分页选择器：{{ multiValue.join('、') }}</div>
  </BbPagePicker>
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
const singleValue = ref<any>(['page-a']);
const multiValue = ref(['page-a']);
const page = ref(1);
const options = ref([{ text: '第一页选项 A', value: 'page-a' }, { text: '第一页选项 B', value: 'page-b' }, { text: '第一页选项 C', value: 'page-c' }]);
function onRefresh() { page.value = 1; options.value = [{ text: '刷新后选项 A', value: 'page-a' }, { text: '刷新后选项 B', value: 'page-b' }, { text: '刷新后选项 C', value: 'page-c' }]; return Promise.resolve(false); }
function onLoadMore() { page.value += 1; options.value.push({ text: `第 ${page.value} 页新增项`, value: `page-${page.value}` }); return Promise.resolve(page.value >= 3); }
</script>

<template>
  <section class="doc-page" data-find-item="BbPagePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbPagePicker</h2><p>BbPagePicker 适合选项数量较多、需要弹窗内下拉刷新或上拉加载的业务选择场景。组件内部使用 BbList，onRefresh/onLoadMore 必须返回 Promise，resolve(true) 表示没有更多。选项展示字段固定为 text/value/disabled；filter、option 插槽只负责展示，自定义筛选或远程搜索需在外部更新 options。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>单选为单个值，多选为值数组；默认 undefined。</span></div><div class="api-item"><code>options</code><span>选项数组，字段 text、value、disabled；默认 []。</span></div><div class="api-item"><code>multiple</code><span>是否多选；boolean，默认 false。</span></div><div class="api-item"><code>onRefresh / onLoadMore</code><span>刷新和加载更多函数，返回 Promise；resolve(true) 表示 finished。</span></div><div class="api-item"><code>clearable / readonly / border</code><span>清空、只读、边框；默认 false。</span></div><div class="api-item"><code>title / placeholder / name / rules / inputStyle / iconColor</code><span>弹窗标题、输入展示、校验和样式配置。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>确认或清空时更新值。</span></div><div class="api-item"><code>confirm</code><span>返回选中 option；多选返回 option 数组。</span></div><div class="api-item"><code>onVisible</code><span>弹窗显示状态变化。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>自定义触发区域。</span></div><div class="api-item"><code>filter</code><span>弹窗头部筛选区域。</span></div><div class="api-item"><code>option</code><span>checkbox 内部自定义内容，参数 info。</span></div></div></div><div class="doc-block"><h3>Methods / Expose</h3><div class="tag-list"><span class="doc-tag">refresh()</span><span class="doc-tag">check(isSingle)</span></div></div></section>
  <section class="demo-section"><h2>单选与多选</h2><BbPagePicker v-model="singleValue" title="单选分页项" :options="options" :on-refresh="onRefresh" :on-load-more="onLoadMore" clearable placeholder="请选择一个分页项" /><BbPagePicker v-model="multiValue" title="多选分页项" :options="options" multiple :on-refresh="onRefresh" :on-load-more="onLoadMore" clearable placeholder="请选择多个分页项" /><p class="result-text">单选：{{ singleValue }}；多选：{{ multiValue.join('、') }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>filter / option 插槽与刷新加载</h2><BbPagePicker v-model="multiValue" title="带插槽的分页选择" :options="options" multiple :on-refresh="onRefresh" :on-load-more="onLoadMore"><template #filter><div class="filter-tip">当前第 {{ page }} 页，拖动列表可触发刷新/加载更多。</div></template><template #option="slotProps"><van-tag plain type="primary">{{ (slotProps.info as any).value }}</van-tag></template><div class="panel-card">点击打开分页选择器：{{ multiValue.join('、') }}</div></BbPagePicker><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
