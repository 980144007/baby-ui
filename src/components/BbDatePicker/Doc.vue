<script lang="ts">
export const docMeta = {
  name: 'BbDatePicker',
  category: '表单',
  summary: '日期选择字段，确认后输出 YYYY-MM-DD 字符串。',
  order: 6,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbDatePicker, showBbDatePicker } from './index';

defineOptions({ name: 'BbDatePickerDoc' });

const dateValue = ref('2026-07-10');
function openFunctionDatePicker() {
  showBbDatePicker({ modelValue: dateValue.value, label: '日期', placeholder: '请选择日期' }).then((value: string) => { dateValue.value = value; }).catch(() => undefined);
}
</script>

<template>
  <section class="doc-page" data-find-item="BbDatePicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbDatePicker</h2><p>日期选择字段，确认后输出 YYYY-MM-DD 字符串。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbDatePicker v-model=&quot;date&quot; label=&quot;日期&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>日期字符串，格式为 YYYY-MM-DD。</span></div><div class="api-item"><code>readonly / disabled / clearable</code><span>只读、禁用和清空控制。</span></div><div class="api-item"><code>label / placeholder / rules</code><span>字段标签、占位和校验规则。</span></div><div class="api-item"><code>iconColor</code><span>右侧图标颜色。</span></div></div></div><div class="doc-block"><h3>v-model / Events / Slots</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">v-model:show</span><span class="doc-tag">confirm</span><span class="doc-tag">onVisible</span><span class="doc-tag">closed</span><span class="doc-tag">left-icon</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbDatePicker(options)</code><span>函数式打开日期选择器，返回 Promise，并附带 close()。</span></div></div></div></section>
  <section class="demo-section"><h2>BbDatePicker 示例</h2><BbDatePicker v-model="dateValue" label="日期" placeholder="请选择日期" /><div class="action-row"><van-button size="small" type="primary" @click="openFunctionDatePicker">函数式 API</van-button></div></section>
</template>
