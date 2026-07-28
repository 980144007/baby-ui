<script lang="ts">
export const docMeta = {
  name: 'BbCascaderPicker',
  category: '表单',
  summary: '基于 Vant Cascader 的级联选择器，可作为字段或自定义触发区域使用。',
  order: 5,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbCascaderPicker from './BbCascaderPicker.vue';

defineOptions({ name: 'BbCascaderPickerDoc' });

const cascaderValue = ref('pudong');
const cascaderOptions = [{ text: '上海', label: '上海', value: 'shanghai', children: [{ text: '浦东新区', label: '浦东新区', value: 'pudong' }, { text: '徐汇区', label: '徐汇区', value: 'xuhui' }] }, { text: '浙江', label: '浙江', value: 'zhejiang', children: [{ text: '杭州', label: '杭州', value: 'hangzhou' }, { text: '宁波', label: '宁波', value: 'ningbo' }] }];
</script>

<template>
  <section class="doc-page" data-find-item="BbCascaderPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbCascaderPicker</h2><p>基于 Vant Cascader 的级联选择器，可作为字段或自定义触发区域使用。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbCascaderPicker v-model=&quot;value&quot; type=&quot;input&quot; :options=&quot;options&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前选中的末级 value。</span></div><div class="api-item"><code>options</code><span>级联选项，使用 label、value、children 字段。</span></div><div class="api-item"><code>type</code><span>type=&quot;input&quot; 时渲染 van-field。</span></div><div class="api-item"><code>readonly / disabled / clearable</code><span>只读、禁用和清空控制。</span></div><div class="api-item"><code>label / placeholder / rules</code><span>字段标签、占位和校验规则。</span></div></div></div><div class="doc-block"><h3>v-model / Events / Slots</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">confirm</span><span class="doc-tag">onVisible</span><span class="doc-tag">default</span><span class="doc-tag">left-icon</span></div></div></section>
  <section class="demo-section"><h2>BbCascaderPicker 示例</h2><BbCascaderPicker v-model="cascaderValue" type="input" label="地区" :options="cascaderOptions" placeholder="请选择地区" /></section>
</template>
