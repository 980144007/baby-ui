<script lang="ts">
export const docMeta = { name: 'BbTabs', category: '导航', summary: '基于 Vant Tabs 的标签页容器，支持 slot 子页、tabs 配置、小尺寸和 vanProps 透传。', order: 17 };
</script>
<script setup lang="ts">
import { defineComponent, h, ref } from 'vue';
import BbTabs from './BbTabs.vue';
defineOptions({ name: 'BbTabsDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue';
import { BbTabs } from '@sunshine-baby/baby-ui';

const active = ref('profile');
${'</scr' + 'ipt>'}

<template>
  <BbTabs v-model="active" :van-props="{ swipeable: true }">
    <section name="profile" title="资料">资料内容</section>
    <section name="records" title="记录">记录内容</section>
  </BbTabs>
</template>`,
  demo1: `<script setup lang="ts">
import { ref } from 'vue';
import { BbTabs } from '@sunshine-baby/baby-ui';

const slotActive = ref('profile');
const tabItems = [
  { name: 'profile', title: '资料', text: '宝宝昵称、生日和基础信息。' },
  { name: 'records', title: '记录', text: '喂养、睡眠、体温等日常数据。' },
  { name: 'growth', title: '成长', text: '身高、体重和成长趋势。' },
];
${'</scr' + 'ipt>'}

<template>
  <div class="tabs-section">
    <BbTabs v-model="slotActive" :van-props="{ swipeable: true, animated: true }">
      <template v-for="item in tabItems" :key="item.name">
        <section :name="item.name" :title="item.title" class="panel-card">
          {{ item.text }}
        </section>
      </template>
    </BbTabs>
  </div>
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbTabs } from '@sunshine-baby/baby-ui';

const configActive = ref('feed');
const Panel = {
  props: ['text'],
  template: '<div class="panel-card">{{ text }}</div>',
};
const configTabs = [
  { name: 'feed', title: '喂养', text: '配置方式：喂养记录', component: Panel },
  { name: 'sleep', title: '睡眠', text: '配置方式：睡眠记录', component: Panel },
];
${'</scr' + 'ipt>'}

<template>
  <div class="tabs-section">
    <BbTabs v-model="configActive" :tabs="configTabs" :van-props="{ ellipsis: false }" />
  </div>
</template>`,
  demo3: `<script setup lang="ts">
import { ref } from 'vue';
import { BbTabs } from '@sunshine-baby/baby-ui';

const smallActive = ref('a');
${'</scr' + 'ipt>'}

<template>
  <div class="tabs-section">
    <BbTabs v-model="smallActive" size="small">
      <section name="a" title="小标签 A" class="panel-card">小尺寸标签页 A</section>
      <section name="b" title="小标签 B" class="panel-card">小尺寸标签页 B</section>
    </BbTabs>
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
const slotActive = ref('profile'); const configActive = ref('feed'); const smallActive = ref('a');
const tabItems = [{ name: 'profile', title: '资料', text: '宝宝昵称、生日和基础信息。' }, { name: 'records', title: '记录', text: '喂养、睡眠、体温等日常数据。' }, { name: 'growth', title: '成长', text: '身高、体重和成长趋势。' }];
const Panel = defineComponent({ props: { text: String }, setup(props) { return () => h('div', { class: 'panel-card' }, props.text); } });
const configTabs = [{ name: 'feed', title: '喂养', text: '配置方式：喂养记录', component: Panel }, { name: 'sleep', title: '睡眠', text: '配置方式：睡眠记录', component: Panel }];
</script>
<template>
  <section class="doc-page" data-find-item="BbTabs"><div class="doc-header"><p class="eyebrow">导航</p><h2>BbTabs</h2><p>BbTabs 封装 Vant Tabs，并把默认插槽子节点或 tabs 配置转换为标签页。默认插槽方式要求每个子节点都带 name 和 title；tabs 配置方式适合从数组动态生成页面，并且优先级高于 slot。vanProps 会透传给 van-tabs，可用于 animated、swipeable、ellipsis 等 Vant 能力。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>modelValue</code><span>当前激活 tab name；默认 undefined。</span></div><div class="api-item"><code>tabs</code><span>配置式标签页数组，包含 name、title、component 和组件 props；默认 []。</span></div><div class="api-item"><code>size</code><span>尺寸，normal/small；默认 normal。</span></div><div class="api-item"><code>followFullScreen</code><span>全屏时隐藏 tabs 头；boolean，默认 false。</span></div><div class="api-item"><code>vanProps</code><span>透传给 van-tabs；object，默认 {}。</span></div></div></div><div class="doc-block"><h3>Events</h3><div class="api-list"><div class="api-item"><code>update:modelValue</code><span>切换标签时更新 active name。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>标签页子节点，必须包含 name、title。</span></div></div></div></section>
  <section class="demo-section"><h2>slot 方式与 vanProps</h2><div class="tabs-section"><BbTabs v-model="slotActive" :van-props="{ swipeable: true, animated: true }"><template v-for="item in tabItems" :key="item.name"><section :name="item.name" :title="item.title" class="panel-card">{{ item.text }}</section></template></BbTabs></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>tabs 配置方式</h2><div class="tabs-section"><BbTabs v-model="configActive" :tabs="configTabs" :van-props="{ ellipsis: false }" /></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
  <section class="demo-section"><h2>small size</h2><div class="tabs-section"><BbTabs v-model="smallActive" size="small"><section name="a" title="小标签 A" class="panel-card">小尺寸标签页 A</section><section name="b" title="小标签 B" class="panel-card">小尺寸标签页 B</section></BbTabs></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo3')">{{ expandedCodes.demo3 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo3', demoCodes.demo3)">{{ copiedKey === 'demo3' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo3 }"><code>{{ demoCodes.demo3 }}</code></pre></div></section>
</template>
