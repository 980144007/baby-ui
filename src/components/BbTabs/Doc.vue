<script lang="ts">
export const docMeta = {
  name: 'BbTabs',
  category: '导航',
  summary: '基于 Vant Tabs 的标签页容器，可由默认插槽或 tabs 配置生成页面。',
  order: 17,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbTabs from './BbTabs.vue';

defineOptions({ name: 'BbTabsDoc' });

const tabActive = ref('profile');
const tabItems = [{ name: 'profile', title: '资料', text: '宝宝昵称、生日和基础信息。' }, { name: 'records', title: '记录', text: '记录喂养、睡眠、体温等日常数据。' }, { name: 'growth', title: '成长', text: '查看身高、体重和成长趋势。' }];
</script>

<template>
  <section class="doc-page" data-find-item="BbTabs"><div class="doc-header"><p class="eyebrow">导航</p><h2>BbTabs</h2><p>基于 Vant Tabs 的标签页容器，可由默认插槽或 tabs 配置生成页面。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbTabs v-model=&quot;active&quot;&gt;&lt;section name=&quot;a&quot; title=&quot;A&quot;&gt;...&lt;/section&gt;&lt;/BbTabs&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前激活 tab name。</span></div><div class="api-item"><code>tabs</code><span>配置式标签页，优先于默认插槽。</span></div><div class="api-item"><code>size</code><span>尺寸，支持 normal / small。</span></div><div class="api-item"><code>followFullScreen</code><span>全屏时隐藏标签头。</span></div><div class="api-item"><code>vanProps</code><span>透传给 van-tabs。</span></div></div></div><div class="doc-block"><h3>v-model / Slots</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">default：子节点需包含 name 和 title</span></div></div></section>
  <section class="demo-section"><h2>BbTabs 示例</h2><div class="tabs-section"><BbTabs v-model="tabActive" :van-props="{ sticky: false }"><template v-for="item in tabItems" :key="item.name"><section :name="item.name" :title="item.title" class="panel-card">{{ item.text }}</section></template></BbTabs></div></section>
</template>
