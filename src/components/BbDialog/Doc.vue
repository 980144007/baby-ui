<script lang="ts">
export const docMeta = { name: 'BbDialog', category: '反馈', summary: '自定义状态弹窗，支持不同 type、beforeClose 异步拦截、ref 方法和函数式调用。', order: 9 };
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbDialog, showBbDialog } from './index';

defineOptions({ name: 'BbDialogDoc' });
const typeShow = ref(false);
const asyncShow = ref(false);
const refDialog = ref<any>(null);
const dialogType = ref<'info' | 'warning' | 'error' | 'success'>('info');
const actionText = ref('尚未操作');
function openType(type: 'info' | 'warning' | 'error' | 'success') { dialogType.value = type; typeShow.value = true; }
function beforeClose(action: string) { actionText.value = `beforeClose：${action}，等待 600ms`; return new Promise((resolve) => window.setTimeout(() => resolve(true), 600)); }
function openFunctionDialog() { showBbDialog({ type: 'success', title: '函数式弹窗', message: '确认后 Promise resolve，取消后 Promise reject。', showCancel: true }).then(() => { actionText.value = '函数式弹窗：确认'; }).catch(() => { actionText.value = '函数式弹窗：取消'; }); }
</script>

<template>
  <section class="doc-page" data-find-item="BbDialog"><div class="doc-header"><p class="eyebrow">反馈</p><h2>BbDialog</h2><p>BbDialog 用于重要确认、状态提示、危险操作二次确认等场景。type 会影响标题图标和确认按钮颜色；beforeClose 可同步或异步决定是否关闭，返回 false 会阻止关闭，返回 Promise 时按钮自动进入 loading。组件既支持 v-model:show 受控，也支持 ref.open()/ref.close() 和 showBbDialog 函数式调用。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbDialog v-model:show=&quot;show&quot; type=&quot;warning&quot; title=&quot;提示&quot; message=&quot;确认继续？&quot; show-cancel /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>show</code><span>弹窗显示状态；boolean，默认 undefined（内部控制）。</span></div><div class="api-item"><code>type</code><span>状态类型 info/warning/error/success；默认 info。</span></div><div class="api-item"><code>title / titleIcon / message</code><span>标题、标题图标、正文；title 默认“提示”。</span></div><div class="api-item"><code>showCancel / showConfirm</code><span>是否展示取消/确认按钮；默认 false / true。</span></div><div class="api-item"><code>cancelButtonText / confirmButtonText</code><span>按钮文案；默认“取消”/“确认”。</span></div><div class="api-item"><code>confirmButtonIcon / closeOnClickOverlay</code><span>确认按钮图标、点击遮罩关闭；默认空 / false。</span></div><div class="api-item"><code>beforeClose</code><span>关闭前回调 (action) => boolean | Promise&lt;boolean&gt;；默认 null。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:show</code><span>弹窗显示状态变化。</span></div><div class="api-item"><code>confirm / cancel</code><span>确认或取消且 beforeClose 允许关闭时触发。</span></div><div class="api-item"><code>closed</code><span>弹窗关闭后触发。</span></div></div></div><div class="doc-block"><h3>Methods / Expose</h3><div class="tag-list"><span class="doc-tag">open()</span><span class="doc-tag">close()</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbDialog(options | message)</code><span>确认 resolve('confirm')，取消 reject(cancelError)，返回 Promise 并带 close()。</span></div></div></div></section>
  <section class="demo-section"><h2>不同 type</h2><div class="action-row"><van-button size="small" @click="openType('info')">info</van-button><van-button size="small" type="warning" @click="openType('warning')">warning</van-button><van-button size="small" type="danger" @click="openType('error')">error</van-button><van-button size="small" type="success" @click="openType('success')">success</van-button></div><BbDialog v-model:show="typeShow" :type="dialogType" :title="`${dialogType} 提示`" message="这是不同 type 的展示效果。" show-cancel @confirm="actionText = `${dialogType}：确认`" @cancel="actionText = `${dialogType}：取消`" /></section>
  <section class="demo-section"><h2>beforeClose Promise 与函数式 API</h2><div class="action-row"><van-button size="small" type="primary" @click="asyncShow = true">异步关闭</van-button><van-button size="small" plain type="primary" @click="openFunctionDialog">函数式 API</van-button></div><p class="result-text">{{ actionText }}</p><BbDialog v-model:show="asyncShow" type="warning" title="异步确认" message="点击按钮后等待 Promise 完成再关闭。" show-cancel :before-close="beforeClose" @confirm="actionText = '异步弹窗：确认'" @cancel="actionText = '异步弹窗：取消'" /></section>
  <section class="demo-section"><h2>ref open / close</h2><div class="action-row"><van-button size="small" type="primary" @click="refDialog?.open()">ref.open()</van-button><van-button size="small" plain @click="refDialog?.close()">ref.close()</van-button></div><BbDialog ref="refDialog" type="success" title="实例方法" message="这个弹窗由 ref.open() 打开。" /></section>
</template>
