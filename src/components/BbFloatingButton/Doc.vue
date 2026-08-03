<script lang="ts">
export const docMeta = { name: 'BbFloatingButton', category: '浮层', summary: '固定定位的圆形浮动按钮容器，支持默认 text、自定义插槽、位置与尺寸配置。', order: 15 };
</script>
<script setup lang="ts">
import { ref, inject, onMounted, reactive } from 'vue';
import BbFloatingButton from './BbFloatingButton.vue';
defineOptions({ name: 'BbFloatingButtonDoc' });
const demoCodes = reactive({
  basic: `<script setup lang="ts">
import { BbFloatingButton } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <BbFloatingButton text="操作" right="10vw" bottom="20vh" size="50px" />
</template>`,
  demo1: `<script setup lang="ts">
import { BbFloatingButton } from '@sunshine-baby/baby-ui';
${'</scr' + 'ipt>'}

<template>
  <div class="floating-card">
    <BbFloatingButton
      text="反馈"
      right="16px"
      bottom="16px"
      size="56px"
      z-index="3"
    />
  </div>
</template>`,
  demo2: `<script setup lang="ts">
import { ref } from 'vue';
import { BbFloatingButton } from '@sunshine-baby/baby-ui';

const count = ref(0);
${'</scr' + 'ipt>'}

<template>
  <div class="floating-card">
    <BbFloatingButton right="16px" bottom="16px" size="64px" z-index="3">
      <van-button
        class="floating-button inline-floating"
        size="small"
        type="primary"
        @click="count++"
      >
        点击 {{ count }}
      </van-button>
    </BbFloatingButton>
  </div>
</template>`
});
const playground = inject('baby-ui-playground') as { activeCode: import('vue').Ref<string>; setPreview: (payload: { title: string; code: string }) => void };
function previewCode(key: keyof typeof demoCodes, label: string) { playground.setPreview({ title: 'BbFloatingButton · ' + label, code: demoCodes[key] }); }
onMounted(() => previewCode('basic', '基础用法'));
const expandedCodes = ref<Record<string, boolean>>({});
function toggleCode(key: string) { expandedCodes.value[key] = !expandedCodes.value[key]; }
const copiedKey = ref('');
async function copyCode(key: string, code: string) {
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(code);
  else { const textarea = document.createElement('textarea'); textarea.value = code; textarea.style.position = 'fixed'; textarea.style.opacity = '0'; document.body.appendChild(textarea); textarea.select(); document.execCommand('copy'); document.body.removeChild(textarea); }
  copiedKey.value = key;
  setTimeout(() => { copiedKey.value = ''; }, 1200);
}
const count = ref(0);
</script>
<template>
  <section class="doc-page" data-find-item="BbFloatingButton"><div class="doc-header"><p class="eyebrow">浮层</p><h2>BbFloatingButton</h2><p>BbFloatingButton 是一个简单的 fixed 圆形浮动按钮容器，适合“新增”“客服”“反馈”等固定操作入口。默认插槽为空时渲染 Vant primary mini 按钮并展示 text；传入默认插槽后可完全自定义内容。组件只负责定位和圆形尺寸，不内置点击事件，业务操作应绑定在插槽内容上。</p></div><div class="doc-block"><h3>基础用法</h3><div class="demo-code"><div class="demo-code-header"><span>基础代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('basic', '基础用法')">{{ playground.activeCode.value === demoCodes.basic ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('basic')">{{ expandedCodes.basic ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('basic', demoCodes.basic)">{{ copiedKey === 'basic' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.basic" class="demo-code-editor" :class="{ expanded: expandedCodes.basic, active: playground.activeCode.value === demoCodes.basic }" spellcheck="false" @focus="previewCode('basic', '基础用法')" @input="previewCode('basic', '基础用法')" /></div></div><div class="doc-block"><h3>Props</h3><div class="api-list"><div class="api-item"><code>text</code><span>默认按钮文案；string，默认空字符串。</span></div><div class="api-item"><code>right / bottom</code><span>fixed 定位；number|string，默认 10vw / 20vh。</span></div><div class="api-item"><code>size</code><span>默认按钮宽高和圆形直径；number|string，默认 50px。</span></div><div class="api-item"><code>zIndex</code><span>浮层层级；number|string，默认 999。</span></div></div></div><div class="doc-block"><h3>Slots</h3><div class="api-list"><div class="api-item"><code>default</code><span>替换默认按钮内容。</span></div></div></div></section>
  <section class="demo-section"><h2>默认 text、定位和尺寸</h2><div class="legacy-inline-demo"><div class="floating-card"><BbFloatingButton text="反馈" right="16px" bottom="16px" size="56px" z-index="3" /></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo1', '默认 text、定位和尺寸')">{{ playground.activeCode.value === demoCodes.demo1 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo1')">{{ expandedCodes.demo1 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo1', demoCodes.demo1)">{{ copiedKey === 'demo1' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo1" class="demo-code-editor" :class="{ expanded: expandedCodes.demo1, active: playground.activeCode.value === demoCodes.demo1 }" spellcheck="false" @focus="previewCode('demo1', '默认 text、定位和尺寸')" @input="previewCode('demo1', '默认 text、定位和尺寸')" /></div></section>
  <section class="demo-section"><h2>自定义 slot</h2><div class="legacy-inline-demo"><div class="floating-card"><BbFloatingButton right="16px" bottom="16px" size="64px" z-index="3"><van-button class="floating-button inline-floating" size="small" type="primary" @click="count++">点击 {{ count }}</van-button></BbFloatingButton></div></div><div class="demo-code"><div class="demo-code-header"><span>示例代码</span><div class="demo-code-actions"><van-button size="mini" plain type="primary" @click="previewCode('demo2', '自定义 slot')">{{ playground.activeCode.value === demoCodes.demo2 ? '当前预览' : '预览' }}</van-button><van-button size="mini" plain type="primary" @click="toggleCode('demo2')">{{ expandedCodes.demo2 ? '收起' : '展开' }}</van-button><van-button size="mini" plain type="primary" @click="copyCode('demo2', demoCodes.demo2)">{{ copiedKey === 'demo2' ? '已复制' : '复制代码' }}</van-button></div></div><textarea v-model="demoCodes.demo2" class="demo-code-editor" :class="{ expanded: expandedCodes.demo2, active: playground.activeCode.value === demoCodes.demo2 }" spellcheck="false" @focus="previewCode('demo2', '自定义 slot')" @input="previewCode('demo2', '自定义 slot')" /></div></section>
</template>
