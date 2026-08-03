<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import SfcPreview from './SfcPreview.vue';

const code = ref('');

function handleMessage(event: MessageEvent) {
  if (
    event.source === window.parent &&
    event.origin === location.origin &&
    event.data?.type === 'baby-ui-preview:update' &&
    typeof event.data.code === 'string'
  ) {
    code.value = event.data.code;
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
  window.parent.postMessage({ type: 'baby-ui-preview:ready' }, location.origin);
});
onBeforeUnmount(() => window.removeEventListener('message', handleMessage));
</script>

<template>
  <SfcPreview v-if="code" :code="code" />
  <div v-else class="empty-preview">选择或编辑一个示例开始预览</div>
</template>

<style>
html,
body,
#app {
  width: 100%;
  min-height: 100%;
}
html {
  height: 100%;
}
body {
  margin: 0;
  overflow-x: hidden;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
.empty-preview {
  padding-top: 220px;
  color: #98a2b3;
  text-align: center;
  font-size: 13px;
}
</style>
