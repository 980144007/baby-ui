import type { App } from "vue";
import { createVNode, render } from "vue";
import BbDatePicker from "./BbDatePicker.vue";

type DatePickerOptions = Record<string, any> | string | null;
type DatePickerCallback = (...args: any[]) => void;

interface BbDatePickerCancelError extends Error {
  type: "cancel";
  canceled: true;
}

interface BbDatePickerPromise<T = string> extends Promise<T> {
  close: () => void;
}

function pickCallback(options: Record<string, any>, name: string): DatePickerCallback | undefined {
  const callback = options[name];
  delete options[name];
  return typeof callback === "function" ? callback : undefined;
}

function resolveOptions(options: DatePickerOptions = {}): Record<string, any> {
  if (options === null || typeof options !== "object") {
    return { modelValue: options };
  }
  return { ...options };
}

function createCancelError(): BbDatePickerCancelError {
  const error = new Error("BbDatePicker canceled") as BbDatePickerCancelError;
  error.name = "BbDatePickerCancel";
  error.type = "cancel";
  error.canceled = true;
  return error;
}

export function showBbDatePicker<T = string>(options: DatePickerOptions = {}): BbDatePickerPromise<T> {
  if (typeof document === "undefined") {
    return Promise.reject(createCancelError()) as BbDatePickerPromise<T>;
  }

  const pickerProps = resolveOptions(options);
  const onConfirm = pickCallback(pickerProps, "onConfirm");
  const onCancel = pickCallback(pickerProps, "onCancel");
  const onClose = pickCallback(pickerProps, "onClose");
  const onVisible = pickCallback(pickerProps, "onVisible");
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
    const vnode = createVNode(BbDatePicker, {
      ...pickerProps,
      modelValue: currentValue,
      show,
      showField: false,
      clearable: false,
      "onUpdate:modelValue": (value: T) => {
        currentValue = value;
      },
      "onUpdate:show": (nextVisible: boolean) => {
        onUpdateShow?.(nextVisible);
        if (!nextVisible && !settled) {
          finish(undefined as T, false);
        }
      },
      onVisible: (nextVisible: boolean) => {
        onVisible?.(nextVisible);
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
  }) as BbDatePickerPromise<T>;

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

function install(app: App) {
  if (!app) return;
  app.component("BbDatePicker", BbDatePicker);

  if (app.config?.globalProperties) {
    app.config.globalProperties.$bbDatePicker = showBbDatePicker;
  }
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { BbDatePicker };

export default {
  install,
  show: showBbDatePicker,
};
