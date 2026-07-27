<template>
  <div
    ref="rootRef"
    class="bb-floating-button-container"
    :class="{ dragging }"
    :style="positionStyle"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <slot>
      <van-button class="floating-button" size="mini" type="primary" @click="toRotate">
        旋转屏幕
        <template #icon>
          <van-icon :name="icon" />
        </template>
      </van-button>
    </slot>
  </div>
</template>
<script setup lang="ts">
import icon from "./images/rotate.png";
import { useDeviceInfo } from "@/stores";

const props = defineProps({
  right: {
    type: [Number, String],
    default: 18,
  },
  bottom: {
    type: [Number, String],
    default: 92,
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

const deviceInfo = useDeviceInfo();
const rootRef = ref<HTMLElement | null>(null);
const dragging = ref(false);
const moved = ref(false);
const DRAG_THRESHOLD = 8;
let dragStart: { x: number; y: number; right: number; bottom: number } | null = null;
let capturedPointerId: number | null = null;
let ignoreClick = false;

const position = ref({
  right: toNumber(props.right, 18),
  bottom: toNumber(props.bottom, 92),
});
const storageKey = computed(() => {
  if (props.positionKey) return props.positionKey;
  const path = typeof location === "undefined" ? "default" : location.pathname;
  return `bb-rotate:${path}`;
});
const positionStyle = computed(() => ({
  right: `${position.value.right}px`,
  bottom: `${position.value.bottom}px`,
  zIndex: props.zIndex,
}));

function toNumber(value: number | string, defaultValue: number) {
  const parsed = Number.parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : defaultValue;
}
function toRotate() {
  if (ignoreClick) return;
  deviceInfo.rotateScreen();
}
function clampPosition(nextRight: number, nextBottom: number) {
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
  if (!props.rememberPosition || typeof localStorage === "undefined") return;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey.value) || "null");
    if (!saved) return;
    position.value = clampPosition(Number(saved.right), Number(saved.bottom));
  } catch (err) {
    console.log(err);
  }
}
function savePosition() {
  if (!props.rememberPosition || typeof localStorage === "undefined") return;
  localStorage.setItem(storageKey.value, JSON.stringify(position.value));
}
function onPointerDown(event: PointerEvent) {
  if (event.button !== undefined && event.button !== 0) return;
  dragging.value = true;
  moved.value = false;
  dragStart = {
    x: event.clientX,
    y: event.clientY,
    right: position.value.right,
    bottom: position.value.bottom,
  };
}
function onPointerMove(event: PointerEvent) {
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

watch(
  () => [props.right, props.bottom],
  () => {
    if (props.rememberPosition) return;
    position.value = {
      right: toNumber(props.right, 18),
      bottom: toNumber(props.bottom, 92),
    };
  },
);
onMounted(loadPosition);
</script>
<style lang="less" scoped>
.bb-floating-button-container {
  position: fixed;
  touch-action: none;
  user-select: none;

  &.dragging {
    cursor: grabbing;
  }
}
</style>
