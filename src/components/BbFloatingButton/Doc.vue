<script lang="ts">
export const docMeta = { name: 'BbFloatingButton', category: '浮层', summary: '固定定位的圆形浮动按钮容器，支持默认 text、自定义插槽、位置与尺寸配置。', order: 15 };
</script>
<script setup lang="ts">
import { ref } from 'vue';
import BbFloatingButton from './BbFloatingButton.vue';
defineOptions({ name: 'BbFloatingButtonDoc' });
const count = ref(0);
</script>
<template>
  <section class="doc-page" data-find-item="BbFloatingButton"><div class="doc-header"><p class="eyebrow">浮层</p><h2>BbFloatingButton</h2><p>BbFloatingButton 是一个简单的 fixed 圆形浮动按钮容器，适合“新增”“客服”“反馈”等固定操作入口。默认插槽为空时渲染 Vant primary mini 按钮并展示 text；传入默认插槽后可完全自定义内容。组件只负责定位和圆形尺寸，不内置点击事件，业务操作应绑定在插槽内容上。</p></div><div class="doc-block"><h3>基础用法</h3><pre><code>&lt;BbFloatingButton text=&quot;操作&quot; right=&quot;10vw&quot; bottom=&quot;20vh&quot; size=&quot;50px&quot; /&gt;</code></pre></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>text</code><span>默认按钮文案；string，默认空字符串。</span></div><div class="api-item"><code>right / bottom</code><span>fixed 定位；number|string，默认 10vw / 20vh。</span></div><div class="api-item"><code>size</code><span>默认按钮宽高和圆形直径；number|string，默认 50px。</span></div><div class="api-item"><code>zIndex</code><span>浮层层级；number|string，默认 999。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>替换默认按钮内容。</span></div></div></div></section>
  <section class="demo-section"><h2>默认 text、定位和尺寸</h2><div class="floating-card"><BbFloatingButton text="反馈" right="16px" bottom="16px" size="56px" z-index="3" /></div></section>
  <section class="demo-section"><h2>自定义 slot</h2><div class="floating-card"><BbFloatingButton right="16px" bottom="16px" size="64px" z-index="3"><van-button class="floating-button inline-floating" size="small" type="primary" @click="count++">点击 {{ count }}</van-button></BbFloatingButton></div></section>
</template>
