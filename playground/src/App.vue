<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Component } from 'vue';

type DocMeta = {
  name?: string;
  category?: string;
  summary?: string;
  order?: number;
};

type DocModule = {
  default: Component;
  docMeta?: DocMeta;
};

type ComponentDoc = {
  name: string;
  category: string;
  summary: string;
  order: number;
  component: Component;
};

const docModules = import.meta.glob<DocModule>('../../src/components/*/Doc.vue', { eager: true });
const componentDocs: ComponentDoc[] = Object.entries(docModules)
  .map(([path, module]) => {
    const fallbackName = path.split('/').at(-2) || 'Unknown';
    const meta = module.docMeta || {};

    return {
      name: meta.name || fallbackName,
      category: meta.category || '未分类',
      summary: meta.summary || '',
      order: meta.order ?? Number.MAX_SAFE_INTEGER,
      component: module.default,
    };
  })
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

const selectedDoc = ref(componentDocs[0]?.name || '');

const currentDoc = computed(() => componentDocs.find((item) => item.name === selectedDoc.value) || componentDocs[0]);
</script>

<template>
  <main class="demo-page">
    <header class="hero-card">
      <p class="eyebrow">SunshineBaby UI</p>
      <h1>组件文档与 Playground</h1>
      <p>为 <code>src/index.ts</code> 导出的组件提供独立说明页、API 说明和可运行示例。</p>
    </header>

    <nav class="docs-nav" aria-label="组件文档导航">
      <button
        v-for="doc in componentDocs"
        :key="doc.name"
        type="button"
        class="doc-nav-item"
        :class="{ active: selectedDoc === doc.name }"
        @click="selectedDoc = doc.name"
      >
        <span>{{ doc.name }}</span>
        <small>{{ doc.category }}</small>
      </button>
    </nav>

    <div v-if="currentDoc" :data-find-item="currentDoc.name">
      <component :is="currentDoc.component" />
    </div>
  </main>
</template>

<style lang="less">
body {
  margin: 0;
  background: #f5f7fa;
  color: #1f2933;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button,
input {
  font: inherit;
}

.demo-page {
  width: min(100%, 860px);
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 16px 12px 88px;
}

.hero-card,
.docs-nav,
.doc-page,
.demo-section {
  box-sizing: border-box;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.hero-card {
  padding: 24px 18px;
  background: linear-gradient(135deg, #fff7f2, #eef7ff);

  h1 {
    margin: 0 0 10px;
    font-size: 26px;
    line-height: 1.25;
  }

  p {
    margin: 0;
    color: #667085;
    font-size: 14px;
    line-height: 1.7;
  }
}

.eyebrow {
  margin: 0 0 8px;
  color: #e96736;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.docs-nav {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
  margin-top: 14px;
  padding: 12px;
}

.doc-nav-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  background: #fff;
  padding: 10px 12px;
  color: #344054;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 700;
  }

  small {
    color: #98a2b3;
    font-size: 12px;
  }

  &.active {
    border-color: #e96736;
    background: #fff7f2;
    color: #e96736;
  }
}

.doc-page,
.demo-section {
  margin-top: 14px;
  padding: 18px 14px;
  overflow: hidden;
}

.doc-header {
  h2 {
    margin: 0 0 8px;
    font-size: 24px;
  }

  p:last-child {
    margin: 0;
    color: #667085;
    font-size: 14px;
    line-height: 1.7;
  }
}

.doc-block {
  margin-top: 18px;

  h3 {
    margin: 0 0 10px;
    font-size: 16px;
  }

  pre {
    margin: 0;
    overflow-x: auto;
    border-radius: 12px;
    background: #101828;
    padding: 12px;
  }

  pre code {
    color: #f9fafb;
  }
}

.api-list {
  display: grid;
  gap: 8px;
}

.api-item {
  display: grid;
  grid-template-columns: minmax(130px, 210px) 1fr;
  gap: 12px;
  align-items: start;
  border-radius: 12px;
  background: #f7f8fa;
  padding: 10px 12px;
  color: #475467;
  font-size: 13px;
  line-height: 1.6;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.doc-tag {
  border-radius: 999px;
  background: #fff7f2;
  padding: 5px 10px;
  color: #e96736;
  font-size: 12px;
  font-weight: 700;
}

.demo-section {
  h2 {
    margin: 0 0 14px;
    font-size: 17px;
    line-height: 1.4;
  }
}

.hint,
.result-text {
  margin: 8px 0 12px;
  color: #667085;
  font-size: 13px;
  line-height: 1.6;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.cube-stage {
  display: flex;
  justify-content: center;
  min-height: 220px;
  border-radius: 14px;
  background: #111827;
}

.filter-tip {
  padding: 8px 14px;
  color: #98a2b3;
  font-size: 13px;
}

.result-card,
.panel-card {
  box-sizing: border-box;
  border-radius: 12px;
  background: #f7f8fa;
  padding: 14px;
  color: #475467;
  font-size: 14px;
  line-height: 1.6;
}

.result-card {
  margin-bottom: 12px;
}

.image-desc {
  margin-top: 4px;
  text-align: center;
  color: #98a2b3;
  font-size: 12px;
}

.fixed-height-demo {
  height: 300px;
  display: flex;
  flex-direction: column;
}

.floating-card {
  position: relative;
  min-height: 112px;

  .bb-floating-button-container {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }
}

.inline-floating {
  border-radius: 999px;
}

.tabs-section {
  min-height: 230px;

  .bb-tabs-container {
    height: 170px;
  }
}

.tabbar-section {
  min-height: 260px;

  .bb-tabbar-container {
    height: 200px;
    border: 1px solid #eef0f4;
    border-radius: 14px;
    overflow: hidden;
  }
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

code {
  color: #e96736;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

@media (max-width: 520px) {
  .api-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
