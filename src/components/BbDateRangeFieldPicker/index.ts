import type { App } from "vue";
import { createVNode, render } from "vue";
import BbDateRangeFieldPicker from "./BbDateRangeFieldPicker.vue";

type DateRangeValue = {
  startDate?: string;
  endDate?: string;
  [key: string]: any;
};

type DateRangeOptions = Record<string, any> | DateRangeValue | null;
type DateRangeCallback = (...args: any[]) => void;

interface BbDateRangeCancelError extends Error {
  type: "cancel";
  canceled: true;
}

interface BbDateRangePromise<T = DateRangeValue> extends Promise<T> {
  close: () => void;
}

function pickCallback(options: Record<string, any>, name: string): DateRangeCallback | undefined {
  const callback = options[name];
  delete options[name];
  return typeof callback === "function" ? callback : undefined;
}

function resolveOptions(options: DateRangeOptions = {}): Record<string, any> {
  if (options === null || typeof options !== "object") {
    return {};
  }
  if ("startDate" in options || "endDate" in options) {
    return { modelValue: options };
  }
  return { ...options };
}

function createCancelError(): BbDateRangeCancelError {
  const error = new Error("BbDateRangePicker canceled") as BbDateRangeCancelError;
  error.name = "BbDateRangePickerCancel";
  error.type = "cancel";
  error.canceled = true;
  return error;
}

export function showBbDateRangePicker<T = DateRangeValue>(options: DateRangeOptions = {}): BbDateRangePromise<T> {
  if (typeof document === "undefined") {
    return Promise.reject(createCancelError()) as BbDateRangePromise<T>;
  }

  const pickerProps = resolveOptions(options);
  const onConfirm = pickCallback(pickerProps, "onConfirm");
  const onCancel = pickCallback(pickerProps, "onCancel");
  const onClose = pickCallback(pickerProps, "onClose");
  const onUpdateShow =
    pickCallback(pickerProps, "onUpdateShow") ||
    pickCallback(pickerProps, "onUpdate:show");

  const container = document.createElement("div");
  document.body.appendChild(container);

  let settled = false;
  let cleaned = false;
  let visible = false;
  let currentValue = pickerProps.modelValue;
  let cleanupTimer: number | undefined;
  let resolvePromise!: (value: T) => void;
  let rejectPromise!: (reason?: unknown) => void;

  function cleanup() {
    if (cleaned) return;
    cleaned = true;
    window.clearTimeout(cleanupTimer);
    render(null, container);
    container.parentNode?.removeChild(container);
    onClose?.();
  }

  function scheduleCleanupFallback() {
    cleanupTimer = window.setTimeout(cleanup, 400);
  }

  function renderPicker(show: boolean) {
    visible = show;
    const vnode = createVNode(BbDateRangeFieldPicker, {
      ...pickerProps,
      modelValue: currentValue,
      show,
      showField: false,
      "onUpdate:modelValue": (value: T) => {
        currentValue = value;
      },
      "onUpdate:show": (nextVisible: boolean) => {
        onUpdateShow?.(nextVisible);
        if (!nextVisible && !settled) {
          finish(undefined as T, false);
        }
      },
      onConfirm: (value: T) => {
        finish(value, true);
      },
      onClosed: cleanup,
    });

    render(vnode, container);
  }

  function closePicker() {
    if (!visible) {
      cleanup();
      return;
    }

    renderPicker(false);
    scheduleCleanupFallback();
  }

  function finish(value: T, confirmed: boolean) {
    if (settled) return;
    settled = true;

    if (confirmed) {
      onConfirm?.(value);
      resolvePromise(value);
    } else {
      const cancelError = createCancelError();
      onCancel?.(cancelError);
      rejectPromise(cancelError);
    }

    closePicker();
  }

  const promise = new Promise<T>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  }) as BbDateRangePromise<T>;

  promise.close = () => finish(undefined as T, false);
  renderPicker(false);

  const openPicker =
    typeof window.requestAnimationFrame === "function"
      ? window.requestAnimationFrame
      : window.setTimeout;

  openPicker(() => {
    if (!settled && !cleaned) {
      renderPicker(true);
    }
  });

  return promise;
}

export const showBbDateRangeFieldPicker = showBbDateRangePicker;

function install(app: App) {
  if (!app) return;
  app.component("BbDateRangeFieldPicker", BbDateRangeFieldPicker);

  if (app.config?.globalProperties) {
    app.config.globalProperties.$bbDateRangePicker = showBbDateRangePicker;
  }
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { BbDateRangeFieldPicker };

export default {
  install,
  show: showBbDateRangePicker,
};
