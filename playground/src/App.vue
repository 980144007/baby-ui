<script setup lang="ts">
import { BabyButton, BabyCell } from '../../src';

function handleClick() {
  console.log('clicked');
}
</script>

<template>
  <main class="demo-page">
    <h1>Baby UI</h1>

    <section class="demo-section">
      <h2>按需引入</h2>
      <BabyButton type="primary" @click="handleClick">Primary Button</BabyButton>
      <BabyButton type="success">Success Button</BabyButton>
      <BabyButton loading>Loading</BabyButton>
    </section>

    <section class="demo-section">
      <h2>全局注册</h2>
      <baby-cell title="标题" value="内容" label="通过 app.use(BabyUI) 注册" clickable />
      <BabyCell title="命名导入" value="支持 import { BabyCell }" />
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
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  border-radius: 12px;
  background: #fff;

  h2 {
    flex-basis: 100%;
    margin: 0 0 8px;
    font-size: 18px;
  }
}
</style>
