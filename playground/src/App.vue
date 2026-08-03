<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from "vue";
import type { Component } from "vue";
import { playgroundKey } from "./playground-context";

export type DocMeta = {
  name?: string;
  category?: string;
  summary?: string;
  order?: number;
};
type DocModule = { default: Component; docMeta?: DocMeta };
type ComponentDoc = {
  name: string;
  category: string;
  summary: string;
  order: number;
  component: Component;
};

const docModules = import.meta.glob<DocModule>(
  "../../src/components/*/Doc.vue",
  { eager: true },
);
const componentDocs: ComponentDoc[] = Object.entries(docModules)
  .map(([path, module]) => {
    const pathParts = path.split("/");
    const fallbackName = pathParts[pathParts.length - 2] || "Unknown";
    const meta = module.docMeta || {};
    return {
      name: meta.name || fallbackName,
      category: meta.category || "未分类",
      summary: meta.summary || "",
      order: meta.order ?? Number.MAX_SAFE_INTEGER,
      component: module.default,
    };
  })
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

const selectedDoc = ref(componentDocs[0]?.name || "");
const previewTitle = ref("请选择示例");
const activeCode = ref("");
const currentDoc = computed(
  () =>
    componentDocs.find((item) => item.name === selectedDoc.value) ||
    componentDocs[0],
);
const groupedDocs = computed(() => {
  const groups: Record<string, ComponentDoc[]> = {};
  componentDocs.forEach((doc) => (groups[doc.category] ||= []).push(doc));
  return Object.entries(groups);
});
const playgroundContext = {
  activeCode,
  setPreview(payload: { title: string; code: string }) {
    previewTitle.value = payload.title;
    activeCode.value = payload.code;
  },
};
provide(playgroundKey, playgroundContext);
provide("baby-ui-playground", playgroundContext);

const previewFrame = ref<HTMLIFrameElement | null>(null);
const previewUrl = `${import.meta.env.BASE_URL.replace(/\/?$/, "/")}preview.html`;

function sendPreviewCode() {
  previewFrame.value?.contentWindow?.postMessage(
    { type: "baby-ui-preview:update", code: activeCode.value },
    location.origin,
  );
}

function handlePreviewMessage(event: MessageEvent) {
  if (
    event.source === previewFrame.value?.contentWindow &&
    event.origin === location.origin &&
    event.data?.type === "baby-ui-preview:ready"
  ) {
    sendPreviewCode();
  }
}

watch(activeCode, sendPreviewCode, { flush: "post" });
onMounted(() => window.addEventListener("message", handlePreviewMessage));
onBeforeUnmount(() => window.removeEventListener("message", handlePreviewMessage));
</script>

<template>
  <main class="playground-shell">
    <aside class="sidebar">
      <div class="brand">
        <span>SunshineBaby UI</span><strong>组件菜单</strong>
      </div>
      <nav class="docs-nav" aria-label="组件文档导航">
        <section
          v-for="[category, docs] in groupedDocs"
          :key="category"
          class="nav-group"
        >
          <h2>{{ category }}</h2>
          <button
            v-for="doc in docs"
            :key="doc.name"
            type="button"
            class="doc-nav-item"
            :class="{ active: selectedDoc === doc.name }"
            @click="selectedDoc = doc.name"
          >
            <span>{{ doc.name }}</span
            ><small>{{ doc.summary }}</small>
          </button>
        </section>
      </nav>
    </aside>

    <section class="content-column">
      <header class="hero-card">
        <p class="eyebrow">SunshineBaby UI Playground</p>
        <h1>组件 API 与实时示例</h1>
        <p>编辑完整 Vue SFC，右侧移动端预览会立即更新。</p>
      </header>
      <div
        v-if="currentDoc"
        :key="currentDoc.name"
        class="current-doc"
        :data-find-item="currentDoc.name"
      >
        <component :is="currentDoc.component" />
      </div>
    </section>

    <aside class="preview-column">
      <div class="preview-heading">
        <span>移动端实时预览</span><small>{{ previewTitle }}</small>
      </div>
      <div class="phone-frame">
        <div class="phone-speaker"></div>
        <div class="phone-screen">
          <div class="status-bar">
            <span>9:41</span><strong>{{ currentDoc?.name }}</strong
            ><span>●●●</span>
          </div>
          <iframe
            ref="previewFrame"
            class="preview-frame"
            :src="previewUrl"
            title="移动端组件实时预览"
            @load="sendPreviewCode"
          />
        </div>
      </div>
    </aside>
  </main>
</template>

<style lang="less">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #f5f7fa;
  color: #1f2933;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
