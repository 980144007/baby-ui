<script lang="ts">
export const docMeta = { name: 'BbLoading', category: '反馈', summary: '注册 Vant Loading 组件，并提供带计数的全局 $loading 遮罩控制。', order: 12 };
</script>
<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import BbLoadingPlugin from './index';
defineOptions({ name: 'BbLoadingDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { BbLoading } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <BbLoading size="24px" type="spinner" />
</template>`,
  demo1: `<script setup lang="ts">
import { BbLoading } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <div class="action-row">
    <BbLoading size="24px" type="spinner" />
    <BbLoading size="28px" type="circular">加载中...</BbLoading>
  </div>
</template>`,
  demo2: `<script setup lang="ts">
import { inject, ref } from 'vue';
import '@sunshine-baby/baby-ui';

type LoadingApi = { open: () => void; close: (num?: number) => void; clear: () => void };
const loadingApi = inject<LoadingApi>('$loading');
const text = ref('点击按钮体验 $loading');

function openOnce() {
  loadingApi?.open();
  text.value = '已 open，1 秒后 close';
  setTimeout(() => loadingApi?.close(), 1000);
}

function openTwice() {
  loadingApi?.open();
  loadingApi?.open();
  text.value = '连续 open 两次，需要 close(2) 或 clear 才会完全关闭';
  setTimeout(() => loadingApi?.close(2), 1000);
}

function clearLoading() {
  loadingApi?.clear();
  text.value = '已 clear';
}
${'</scr' + 'ipt>'}

<template>
  <div class="action-row">
    <van-button size="small" type="primary" @click="openOnce">open 后 close</van-button>
    <van-button size="small" plain type="primary" @click="openTwice">计数关闭</van-button>
    <van-button size="small" plain @click="clearLoading">clear</van-button>
  </div>
  <p>{{ text }}</p>
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
type LoadingApi = { open: () => void; close: (num?: number) => void; clear: () => void };
const loadingApi = inject<LoadingApi>('$loading'); const text = ref('点击按钮体验 $loading'); const hasPlugin = computed(() => Boolean(BbLoadingPlugin));
function openOnce() { loadingApi?.open(); text.value = '已 open，1 秒后 close'; setTimeout(() => { loadingApi?.close(); text.value = '已 close'; }, 1000); }
function openTwice() { loadingApi?.open(); loadingApi?.open(); text.value = '连续 open 两次，需要 close(2) 或 clear 才会完全关闭'; setTimeout(() => loadingApi?.close(2), 1000); }
function clearLoading() { loadingApi?.clear(); text.value = '已 clear'; }
</script>
<template>
  <section class="doc-page" data-find-item="BbLoading"><div class="doc-header"><p class="eyebrow">反馈</p><h2>BbLoading</h2><p>BbLoading 安装后会把 Vant Loading 注册为同名组件，并通过 provide/window 暴露 $loading。$loading.open() 会创建全屏遮罩，内部带计数：多次 open 只显示一个遮罩，但需要对应 close 次数；close(num) 可一次减少多个计数，clear() 会直接清零并关闭。适合全局接口请求、页面初始化等需要阻止操作的场景。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>Vant Loading props</code><span>组件本体直接使用 Vant Loading 的 props，如 size、type、color、vertical 等。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>继承 Vant Loading 默认插槽。</span></div></div></div><div class="doc-block"><h3>Methods / Expose</h3><div class="tag-list"><span class="doc-tag">$loading.open()</span><span class="doc-tag">$loading.close(num = 1)</span><span class="doc-tag">$loading.clear()</span></div></div></section>
  <section class="demo-section"><h2>组件本体</h2><div class="action-row"><BbLoading size="24px" type="spinner" /><BbLoading size="28px" type="circular">加载中...</BbLoading></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>$loading open / close / clear</h2><div class="action-row"><van-button size="small" type="primary" :disabled="!hasPlugin" @click="openOnce">open 后 close</van-button><van-button size="small" plain type="primary" :disabled="!hasPlugin" @click="openTwice">计数关闭</van-button><van-button size="small" plain @click="clearLoading">clear</van-button></div><p class="result-text">{{ text }}</p><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
