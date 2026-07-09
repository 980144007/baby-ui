<script setup lang="ts">
import { ref } from 'vue';
import { BbPicker } from '../../src';

const value = ref('');
const options = [
  { text: '选项一', value: '1' },
  { text: '选项二', value: '2' },
  { text: '选项三', value: '3' },
];
</script>

<template>
  <main class="demo-page">
    <h1>BugBaby UI</h1>

    <section class="demo-section">
      <h2>组件示例</h2>
      <BbPicker v-model="value" title="选择器" :options="options" placeholder="请选择" />
    </section>
  </main>
</template>

<style lang="less">
body {
  margin: 0;
  background: #f5f7fa;
  font-family: Arial, Helvetica, sans-serif;
}

.demo-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 16px;
}

.demo-section {
  margin-top: 24px;
  padding: 20px;
  border-radius: 12px;
  background: #fff;

  h2 {
    margin: 0 0 16px;
    font-size: 18px;
  }
}
</style>
