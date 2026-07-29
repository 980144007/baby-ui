<script lang="ts">
export const docMeta = { name: 'BbList', category: '数据展示', summary: '基于 Vant PullRefresh/List 的列表容器，支持刷新、加载更多、受控状态和实例方法。', order: 11 };
</script>
<script setup lang="ts">
import { ref } from 'vue';
import BbList from './BbList.vue';
defineOptions({ name: 'BbListDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbList } from '@sunshine-baby/baby-ui';

const items = ref(['记录 1', '记录 2']);
const onRefresh = () => Promise.resolve(false);
const onLoadMore = () => Promise.resolve(true);
${'</scr' + 'ipt>'}

<template>
  <BbList :on-refresh="onRefresh" :on-load-more="onLoadMore">
    <van-cell v-for="item in items" :key="item" :title="item" />
  </BbList>
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbList } from '@sunshine-baby/baby-ui';

const listRef = ref<InstanceType<typeof BbList> | null>(null);
const items = ref(['出生信息', '喂养记录', '睡眠记录']);
const finished = ref(false);
const loadCount = ref(0);
const errorText = ref('加载失败，点击此处重试');
function onRefresh() {
  loadCount.value = 0;
  items.value = ['刷新后的出生信息', '刷新后的喂养记录'];
  finished.value = false;
  return Promise.resolve(false);
}
function onLoadMore() {
  loadCount.value += 1;
  items.value.push(\`加载更多记录 \${loadCount.value}\`);
  return Promise.resolve(loadCount.value >= 2);
}
${'</scr' + 'ipt>'}

<template>
  <div class="fixed-height-demo">
    <BbList
      ref="listRef"
      :auto-load="false"
      :finished="finished"
      :on-refresh="onRefresh"
      :on-load-more="onLoadMore"
      :use-back-top="false"
      :error-text="errorText"
    >
      <van-cell v-for="item in items" :key="item" :title="item" />
    </BbList>
  </div>
  <div class="action-row">
    <van-button size="small" type="primary" @click="listRef?.refresh()">ref.refresh()</van-button>
    <van-button size="small" plain @click="listRef?.check()">ref.check()</van-button>
  </div>
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbList } from '@sunshine-baby/baby-ui';

const controlledRefreshing = ref(false);
const controlledLoading = ref(false);
const controlledFinished = ref(true);
function onControlledRefresh() {
  controlledRefreshing.value = true;
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      controlledRefreshing.value = false;
      controlledFinished.value = true;
      resolve(true);
    }, 400);
  });
}
${'</scr' + 'ipt>'}

<template>
  <div class="fixed-height-demo">
    <BbList
      v-model:refreshing="controlledRefreshing"
      v-model:loading-more="controlledLoading"
      v-model:finished="controlledFinished"
      :on-refresh="onControlledRefresh"
      :auto-load="false"
      error-text="网络异常，点击重试"
      hide-no-more
      :use-back-top="false"
    >
      <van-cell title="受控状态示例" label="hideNoMore 隐藏没有更多提示" />
    </BbList>
  </div>
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
const listRef = ref<any>(null); const items = ref(['出生信息', '喂养记录', '睡眠记录']); const finished = ref(false); const controlledRefreshing = ref(false); const controlledLoading = ref(false); const controlledFinished = ref(true); const loadCount = ref(0); const errorText = ref('加载失败，点击此处重试');
function onRefresh() { loadCount.value = 0; items.value = ['刷新后的出生信息', '刷新后的喂养记录', '刷新后的睡眠记录']; finished.value = false; return Promise.resolve(false); }
function onLoadMore() { loadCount.value += 1; items.value.push(`加载更多记录 ${loadCount.value}`); return Promise.resolve(loadCount.value >= 2); }
function onControlledRefresh() { controlledRefreshing.value = true; return new Promise<boolean>((resolve) => setTimeout(() => { controlledRefreshing.value = false; controlledFinished.value = true; resolve(true); }, 400)); }
</script>
<template>
  <section class="doc-page" data-find-item="BbList"><div class="doc-header"><p class="eyebrow">数据展示</p><h2>BbList</h2><p>BbList 封装下拉刷新、滚动加载、错误重试和返回顶部能力，适合移动端列表页。onRefresh/onLoadMore 需返回 Promise；resolve(true) 表示没有更多，reject 会进入错误状态。refreshing/loadingMore/finished 可不传由内部维护，也可通过 v-model 外部受控；固定高度容器内使用时请保证父级有明确高度。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>onRefresh / onLoadMore</code><span>刷新/加载更多函数，返回 Promise；默认 undefined。</span></div><div class="api-item"><code>refreshing / loadingMore / finished</code><span>外部受控状态；默认 null，未传时内部维护。</span></div><div class="api-item"><code>autoLoad</code><span>是否自动检查加载更多；boolean，默认 true。</span></div><div class="api-item"><code>useBackTop</code><span>是否展示返回顶部；boolean，默认 true。</span></div><div class="api-item"><code>errorText / hideNoMore / delay</code><span>错误文案、隐藏无更多、检查延迟；默认“加载失败...”/false/200。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="tag-list"><span class="doc-tag">update:refreshing</span><span class="doc-tag">update:loadingMore</span><span class="doc-tag">update:finished</span></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>列表内容。</span></div></div></div><div class="doc-block"><h3>Methods / Expose</h3><div class="tag-list"><span class="doc-tag">refresh()</span><span class="doc-tag">check(isSingle)</span></div></div></section>
  <section class="demo-section"><h2>刷新 / 加载更多与 ref 方法</h2><div class="fixed-height-demo"><BbList ref="listRef" :auto-load="false" :finished="finished" :on-refresh="onRefresh" :on-load-more="onLoadMore" :use-back-top="false" :error-text="errorText"><van-cell v-for="item in items" :key="item" :title="item" /></BbList></div><div class="action-row"><van-button size="small" type="primary" @click="listRef?.refresh()">ref.refresh()</van-button><van-button size="small" plain @click="listRef?.check()">ref.check()</van-button></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>受控状态、错误和无更多提示</h2><div class="fixed-height-demo"><BbList v-model:refreshing="controlledRefreshing" v-model:loading-more="controlledLoading" v-model:finished="controlledFinished" :on-refresh="onControlledRefresh" :auto-load="false" error-text="网络异常，点击重试" hide-no-more :use-back-top="false"><van-cell title="受控状态示例" label="hideNoMore 隐藏没有更多提示" /></BbList></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