button,
input,
textarea {
  font: inherit;
}
.playground-shell {
  display: grid;
  grid-template-columns: 220px minmax(520px, 1fr) 390px;
  gap: 20px;
  width: min(calc(100% - 32px), 1600px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 0 80px;
  align-items: start;
}
.sidebar,
.preview-column {
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
}
.sidebar {
  overflow: auto;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
.brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 16px;
  border-bottom: 1px solid #eef0f4;
}
.brand span {
  color: #e96736;
  font-size: 12px;
  font-weight: 700;
}
.brand strong {
  font-size: 18px;
}
.docs-nav {
  padding: 10px;
}
.nav-group + .nav-group {
  margin-top: 14px;
}
.nav-group h2 {
  margin: 0 6px 6px;
  color: #98a2b3;
  font-size: 12px;
}
.doc-nav-item {
  display: block;
  width: 100%;
  border: 0;
  border-radius: 10px;
  background: transparent;
  padding: 9px 10px;
  text-align: left;
  cursor: pointer;
}
.doc-nav-item span {
  display: block;
  font-size: 14px;
  font-weight: 700;
}
.doc-nav-item small {
  display: block;
  overflow: hidden;
  color: #98a2b3;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.doc-nav-item.active {
  background: #fff2e9;
  color: #e96736;
}
.hero-card,
.doc-page,
.demo-section {
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
.hero-card {
  padding: 24px;
  background: linear-gradient(135deg, #fff7f2, #eef7ff);
}
.hero-card h1 {
  margin: 0 0 8px;
  font-size: 26px;
}
.hero-card p {
  margin: 0;
  color: #667085;
  line-height: 1.7;
}
.eyebrow {
  margin: 0 0 8px !important;
  color: #e96736 !important;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.doc-page,
.demo-section {
  margin-top: 14px;
  padding: 18px 16px;
  overflow: hidden;
}
.legacy-inline-demo {
  display: none;
}
.doc-header h2 {
  margin: 0 0 8px;
  font-size: 24px;
}
.doc-header p:last-child {
  margin: 0;
  color: #667085;
  font-size: 14px;
  line-height: 1.7;
}
.doc-block {
  margin-top: 18px;
}
.doc-block h3,
.demo-section h2 {
  margin: 0 0 10px;
  font-size: 16px;
}
.doc-block > .demo-code {
  margin-top: 0;
}
.demo-code {
  margin-top: 14px;
}
.demo-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 12px 12px 0 0;
  background: #1f2937;
  padding: 8px 10px;
  color: #f9fafb;
  font-size: 13px;
  font-weight: 700;
}
.demo-code-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}
.demo-code-editor {
  display: block;
  width: 100%;
  height: 220px;
  resize: vertical;
  border: 2px solid transparent;
  border-radius: 0 0 12px 12px;
  outline: none;
  background: #101828;
  padding: 12px;
  color: #f9fafb;
  white-space: pre;
  overflow: auto;
  tab-size: 2;
  font:
    13px/1.55 ui-monospace,
    SFMono-Regular,
    Menlo,
    Consolas,
    monospace;
}
.demo-code-editor.expanded {
  height: 520px;
}
.demo-code-editor.active {
  border-color: #e96736;
}
.api-list {
  display: grid;
  gap: 8px;
}
.api-item {
  display: grid;
  grid-template-columns: minmax(130px, 210px) 1fr;
  gap: 12px;
  border-radius: 12px;
  background: #f7f8fa;
  padding: 10px 12px;
  color: #475467;
  font-size: 13px;
  line-height: 1.6;
}
.tag-list,
.action-row {
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
.hint,
.result-text {
  margin: 8px 0 12px;
  color: #667085;
  font-size: 13px;
  line-height: 1.6;
}
code {
  color: #e96736;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.preview-heading {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
  padding: 0 8px;
  font-weight: 700;
}
.preview-heading small {
  overflow: hidden;
  color: #667085;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.phone-frame {
  width: 390px;
  border: 8px solid #1d2939;
  border-radius: 38px;
  background: #1d2939;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.2);
}
.phone-speaker {
  width: 72px;
  height: 5px;
  margin: 2px auto 8px;
  border-radius: 8px;
  background: #475467;
}
.phone-screen {
  display: flex;
  flex-direction: column;
  width: 374px;
  height: 667px;
  overflow: hidden;
  border-radius: 25px;
  background: #fff;
}
.status-bar {
  flex: none;
  position: relative;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  background: rgba(255, 255, 255, 0.95);
  padding: 0 14px;
  border-bottom: 1px solid #f2f4f7;
  font-size: 11px;
}
.preview-frame {
  display: block;
  flex: 1;
  width: 100%;
  min-height: 0;
  border: 0;
  background: #fff;
}
@media (max-width: 1180px) {
  .playground-shell {
    grid-template-columns: 1fr 390px;
  }
  .sidebar {
    position: static;
    grid-column: 1 / -1;
    max-height: none;
  }
  .brand {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .docs-nav {
    display: flex;
    gap: 14px;
    overflow-x: auto;
  }
  .nav-group {
    display: flex;
    flex: none;
    gap: 4px;
    align-items: center;
  }
  .nav-group + .nav-group {
    margin-top: 0;
  }
  .nav-group h2 {
    margin: 0 4px;
  }
  .doc-nav-item {
    width: auto;
    min-width: 110px;
  }
}
@media (max-width: 820px) {
  .playground-shell {
    display: block;
    width: min(calc(100% - 20px), 680px);
  }
  .content-column {
    min-width: 0;
  }
  .preview-column {
    position: static;
    max-height: none;
    margin: 20px auto 0;
  }
  .phone-frame {
    margin: auto;
  }
}
@media (max-width: 430px) {
  .phone-frame {
    width: 100%;
    border-width: 6px;
  }
  .phone-screen {
    width: 100%;
  }
  .api-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .demo-code-header {
    align-items: flex-start;
    flex-direction: column;
  }
  .preview-column {
    width: 100%;
  }
}
</style>
