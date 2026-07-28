<script lang="ts">
export const docMeta = {
  name: 'BbDialog',
  category: '反馈',
  summary: '自定义弹窗，支持类型图标、确认/取消按钮和 beforeClose。',
  order: 9,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { BbDialog, showBbDialog } from './index';

defineOptions({ name: 'BbDialogDoc' });

const dialogVisible = ref(false);
const dialogAction = ref('尚未操作');
function openFunctionDialog() { showBbDialog({ type: 'success', title: '函数式弹窗', message: 'showBbDialog 已成功打开。', showCancel: true }).then(() => { dialogAction.value = '函数式弹窗：确认'; }).catch(() => { dialogAction.value = '函数式弹窗：取消'; }); }
</script>

<template>
  <section class="doc-page" data-find-item="BbDialog"><div class="doc-header"><p class="eyebrow">反馈</p><h2>BbDialog</h2><p>自定义弹窗，支持类型图标、确认/取消按钮和 beforeClose。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbDialog v-model:show=&quot;show&quot; title=&quot;提示&quot; message=&quot;内容&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>show</code><span>弹窗显示状态。</span></div><div class="api-item"><code>type</code><span>类型：info、warning、error、success。</span></div><div class="api-item"><code>title / message</code><span>标题和正文。</span></div><div class="api-item"><code>showCancel / showConfirm</code><span>是否显示取消和确认按钮。</span></div><div class="api-item"><code>cancelButtonText / confirmButtonText</code><span>按钮文案。</span></div><div class="api-item"><code>beforeClose</code><span>关闭前回调，支持 Promise。</span></div></div></div><div class="doc-block"><h3>v-model / Events / Methods</h3><div class="tag-list"><span class="doc-tag">v-model:show</span><span class="doc-tag">confirm</span><span class="doc-tag">cancel</span><span class="doc-tag">closed</span><span class="doc-tag">open()</span><span class="doc-tag">close()</span></div></div><div class="doc-block"><h3>函数式 API</h3><div class="api-list"><div class="api-item"><code>showBbDialog(options)</code><span>函数式打开弹窗，确认 resolve，取消 reject，并附带 close()。</span></div></div></div></section>
  <section class="demo-section"><h2>BbDialog 示例</h2><div class="action-row"><van-button size="small" type="primary" @click="dialogVisible = true">组件弹窗</van-button><van-button size="small" plain type="primary" @click="openFunctionDialog">函数式弹窗</van-button></div><p class="result-text">{{ dialogAction }}</p><BbDialog v-model:show="dialogVisible" type="warning" title="组件弹窗" message="这是 BbDialog 的受控示例。" show-cancel @confirm="dialogAction = '组件弹窗：确认'" @cancel="dialogAction = '组件弹窗：取消'" /></section>
</template>
