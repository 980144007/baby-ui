<script lang="ts">
export const docMeta = { name: 'BbFloatingFind', category: '浮层', summary: '页面浮动查找工具，可在指定 root 内按候选选择器定位匹配内容，并支持偏移和位置记忆。', order: 16 };
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { BbFloatingFind } from './index';
defineOptions({ name: 'BbFloatingFindDoc' });
const demoCodes = {
  basic: `<script setup lang="ts">
import { BbFloatingFind } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <main class="demo-page">
    <div data-find-item>可查找内容</div>
    <BbFloatingFind search-root=".demo-page" candidate-selector="[data-find-item]" placeholder="查找文档" remember-position />
  </main>
</template>`,
  demo1: `<script setup lang="ts">
import { BbFloatingFind } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <div class="result-card" data-find-item>宝宝资料：昵称、生日、地区。</div>
  <div class="result-card" data-find-item>喂养记录：母乳、奶粉、辅食。</div>
  <div class="result-card" data-find-item>成长曲线：身高、体重、头围。</div>
  <BbFloatingFind
    search-root=".demo-page"
    candidate-selector="[data-find-item], .result-card"
    placeholder="查找文档内容"
    :offset-top="72"
    :z-index="30"
  />
</template>`,
  demo2: `<script setup lang="ts">
import { BbFloatingFind } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <BbFloatingFind
    search-root=".demo-page"
    placeholder="记忆位置查找"
    :right="18"
    :bottom="130"
    :offset-top="88"
    remember-position
    position-key="playground-floating-find-doc"
    :z-index="31"
  />
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
</script>
<template>
  <section class="doc-page" data-find-item="BbFloatingFind"><div class="doc-header"><p class="eyebrow">浮层</p><h2>BbFloatingFind</h2><p>BbFloatingFind 为长页面提供轻量搜索定位能力。点击悬浮按钮后输入关键词，组件会在 searchRoot 内按 candidateSelector 收集候选元素并滚动到匹配项。适合文档页、详情页、配置页等内容较长但不需要完整全文检索的场景；注意它不会高亮所有命中，只会给当前命中元素添加临时激活样式。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.basic }"><code>{{ demoCodes.basic }}</code></pre></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>placeholder</code><span>搜索框占位；string，默认“查找当前内容”。</span></div><div class="api-item"><code>searchRoot</code><span>搜索根节点，CSS 选择器或 HTMLElement；默认父元素。</span></div><div class="api-item"><code>candidateSelector</code><span>候选元素选择器；默认包含 data-find-item、表单、输入等。</span></div><div class="api-item"><code>offsetTop</code><span>滚动定位顶部偏移；number，默认 56。</span></div><div class="api-item"><code>right / bottom</code><span>初始位置像素；number，默认 14 / 64。</span></div><div class="api-item"><code>rememberPosition / positionKey / zIndex</code><span>是否记忆拖拽位置、保存 key、层级；默认 false / '' / 20。</span></div></div></div></section>
  <section class="demo-section"><h2>searchRoot / candidateSelector / placeholder</h2><p class="hint">点击右下角搜索按钮，输入“宝宝”“喂养”“成长”可定位下方候选内容。</p><div class="result-card" data-find-item>宝宝资料：昵称、生日、地区。</div><div class="result-card" data-find-item>喂养记录：母乳、奶粉、辅食。</div><div class="result-card" data-find-item>成长曲线：身高、体重、头围。</div><BbFloatingFind search-root=".demo-page" candidate-selector="[data-find-item], .result-card" placeholder="查找文档内容" :offset-top="72" :z-index="30" /><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo1 }"><code>{{ demoCodes.demo1 }}</code></pre></div></section>
  <section class="demo-section"><h2>偏移与记忆位置</h2><p class="hint">该示例启用 rememberPosition，拖动后会按 positionKey 记忆位置。</p><BbFloatingFind search-root=".demo-page" placeholder="记忆位置查找" :right="18" :bottom="130" :offset-top="88" remember-position position-key="playground-floating-find-doc" :z-index="31" /><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><pre :class="{ expanded: expandedCodes.demo2 }"><code>{{ demoCodes.demo2 }}</code></pre></div></section>
</template>
