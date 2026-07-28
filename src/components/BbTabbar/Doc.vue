<script lang="ts">
export const docMeta = { name: 'BbTabbar', category: '导航', summary: '基于 Vant Tabbar 的页面切换布局容器，支持顶部/底部导航、activeIcon 和 vanProps。', order: 18 };
</script>
<script setup lang="ts">
import { ref } from 'vue';
import BbTabbar from './BbTabbar.vue';
defineOptions({ name: 'BbTabbarDoc' });
const bottomActive = ref('home'); const topActive = ref('record');
const items = [{ name: 'home', title: '首页', icon: 'home-o', activeIcon: 'wap-home', text: '首页内容区域' }, { name: 'record', title: '记录', icon: 'notes-o', activeIcon: 'orders-o', text: '记录内容区域' }, { name: 'setting', title: '设置', icon: 'setting-o', activeIcon: 'setting', text: '设置内容区域' }];
</script>
<template>
  <section class="doc-page" data-find-item="BbTabbar"><div class="doc-header"><p class="eyebrow">导航</p><h2>BbTabbar</h2><p>BbTabbar 提供“内容区 + tabbar”的布局容器，适合移动端多页面模块切换。默认插槽子节点必须包含 name 和 title，可选 icon/activeIcon；组件会根据当前 active 只展示对应内容。navPosition 可在 bottom/top 间切换，vanProps 会透传给 Vant Tabbar。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbTabbar v-model=&quot;active&quot; nav-position=&quot;bottom&quot;&gt;
  &lt;section name=&quot;home&quot; title=&quot;首页&quot; icon=&quot;home-o&quot;&gt;内容&lt;/section&gt;
&lt;/BbTabbar&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前激活 tab name；默认 undefined。</span></div><div class="api-item"><code>navPosition</code><span>导航位置 top/bottom；string，默认 bottom。</span></div><div class="api-item"><code>followFullScreen</code><span>全屏时隐藏 tabbar；boolean，默认 false。</span></div><div class="api-item"><code>vanProps</code><span>透传给 van-tabbar；object，默认 {}。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>切换 tabbar 项时更新 active name。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>页面子节点，必须包含 name/title，可选 icon/activeIcon。</span></div></div></div></section>
  <section class="demo-section"><h2>bottom 与 activeIcon</h2><div class="tabbar-section"><BbTabbar v-model="bottomActive" nav-position="bottom" :van-props="{ activeColor: '#e96736' }"><template v-for="item in items" :key="item.name"><section :name="item.name" :title="item.title" :icon="item.icon" :active-icon="item.activeIcon" class="panel-card">{{ item.text }}</section></template></BbTabbar></div></section>
  <section class="demo-section"><h2>top 与 vanProps</h2><div class="tabbar-section"><BbTabbar v-model="topActive" nav-position="top" :van-props="{ inactiveColor: '#667085', activeColor: '#1989fa' }"><template v-for="item in items" :key="item.name"><section :name="item.name" :title="item.title" :icon="item.icon" class="panel-card">顶部导航：{{ item.text }}</section></template></BbTabbar></div></section>
</template>
