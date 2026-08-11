<script setup lang="ts">
import { compileScript, compileTemplate, parse, rewriteDefault } from '@vue/compiler-sfc';
import ts from 'typescript';
import * as Vue from 'vue';
import { computed, defineComponent, h, markRaw, onErrorCaptured, ref, shallowRef, watch } from 'vue';
import * as BabyUI from '../../src';
import * as Vant from 'vant';

const props = defineProps<{ code: string }>();
const component = shallowRef<Vue.Component | null>(null);
const compileError = ref('');
const runtimeError = ref('');
let timer = 0;
let compileVersion = 0;

const modules: Record<string, Record<string, unknown>> = {
  vue: Vue,
  vant: Vant,
  '@sunshine-baby/baby-ui': BabyUI,
};

function requireModule(id: string) {
  const module = modules[id];
  if (!module) throw new Error(`预览不支持导入模块：${id}`);
  return module;
}

function compileSfc(source: string) {
  const id = `playground-${Date.now()}`;
  const { descriptor, errors } = parse(source, { filename: 'PlaygroundDemo.vue' });
  if (errors.length) throw errors[0];
  if (!descriptor.template) throw new Error('示例必须包含 <template>。');

  let scriptCode = 'const __sfc__ = {}';
  let bindings: Record<string, unknown> = {};
  if (descriptor.script || descriptor.scriptSetup) {
    const script = compileScript(descriptor, { id });
    bindings = script.bindings as typeof bindings;
    const isTypeScript = descriptor.script?.lang === 'ts' || descriptor.scriptSetup?.lang === 'ts';
    scriptCode = rewriteDefault(script.content, '__sfc__', isTypeScript ? ['typescript'] : undefined);
  }

  const template = compileTemplate({
    id,
    filename: 'PlaygroundDemo.vue',
    source: descriptor.template.content,
    compilerOptions: { bindingMetadata: bindings as never },
  });
  if (template.errors.length) throw template.errors[0];

  const combined = `${scriptCode}\n${template.code.replace(/export function render/, 'function render')}\n__sfc__.render = render;\nmodule.exports = __sfc__;`;
  const output = ts.transpileModule(combined, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    },
    reportDiagnostics: true,
  });
  const diagnostic = output.diagnostics?.find((item) => item.category === ts.DiagnosticCategory.Error);
  if (diagnostic) throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));

  const module = { exports: {} as Vue.Component };
  new Function('require', 'module', 'exports', output.outputText)(requireModule, module, module.exports);
  return markRaw(module.exports);
}

function updatePreview() {
  const version = ++compileVersion;
  compileError.value = '';
  runtimeError.value = '';
  try {
    const next = compileSfc(props.code);
    if (version === compileVersion) component.value = next;
  } catch (error) {
    if (version === compileVersion) {
      component.value = null;
      compileError.value = error instanceof Error ? error.message : String(error);
    }
  }
}

watch(() => props.code, () => {
  window.clearTimeout(timer);
  timer = window.setTimeout(updatePreview, 300);
}, { immediate: true });

const ErrorBoundary = defineComponent({
  setup(_, { slots }) {
    onErrorCaptured((error) => {
      runtimeError.value = error instanceof Error ? error.message : String(error);
      return false;
    });
    return () => slots.default?.();
  },
});

const previewKey = computed(() => `${props.code.length}:${props.code.slice(0, 24)}`);
</script>

<template>
  <div class="preview-surface">
    <div v-if="compileError || runtimeError" class="preview-error">
      <strong>{{ compileError ? '编译错误' : '运行错误' }}</strong>
      <pre>{{ compileError || runtimeError }}</pre>
    </div>
    <ErrorBoundary v-else-if="component">
      <component :is="component" :key="previewKey" />
    </ErrorBoundary>
    <div v-else class="preview-loading">正在编译预览…</div>
  </div>
</template>

<style scoped>
.preview-surface { box-sizing: border-box; min-height: 100%; padding: 16px 12px 40px; overflow-x: hidden; }
.preview-error { margin: 4px; border: 1px solid #fda29b; border-radius: 10px; background: #fffbfa; padding: 12px; color: #b42318; font-size: 13px; }
.preview-error pre { margin: 8px 0 0; white-space: pre-wrap; word-break: break-word; font: 12px/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.preview-loading { padding: 32px 0; color: #98a2b3; text-align: center; font-size: 13px; }
</style>
