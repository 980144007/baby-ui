import type { App } from 'vue';
import BbDateRangePicker from './BbDateRangePicker.vue';

function install(app: App) {
  app.component('BbDateRangePicker', BbDateRangePicker);
}

export { BbDateRangePicker };

export default { install };
