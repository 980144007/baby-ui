<script lang="ts">
export const docMeta = { name: 'BbPicker', category: '表单', summary: '基于 Vant Picker 的通用选择器，支持字段展示、受控弹窗、多列选择和函数式调用。', order: 2 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbPicker, showBbPicker } from './index';

defineOptions({ name: 'BbPickerDoc' });

const cityValue = ref('shanghai');
const cityShow = ref(false);
const multiValue = ref(['morning', 'milk']);
const customValue = ref('feed');
const cityOptions = [{ label: '上海', value: 'shanghai' }, { label: '杭州', value: 'hangzhou' }, { label: '苏州', value: 'suzhou' }];
const sceneOptions = [{ label: '喂养', value: 'feed' }, { label: '睡眠', value: 'sleep' }, { label: '成长', value: 'growth' }];
const multiOptions = [[{ label: '早晨', value: 'morning' }, { label: '晚上', value: 'night' }], [{ label: '母乳', value: 'milk' }, { label: '辅食', value: 'food' }]];
const pickerLog = ref('尚未选择');
function onCityConfirm(option: any) { pickerLog.value = option ? `选择：${option.label}` : '已清空'; }
function openFunctionPicker() { showBbPicker({ title: '函数式选择器', modelValue: cityValue.value, options: cityOptions, labelKey: 'label', valueKey: 'value' }).then((option: any) => { cityValue.value = option?.value || cityValue.value; pickerLog.value = `函数式选择：${option?.label}`; }).catch(() => { pickerLog.value = '函数式选择已取消'; }); }
</script>

<template>
  <section class="doc-page" data-find-item="BbPicker"><div class="doc-header"><p class="eyebrow">表单</p><h2>BbPicker</h2><p>BbPicker 适合枚举值、城市、状态等从固定选项中选择的表单场景。默认渲染 van-field，也可以隐藏字段只保留弹窗，或通过默认插槽自定义触发区域。单列选择返回单个 value，多列选择需设置 multiple 并传二维 options，返回 value 数组；选项字段名可通过 labelKey/valueKey 适配接口数据。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbPicker v-model=&quot;value&quot; label=&quot;城市&quot; :options=&quot;options&quot; label-key=&quot;label&quot; value-key=&quot;value&quot; @confirm=&quot;onConfirm&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前值；单列为 string/number，多列为数组，默认 undefined。</span></div><div class="api-item"><code>show</code><span>受控弹窗显示状态；boolean，默认 undefined（内部控制）。</span></div><div class="api-item"><code>showField</code><span>是否渲染字段/触发区域；boolean，默认 true。</span></div><div class="api-item"><code>options</code><span>选项数组或二维数组；默认 []。</span></div><div class="api-item"><code>labelKey / valueKey</code><span>展示和值字段名；string，默认 label / value。</span></div><div class="api-item"><code>multiple</code><span>是否按多列模式处理；boolean，默认 false。</span></div><div class="api-item"><code>type</code><span>type=input 时使用 van-field，否则使用默认/自定义触发；string，默认 input。</span></div><div class="api-item"><code>readonly / disabled / clearable</code><span>只读、禁用、可清空；默认 false / false / true。</span></div><div class="api-item"><code>label / title / placeholder / name / rules / required / border / size / iconColor / inputStyle / holdPlaceholder</code><span>字段、弹窗、校验和样式配置，透传到内部展示逻辑。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>确认或清空时更新值。</span></div><div class="api-item"><code>update:show / onVisible</code><span>弹窗显示状态变化时触发。</span></div><div class="api-item"><code>confirm</code><span>确认时返回选中 option；多列返回 option 数组；清空时无参数。</span></div><div class="api-item"><code>cancel / closed</code><span>点击取消、弹窗关闭后触发。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>非 input 字段模式下自定义触发内容。</span></div><div class="api-item"><code>left-icon</code><span>type=input 时自定义 van-field 左侧图标。</span></div></div></div><div class="doc-block"><h3>Methods / Expose</h3><div class="tag-list"><span class="doc-tag">open()</span><span class="doc-tag">close()</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbPicker(options)</code><span>函数式打开，确认 resolve(option)，取消 reject(cancelError)，返回 Promise 并带 close()。</span></div></div></div></section>
  <section class="demo-section"><h2>字段模式与 left-icon</h2><BbPicker v-model="cityValue" label="城市" title="选择城市" :options="cityOptions" label-key="label" value-key="value" placeholder="请选择城市" @confirm="onCityConfirm"><template #left-icon><van-icon name="location-o" /></template></BbPicker><p class="result-text">{{ pickerLog }}</p></section>
  <section class="demo-section"><h2>受控弹窗与函数式 API</h2><div class="action-row"><van-button size="small" type="primary" @click="cityShow = true">受控打开</van-button><van-button size="small" plain type="primary" @click="openFunctionPicker">函数式打开</van-button></div><BbPicker v-model="cityValue" v-model:show="cityShow" title="受控城市选择" :show-field="false" :options="cityOptions" label-key="label" value-key="value" /></section>
  <section class="demo-section"><h2>多列选择与自定义触发</h2><BbPicker v-model="multiValue" :options="multiOptions" multiple title="记录类型" type="button"><van-button block plain type="primary">{{ multiValue.join(' / ') || '选择记录类型' }}</van-button></BbPicker><BbPicker v-model="customValue" :options="sceneOptions" label-key="label" value-key="value" title="自定义触发" type="button"><div class="panel-card">点击选择场景：{{ customValue }}</div></BbPicker></section>
</template>
