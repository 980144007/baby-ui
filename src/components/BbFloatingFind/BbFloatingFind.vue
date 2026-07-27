<template>
  <div
    ref="rootRef"
    class="bb-floating-find"
    :class="{ expanded: panelOpen, dragging: dragging }"
    :style="positionStyle"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <button
      class="find-toggle"
      type="button"
      aria-label="打开查找"
      @click="openPanel"
    >
      <van-icon name="search" size="21" />
    </button>
    <div class="find-panel">
      <input
        ref="inputRef"
        v-model="keyword"
        class="find-input"
        type="search"
        :placeholder="placeholder"
        @pointerdown.stop
        @keyup.enter="search"
      />
      <button
        class="find-action"
        type="button"
        aria-label="搜索"
        @click="search"
      >
        <van-icon name="search" size="18" />
      </button>
      <button
        class="find-action"
        :class="{ active: canPrev }"
        type="button"
        aria-label="上一个"
        :disabled="!canPrev"
        @click="go(-1)"
      >
        <van-icon name="arrow-up" size="18" />
      </button>
      <button
        class="find-action"
        :class="{ active: canNext }"
        type="button"
        aria-label="下一个"
        :disabled="!canNext"
        @click="go(1)"
      >
        <van-icon name="arrow-down" size="18" />
      </button>
      <button
        class="find-action close"
        type="button"
        aria-label="关闭查找"
        @click="closePanel"
      >
        <van-icon name="cross" size="18" />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "查找当前内容",
  },
  searchRoot: {
    type: [Object, String],
    default: null,
  },
  candidateSelector: {
    type: String,
    default:
      "[data-find-item], .section-title, .detail-field, .card-head, .cm-aipics-card-container .header, .cm-aipics-card-container .desc, .cm-aipics-card-container .no-ai-box, .cm-aipics-card-container .line, .van-field, input, textarea",
  },
  offsetTop: {
    type: Number,
    default: 56,
  },
  right: {
    type: Number,
    default: 14,
  },
  bottom: {
    type: Number,
    default: 64,
  },
  rememberPosition: {
    type: Boolean,
    default: false,
  },
  positionKey: {
    type: String,
    default: "",
  },
  zIndex: {
    type: [Number, String],
    default: 20,
  },
});

const rootRef = ref(null);
const inputRef = ref(null);
const panelOpen = ref(false);
const keyword = ref("");
const matches = ref([]);
const activeIndex = ref(-1);
const lastSearchKeyword = ref("");
const position = ref({ right: props.right, bottom: props.bottom });
const storageKey = computed(() => {
  if (props.positionKey) return props.positionKey;
  const path = typeof location === "undefined" ? "default" : location.pathname;
  const rootKey = typeof props.searchRoot === "string" ? props.searchRoot : "parent";
  return `bb-floating-find:${path}:${rootKey}`;
});
const dragging = ref(false);
const moved = ref(false);
const DRAG_THRESHOLD = 8;
let dragStart = null;
let capturedPointerId = null;
let activeElement = null;
let ignoreClick = false;

const canPrev = computed(() => matches.value.length > 1 && activeIndex.value > 0);
const canNext = computed(
  () => matches.value.length > 1 && activeIndex.value < matches.value.length - 1,
);
const positionStyle = computed(() => ({
  right: `${position.value.right}px`,
  bottom: `${position.value.bottom}px`,
  zIndex: props.zIndex,
}));

