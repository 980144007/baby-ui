<script lang="ts">
export const docMeta = {
  name: 'BbPicker',
  category: '表单',
  summary: '基于 Vant Picker 的通用选择器，支持字段展示、受控弹窗和函数式调用。',
  order: 2,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbPicker, showBbPicker } from './index';

defineOptions({ name: 'BbPickerDoc' });

const pickerValue = ref('shanghai');
const pickerShow = ref(false);
const pickerOptions = [{ label: '上海', value: 'shanghai' }, { label: '杭州', value: 'hangzhou' }, { label: '苏州', value: 'suzhou' }];
function openFunctionPicker() {
  showBbPicker({ title: '函数式选择器', modelValue: pickerValue.value, options: pickerOptions, labelKey: 'label', valueKey: 'value' }).then((option: any) => { pickerValue.value = option?.value || pickerValue.value; }).catch(() => undefined);
}
</script>

<template>
  <section class="doc-page" data-find-item="BbPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbPicker</h2><p>基于 Vant Picker 的通用选择器，支持字段展示、受控弹窗和函数式调用。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbPicker v-model=&quot;value&quot; :options=&quot;options&quot; label-key=&quot;label&quot; value-key=&quot;value&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前选中值；多列模式为值数组。</span></div><div class="api-item"><code>show / showField</code><span>控制弹窗显示，以及是否渲染字段入口。</span></div><div class="api-item"><code>options</code><span>选择项数组，也支持二维数组多列。</span></div><div class="api-item"><code>labelKey / valueKey</code><span>指定选项展示字段和值字段，默认 label / value。</span></div><div class="api-item"><code>readonly / disabled / clearable</code><span>字段只读、禁用和清空控制。</span></div><div class="api-item"><code>label / title / placeholder / rules</code><span>字段标签、弹窗标题、占位和校验规则。</span></div></div></div><div class="doc-block"><h3>v-model</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">v-model:show</span></div></div><div class="doc-block"><h3>Events</h3><div class="tag-list"><span class="doc-tag">confirm</span><span class="doc-tag">cancel</span><span class="doc-tag">closed</span><span class="doc-tag">onVisible</span></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>非字段展示时自定义触发区域。</span></div><div class="api-item"><code>left-icon</code><span>字段左侧图标。</span></div></div></div><div class="doc-block"><h3>Methods / Expose</h3><div class="tag-list"><span class="doc-tag">open()</span><span class="doc-tag">close()</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbPicker(options)</code><span>函数式打开选择器，返回 Promise，并附带 close()。</span></div></div></div></section>
  <section class="demo-section"><h2>BbPicker 示例</h2><BbPicker v-model="pickerValue" title="城市选择" label="城市" :options="pickerOptions" label-key="label" value-key="value" placeholder="请选择城市" /><div class="action-row"><van-button size="small" type="primary" @click="pickerShow = true">受控打开</van-button><van-button size="small" plain type="primary" @click="openFunctionPicker">函数式 API</van-button></div><BbPicker v-model="pickerValue" v-model:show="pickerShow" title="受控城市选择" :show-field="false" :options="pickerOptions" label-key="label" value-key="value" /></section>
</template>
