import type { App, Plugin } from 'vue';
import dayjs from 'dayjs';
import { showToast } from 'vant';
import 'vant/lib/index.css';
import './styles/index.less';
import { getFileType } from './utils/file';

export { default as Bb3DCube } from './components/Bb3DCube/Bb3DCube.vue';
export { default as BbCascaderPicker } from './components/BbCascaderPicker/BbCascaderPicker.vue';
export { default as BbDatePicker } from './components/BbDatePicker/BbDatePicker.vue';
export { BbDateRangeFieldPicker, showBbDateRangePicker, showBbDateRangeFieldPicker } from './components/BbDateRangeFieldPicker';
export { BbDialog, showBbDialog } from './components/BbDialog';
export { default as BbFloatingButton } from './components/BbFloatingButton/BbFloatingButton.vue';
export { BbImagesPicker, showBbImagesPicker } from './components/BbImagesPicker';
export { default as BbList } from './components/BbList/BbList.vue';
export { default as BbLoading } from './components/BbLoading';
export { default as BbLoadingIcon } from './components/BbLoadingIcon/BbLoadingIcon.vue';
export { default as BbMultiplePicker } from './components/BbMultiplePicker/BbMultiplePicker.vue';
export { default as BbPagePicker } from './components/BbPagePicker/BbPagePicker.vue';
export { BbPicker, showBbPicker } from './components/BbPicker';
export { default as BbRotate } from './components/BbRotate/BbRotate.vue';
export { default as BbTabbar } from './components/BbTabbar/BbTabbar.vue';
export { default as BbTable } from './components/BbTable/BbTable.vue';
export { default as BbTabs } from './components/BbTabs/BbTabs.vue';

import Bb3DCube from './components/Bb3DCube';
import BbCascaderPicker from './components/BbCascaderPicker';
import BbDatePicker from './components/BbDatePicker';
import BbDateRangeFieldPicker from './components/BbDateRangeFieldPicker';
import BbDialog from './components/BbDialog';
import BbFloatingButton from './components/BbFloatingButton';
import BbImagesPicker from './components/BbImagesPicker';
import BbList from './components/BbList';
import BbLoading from './components/BbLoading';
import BbLoadingIcon from './components/BbLoadingIcon';
import BbMultiplePicker from './components/BbMultiplePicker';
import BbPagePicker from './components/BbPagePicker';
import BbPicker from './components/BbPicker';
import BbRotate from './components/BbRotate';
import BbTabbar from './components/BbTabbar';
import BbTable from './components/BbTable';
import BbTabs from './components/BbTabs';

const components = [
  Bb3DCube,
  BbCascaderPicker,
  BbDatePicker,
  BbDateRangeFieldPicker,
  BbDialog,
  BbFloatingButton,
  BbImagesPicker,
  BbList,
  BbLoading,
  BbLoadingIcon,
  BbMultiplePicker,
  BbPagePicker,
  BbPicker,
  BbRotate,
  BbTabbar,
  BbTable,
  BbTabs,
];

const SunshineBabyUI: Plugin = {
  install(app: App) {
    app.provide('$dayjs', dayjs);
    components.forEach((component) => {
      app.use(component as Plugin);
    });

    if (typeof window !== 'undefined') {
      window.$toast = showToast;
      window.$getFileType = window.$getFileType || getFileType;
    }
  },
};

export default SunshineBabyUI;