function openPanel() {
  if (ignoreClick) return;
  panelOpen.value = true;
  nextTick(() => inputRef.value?.focus());
}
function closePanel() {
  if (ignoreClick) return;
  panelOpen.value = false;
  keyword.value = "";
  lastSearchKeyword.value = "";
  reset();
}
function clearActive() {
  activeElement?.classList.remove("bb-floating-find-active");
  activeElement = null;
}
function reset() {
  clearActive();
  matches.value = [];
  activeIndex.value = -1;
}
function getSearchRoot() {
  if (typeof props.searchRoot === "string") {
    return document.querySelector(props.searchRoot);
  }
  return props.searchRoot || rootRef.value?.parentElement || null;
}
function getScrollElement() {
  const container = getSearchRoot();
  if (!container) return null;
  const overflowY = window.getComputedStyle(container).overflowY;
  if (["auto", "scroll"].includes(overflowY)) return container;
  let current = container.parentElement;
  while (current && current !== document.body) {
    const currentOverflowY = window.getComputedStyle(current).overflowY;
    if (["auto", "scroll"].includes(currentOverflowY)) return current;
    current = current.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}
function getText(el) {
  const parts = [];
  if (el.matches?.("input, textarea")) parts.push(el.value || "");
  parts.push(el.innerText || el.textContent || "");
  el.querySelectorAll("input, textarea").forEach((input) => {
    parts.push(input.value || "");
  });
  return parts.join(" ").replace(/\s+/g, " ").toLowerCase();
}
function collectMatches() {
  const text = keyword.value.trim().toLowerCase();
  const container = getSearchRoot();
  if (!text || !container) return [];

  return Array.from(container.querySelectorAll(props.candidateSelector)).filter((el) => {
    return (
      !rootRef.value?.contains(el) &&
      el.getClientRects().length &&
      getText(el).includes(text)
    );
  });
}
function scrollTo(index) {
  const target = matches.value[index];
  const scrollEl = getScrollElement();
  if (!target || !scrollEl) return;

  clearActive();
  target.classList.add("bb-floating-find-active");
  activeElement = target;
  activeIndex.value = index;

  const targetRect = target.getBoundingClientRect();
  const scrollRect = scrollEl.getBoundingClientRect();
  const top = scrollEl.scrollTop + targetRect.top - scrollRect.top - props.offsetTop;
  scrollEl.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}
function search() {
  if (ignoreClick) return;
  const text = keyword.value.trim();
  if (!text) {
    inputRef.value?.focus();
    return;
  }

  if (text === lastSearchKeyword.value && matches.value.length) {
    go(1);
    return;
  }

  reset();
  lastSearchKeyword.value = text;
  matches.value = collectMatches();
  if (!matches.value.length) {
    $toast("未找到匹配内容");
    return;
  }
  scrollTo(0);
}
function go(step) {
  if (ignoreClick) return;
  if (!keyword.value.trim()) {
    inputRef.value?.focus();
    return;
  }
  if (!matches.value.length) matches.value = collectMatches();
  if (!matches.value.length) {
    $toast("未找到匹配内容");
    return;
  }
  const currentIndex = activeIndex.value < 0 ? 0 : activeIndex.value;
  const nextIndex = Math.min(
    Math.max(currentIndex + step, 0),
    matches.value.length - 1,
  );
  if (nextIndex === currentIndex) return;
  scrollTo(nextIndex);
}
function clampPosition(nextRight, nextBottom) {
  const rect = rootRef.value?.getBoundingClientRect();
  const width = rect?.width || 42;
  const height = rect?.height || 42;
  const maxRight = Math.max(window.innerWidth - width, 0);
  const maxBottom = Math.max(window.innerHeight - height, 0);
  return {
    right: Math.min(Math.max(nextRight, 0), maxRight),
    bottom: Math.min(Math.max(nextBottom, 0), maxBottom),
  };
}
function loadPosition() {
  if (!props.rememberPosition) return;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey.value) || "null");
    if (!saved) return;
    position.value = clampPosition(Number(saved.right), Number(saved.bottom));
  } catch (err) {
    console.log(err);
  }
}
function savePosition() {
  if (!props.rememberPosition) return;
  localStorage.setItem(storageKey.value, JSON.stringify(position.value));
}
function onPointerDown(event) {
  if (event.button !== undefined && event.button !== 0) return;
  if (event.target?.closest?.("input")) return;
  dragging.value = true;
  moved.value = false;
  dragStart = {
    x: event.clientX,
    y: event.clientY,
    right: position.value.right,
    bottom: position.value.bottom,
  };
}
function onPointerMove(event) {
  if (!dragging.value || !dragStart) return;
  const deltaX = event.clientX - dragStart.x;
  const deltaY = event.clientY - dragStart.y;
  if (!moved.value) {
    if (Math.abs(deltaX) <= DRAG_THRESHOLD && Math.abs(deltaY) <= DRAG_THRESHOLD) return;
    moved.value = true;
    capturedPointerId = event.pointerId;
    rootRef.value?.setPointerCapture?.(capturedPointerId);
  }
  event.preventDefault();
  position.value = clampPosition(dragStart.right - deltaX, dragStart.bottom - deltaY);
}
function onPointerUp() {
  if (!dragging.value) return;
  if (capturedPointerId !== null) {
    rootRef.value?.releasePointerCapture?.(capturedPointerId);
    capturedPointerId = null;
  }
  dragging.value = false;
  dragStart = null;
  if (moved.value) {
    savePosition();
    ignoreClick = true;
    setTimeout(() => {
      ignoreClick = false;
      moved.value = false;
    }, 0);
  }
}

