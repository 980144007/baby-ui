import type { App, Plugin } from 'vue';
import './styles/index.less';

export { BabyButton } from './components/Button';
export { BabyCell } from './components/Cell';

import { BabyButton } from './components/Button';
import { BabyCell } from './components/Cell';

const components = [BabyButton, BabyCell];

const BabyUI: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};

export default BabyUI;
