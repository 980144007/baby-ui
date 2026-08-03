import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import SunshineBabyUI from '../../src';
import PreviewApp from './PreviewApp.vue';

createApp(PreviewApp).use(Vant).use(SunshineBabyUI).mount('#app');