watch(keyword, () => {
  lastSearchKeyword.value = "";
  reset();
});
watch(() => props.searchRoot, () => {
  lastSearchKeyword.value = "";
  reset();
});
onMounted(loadPosition);
onBeforeUnmount(clearActive);
</script>

<style scoped lang="less">
.bb-floating-find {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  touch-action: none;
  user-select: none;

  .find-toggle,
  .find-panel {
    transition:
      opacity 0.18s ease,
      transform 0.18s ease,
      width 0.18s ease;
    will-change: opacity, transform, width;
  }

  .find-toggle,
  .find-action {
    padding: 0;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: var(--van-primary-color);
  }

  .find-toggle {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    box-shadow: 0 8px 18px rgba(var(--van-primary-color-rgb), 0.22);
    opacity: 1;
    transform: scale(1);
  }

  .find-panel {
    overflow: hidden;
    width: 0;
    height: 42px;
    margin-left: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 9999px;
    background: var(--app-canvas);
    border: 1px solid var(--app-hairline);
    box-shadow: 0 8px 18px rgba(16, 24, 40, 0.12);
    display: flex;
    align-items: center;
    opacity: 0;
    transform: translateX(8px) scale(0.98);
    pointer-events: none;
  }

  &.expanded {
    .find-toggle {
      opacity: 0;
      transform: scale(0.85);
      pointer-events: none;
      width: 0;
      margin: 0;
    }

    .find-panel {
      width: min(272px, calc(100vw - 28px));
      padding: 0 6px 0 12px;
      opacity: 1;
      transform: translateX(0) scale(1);
      pointer-events: auto;
    }
  }

  &.dragging {
    .find-toggle,
    .find-panel {
      transition: none;
    }
  }

  .find-input {
    min-width: 0;
    flex: 1;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    color: var(--app-ink);
    font-size: 13px;
    font-weight: 500;
    user-select: text;
    touch-action: auto;

    &::placeholder {
      color: var(--app-ink-muted);
      font-weight: 400;
    }
  }

  .find-action {
    width: 30px;
    height: 30px;
    margin-left: 2px;
    border-radius: 50%;
    color: #b8c0cc;
    background: transparent;

    &:first-of-type,
    &.active {
      color: var(--van-primary-color);
    }

    &.close {
      color: var(--app-ink-muted);
    }

    &:disabled {
      color: #b8c0cc;
    }
  }
}

:global(.bb-floating-find-active) {
  outline: 2px solid rgba(var(--van-primary-color-rgb), 0.55);
  outline-offset: 2px;
  border-radius: 6px;
  background: rgba(var(--van-primary-color-rgb), 0.08);
  transition:
    outline-color 0.2s ease,
    background-color 0.2s ease;
}
</style>
