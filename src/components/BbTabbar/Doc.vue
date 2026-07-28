<script lang="ts">
export const docMeta = {
  name: 'BbTabbar',
  category: '导航',
  summary: '基于 Vant Tabbar 的页面切换布局容器。',
  order: 18,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import BbTabbar from './BbTabbar.vue';

defineOptions({ name: 'BbTabbarDoc' });

const tabbarActive = ref('home');
const tabbarItems = [{ name: 'home', title: '首页', icon: 'home-o', text: '首页内容区域' }, { name: 'chart', title: '统计', icon: 'chart-trending-o', text: '统计内容区域' }, { name: 'setting', title: '设置', icon: 'setting-o', text: '设置内容区域' }];
</script>

<template>
  <section class="doc-page" data-find-item="BbTabbar"><div class="doc-header"><p class="eyebrow">导航</p><h2>BbTabbar</h2><p>基于 Vant Tabbar 的页面切换布局容器。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbTabbar v-model=&quot;active&quot;&gt;&lt;section name=&quot;home&quot; title=&quot;首页&quot; /&gt;&lt;/BbTabbar&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前激活 tab name。</span></div><div class="api-item"><code>navPosition</code><span>导航位置：top 或 bottom。</span></div><div class="api-item"><code>followFullScreen</code><span>全屏时隐藏 tabbar。</span></div><div class="api-item"><code>vanProps</code><span>透传给 van-tabbar。</span></div></div></div><div class="doc-block"><h3>v-model / Slots</h3><div class="tag-list"><span class="doc-tag">v-model</span><span class="doc-tag">default：子节点需包含 name、title，可选 icon、activeIcon</span></div></div></section>
  <section class="demo-section"><h2>BbTabbar 示例</h2><div class="tabbar-section"><BbTabbar v-model="tabbarActive" nav-position="bottom"><template v-for="item in tabbarItems" :key="item.name"><section :name="item.name" :title="item.title" :icon="item.icon" class="panel-card">{{ item.text }}</section></template></BbTabbar></div></section>
</template>
