<script lang="ts">
export const docMeta = {
  name: 'BbMultiplePicker',
  category: '表单',
  summary: '弹出式单选/多选选择器，适合标签、枚举项等列表选择。',
  order: 3,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbMultiplePicker from './BbMultiplePicker.vue';

defineOptions({ name: 'BbMultiplePickerDoc' });

const multiPickerValue = ref(['sleep']);
const multipleOptions = [{ text: '睡眠', value: 'sleep' }, { text: '喂养', value: 'feed' }, { text: '成长', value: 'growth' }];
</script>

<template>
  <section class="doc-page" data-find-item="BbMultiplePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbMultiplePicker</h2><p>弹出式单选/多选选择器，适合标签、枚举项等列表选择。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbMultiplePicker v-model=&quot;value&quot; multiple :options=&quot;options&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>单选为单个值，多选为值数组。</span></div><div class="api-item"><code>options</code><span>选项数组，使用 text、value、disabled 字段。</span></div><div class="api-item"><code>multiple</code><span>是否多选。</span></div><div class="api-item"><code>clearable / readonly / border</code><span>清空、只读和边框展示控制。</span></div><div class="api-item"><code>title / placeholder / rules</code><span>弹窗标题、占位和校验规则。</span></div><div class="api-item"><code>config</code><span>多选全选逻辑配置，使用 value 和 allText。</span></div></div></div><div class="doc-block"><h3>v-model / Events / Slots</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">confirm</span><span class="doc-tag">onVisible</span><span class="doc-tag">default</span><span class="doc-tag">filter</span><span class="doc-tag">option</span></div></div></section>
  <section class="demo-section"><h2>BbMultiplePicker 示例</h2><BbMultiplePicker v-model="multiPickerValue" title="多选标签" :options="multipleOptions" multiple clearable placeholder="请选择标签" /><p class="result-text">当前值：{{ multiPickerValue.join('、') }}</p></section>
</template>
