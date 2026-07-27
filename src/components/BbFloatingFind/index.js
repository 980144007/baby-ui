import BbFloatingFind from "./BbFloatingFind.vue";

function install(Vue) {
  if (!Vue) return;
  Vue.component("BbFloatingFind", BbFloatingFind);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};

export { BbFloatingFind };
