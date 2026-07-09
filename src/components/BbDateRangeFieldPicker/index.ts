import type { App } from "vue";
import BbDateRangeFieldPicker from "./BbDateRangeFieldPicker.vue";

function install(app: App) {
  if (!app) return;
  app.component("BbDateRangeFieldPicker", BbDateRangeFieldPicker);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { BbDateRangeFieldPicker };

export default {
  install,
};
