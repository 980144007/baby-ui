<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import {
  Bb3DCube,
  BbCascaderPicker,
  BbDatePicker,
  BbDateRangeFieldPicker,
  BbDialog,
  BbFloatingButton,
  BbImagesPicker,
  BbList,
  BbLoading as BbLoadingPlugin,
  BbLoadingIcon,
  BbMultiplePicker,
  BbPagePicker,
  BbPicker,
  BbRotate,
  BbTabbar,
  BbTable,
  BbTabs,
  showBbDateRangePicker,
  showBbDialog,
  showBbPicker,
} from '../../src';

type DateRangeValue = {
  startDate: string;
  endDate: string;
};

type LoadingApi = {
  open: () => void;
  close: () => void;
};

const textValue = ref('Baby UI');
const pickerValue = ref('shanghai');
const pickerShow = ref(false);
const multiPickerValue = ref(['sleep']);
const pagePickerValue = ref(['page-a']);
const cascaderValue = ref('pudong');
const dateValue = ref('2026-07-10');
const dateRangeValue = ref<DateRangeValue>({
  startDate: '2026-07-01',
  endDate: '2026-07-10',
});
const dialogVisible = ref(false);
const dialogAction = ref('尚未操作');
const imageList = ref<string[]>([]);
const tabActive = ref('profile');
const tabbarActive = ref('home');
const floatingCount = ref(0);
const loadingText = ref('点击按钮体验遮罩加载');
const loadingApi = inject<LoadingApi>('$loading');
const hasLoadingPlugin = computed(() => Boolean(BbLoadingPlugin));

const pickerOptions = [
  { label: '上海', value: 'shanghai' },
  { label: '杭州', value: 'hangzhou' },
  { label: '苏州', value: 'suzhou' },
];

const multipleOptions = [
  { text: '睡眠', value: 'sleep' },
  { text: '喂养', value: 'feed' },
  { text: '成长', value: 'growth' },
];

const pageOptions = [
  { text: '第一页选项 A', value: 'page-a' },
  { text: '第一页选项 B', value: 'page-b' },
  { text: '第一页选项 C', value: 'page-c' },
];

const cascaderOptions = [
  {
    text: '上海',
    label: '上海',
    value: 'shanghai',
    children: [
      { text: '浦东新区', label: '浦东新区', value: 'pudong' },
      { text: '徐汇区', label: '徐汇区', value: 'xuhui' },
    ],
  },
  {
    text: '浙江',
    label: '浙江',
    value: 'zhejiang',
    children: [
      { text: '杭州', label: '杭州', value: 'hangzhou' },
      { text: '宁波', label: '宁波', value: 'ningbo' },
    ],
  },
];

const listItems = ref(['出生信息', '喂养记录', '睡眠记录', '成长曲线']);
const listFinished = ref(true);
const onListRefresh = () => {
  listItems.value = ['刷新后的出生信息', '刷新后的喂养记录', '刷新后的睡眠记录'];
  listFinished.value = true;
  return Promise.resolve(true);
};
const onListLoadMore = () => Promise.resolve(true);

const tableColumns = [
  { title: '项目', prop: 'name' },
  { title: '今日', prop: 'today', needSummary: true },
  { title: '本周', prop: 'week', needSummary: true },
];
const tableData = [
  { name: '喂奶次数', today: 6, week: 36 },
  { name: '睡眠小时', today: 12, week: 82 },
];

const tabItems = [
  { name: 'profile', title: '资料', text: '宝宝昵称、生日和基础信息。' },
  { name: 'records', title: '记录', text: '记录喂养、睡眠、体温等日常数据。' },
  { name: 'growth', title: '成长', text: '查看身高、体重和成长趋势。' },
];

const tabbarItems = [
  { name: 'home', title: '首页', icon: 'home-o', text: '首页内容区域' },
  { name: 'chart', title: '统计', icon: 'chart-trending-o', text: '统计内容区域' },
  { name: 'setting', title: '设置', icon: 'setting-o', text: '设置内容区域' },
];

const minDate = new Date(2025, 0, 1);
const maxDate = new Date(2026, 11, 31);

function openLoading() {
  loadingApi?.open();
  loadingText.value = '加载中，1 秒后自动关闭';
  window.setTimeout(() => {
    loadingApi?.close();
    loadingText.value = '遮罩加载已关闭';
  }, 1000);
}

function openFunctionDateRangePicker() {
  showBbDateRangePicker({
    modelValue: dateRangeValue.value,
    minDate,
    maxDate,
  })
    .then((value: DateRangeValue) => {
      dateRangeValue.value = value;
    })
    .catch(() => undefined);
}

function openFunctionDialog() {
  showBbDialog({
    type: 'success',
    title: '函数式弹窗',
    message: 'showBbDialog 已成功打开。',
    showCancel: true,
  })
    .then(() => {
      dialogAction.value = '函数式弹窗：确认';
    })
    .catch(() => {
      dialogAction.value = '函数式弹窗：取消';
    });
}

function openFunctionPicker() {
  showBbPicker({
    title: '函数式选择器',
    modelValue: pickerValue.value,
    options: pickerOptions,
    labelKey: 'label',
    valueKey: 'value',
  })
    .then((option: any) => {
      pickerValue.value = option?.value || pickerValue.value;
    })
    .catch(() => undefined);
}
</script>

<template>
  <main class="demo-page">
    <header class="hero-card">
      <p class="eyebrow">SunshineBaby UI</p>
      <h1>Playground 全组件示例</h1>
      <p>覆盖 src/index.ts 导出的 17 个组件，所有示例均使用 <code>../../src</code> 导入。</p>
    </header>

    <section class="demo-section">
      <h2>1. Bb3DCube</h2>
      <p class="hint">拖动或移动鼠标查看立方体旋转。</p>
      <van-field v-model="textValue" label="文字" placeholder="请输入立方体文字" />
      <div class="cube-stage">
        <Bb3DCube :text="textValue" size="120px" font-size="18px" text-color="linear-gradient(90deg, #fff, #ffd3c2)" />
      </div>
    </section>

    <section class="demo-section">
      <h2>2. BbPicker</h2>
      <BbPicker v-model="pickerValue" title="城市选择" label="城市" :options="pickerOptions" label-key="label" value-key="value" placeholder="请选择城市" />
      <div class="action-row">
        <van-button size="small" type="primary" @click="pickerShow = true">受控打开</van-button>
        <van-button size="small" plain type="primary" @click="openFunctionPicker">函数式 API</van-button>
      </div>
      <BbPicker v-model="pickerValue" v-model:show="pickerShow" title="受控城市选择" :show-field="false" :options="pickerOptions" label-key="label" value-key="value" />
    </section>

    <section class="demo-section">
      <h2>3. BbMultiplePicker</h2>
      <BbMultiplePicker v-model="multiPickerValue" title="多选标签" :options="multipleOptions" multiple clearable placeholder="请选择标签" />
      <p class="result-text">当前值：{{ multiPickerValue.join('、') }}</p>
    </section>

    <section class="demo-section">
      <h2>4. BbPagePicker</h2>
      <BbPagePicker v-model="pagePickerValue" title="分页选择" :options="pageOptions" multiple clearable :on-refresh="onListRefresh" :on-load-more="onListLoadMore" placeholder="请选择分页项">
        <template #filter>
          <div class="filter-tip">示例使用本地数据，不请求外部接口。</div>
        </template>
      </BbPagePicker>
      <p class="result-text">当前值：{{ pagePickerValue.join('、') }}</p>
    </section>

    <section class="demo-section">
      <h2>5. BbCascaderPicker</h2>
      <BbCascaderPicker v-model="cascaderValue" type="input" label="地区" :options="cascaderOptions" placeholder="请选择地区" />
    </section>

    <section class="demo-section">
      <h2>6. BbDatePicker</h2>
      <BbDatePicker v-model="dateValue" label="日期" placeholder="请选择日期" />
    </section>

    <section class="demo-section">
      <h2>7. BbDateRangeFieldPicker</h2>
      <div class="result-card">
        {{ dateRangeValue.startDate || '不限' }} 至 {{ dateRangeValue.endDate || '不限' }}
      </div>
      <BbDateRangeFieldPicker v-model="dateRangeValue" mode="2" :min-date="minDate" :max-date="maxDate" />
      <div class="action-row">
        <van-button size="small" type="primary" @click="openFunctionDateRangePicker">函数式 API</van-button>
      </div>
    </section>

    <section class="demo-section">
      <h2>8. BbDialog</h2>
      <div class="action-row">
        <van-button size="small" type="primary" @click="dialogVisible = true">组件弹窗</van-button>
        <van-button size="small" plain type="primary" @click="openFunctionDialog">函数式弹窗</van-button>
      </div>
      <p class="result-text">{{ dialogAction }}</p>
      <BbDialog v-model:show="dialogVisible" type="warning" title="组件弹窗" message="这是 BbDialog 的受控示例。" show-cancel @confirm="dialogAction = '组件弹窗：确认'" @cancel="dialogAction = '组件弹窗：取消'" />
    </section>

    <section class="demo-section">
      <h2>9. BbImagesPicker</h2>
      <p class="hint">关闭真实上传，仅本地选择和预览。</p>
      <BbImagesPicker v-model="imageList" :upload="false" multiple :col-num="3">
        <template #description="{ index }">
          <div class="image-desc">图片 {{ index + 1 }}</div>
        </template>
      </BbImagesPicker>
    </section>

    <section class="demo-section fixed-height-section">
      <h2>10. BbList</h2>
      <BbList :auto-load="false" :finished="listFinished" :on-refresh="onListRefresh" :on-load-more="onListLoadMore" :use-back-top="false">
        <van-cell v-for="item in listItems" :key="item" :title="item" />
      </BbList>
    </section>

    <section class="demo-section">
      <h2>12. BbLoading</h2>
      <div class="action-row">
        <BbLoading size="24px" type="spinner" />
        <van-button size="small" type="primary" :disabled="!hasLoadingPlugin" @click="openLoading">打开遮罩加载</van-button>
      </div>
      <p class="result-text">{{ loadingText }}</p>
    </section>

    <section class="demo-section">
      <h2>13. BbLoadingIcon</h2>
      <BbLoadingIcon size="26px" text="Loading" />
    </section>

    <section class="demo-section rotate-card">
      <h2>14. BbRotate</h2>
      <p class="hint">固定在当前视口右下角的圆形浮动按钮。</p>
      <BbRotate text="回顶" right="18px" bottom="92px" size="46px" z-index="20" />
    </section>

    <section class="demo-section floating-card">
      <h2>14. BbFloatingButton</h2>
      <BbFloatingButton>
        <van-button class="floating-button inline-floating" size="small" type="primary" @click="floatingCount++">浮动 {{ floatingCount }}</van-button>
      </BbFloatingButton>
    </section>

    <section class="demo-section tabs-section">
      <h2>16. BbTabs</h2>
      <BbTabs v-model="tabActive" :van-props="{ sticky: false }">
        <template v-for="item in tabItems" :key="item.name">
          <section :name="item.name" :title="item.title" class="panel-card">
            {{ item.text }}
          </section>
        </template>
      </BbTabs>
    </section>

    <section class="demo-section tabbar-section">
      <h2>17. BbTabbar</h2>
      <BbTabbar v-model="tabbarActive" nav-position="bottom">
        <template v-for="item in tabbarItems" :key="item.name">
          <section :name="item.name" :title="item.title" :icon="item.icon" class="panel-card">
            {{ item.text }}
          </section>
        </template>
      </BbTabbar>
    </section>

    <section class="demo-section">
      <h2>17. BbTable</h2>
      <div class="table-scroll">
        <BbTable :columns="tableColumns" :data-list="tableData" size="small" :auto-summary="1" />
      </div>
    </section>
  </main>
</template>

<style lang="less">
body {
  margin: 0;
  background: #f5f7fa;
  color: #1f2933;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button,
input {
  font: inherit;
}

.demo-page {
  width: min(100%, 760px);
  min-height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 16px 12px 88px;
}

.hero-card,
.demo-section {
  box-sizing: border-box;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.hero-card {
  padding: 24px 18px;
  background: linear-gradient(135deg, #fff7f2, #eef7ff);

  .eyebrow {
    margin: 0 0 8px;
    color: #e96736;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  h1 {
    margin: 0 0 10px;
    font-size: 26px;
    line-height: 1.25;
  }

  p {
    margin: 0;
    color: #667085;
    font-size: 14px;
    line-height: 1.7;
  }
}

.demo-section {
  margin-top: 14px;
  padding: 18px 14px;
  overflow: hidden;

  h2 {
    margin: 0 0 14px;
    font-size: 17px;
    line-height: 1.4;
  }
}

.hint,
.result-text {
  margin: 8px 0 12px;
  color: #667085;
  font-size: 13px;
  line-height: 1.6;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.cube-stage {
  display: flex;
  justify-content: center;
  min-height: 220px;
  border-radius: 14px;
  background: #111827;
}

.filter-tip {
  padding: 8px 14px;
  color: #98a2b3;
  font-size: 13px;
}

.result-card,
.panel-card {
  box-sizing: border-box;
  border-radius: 12px;
  background: #f7f8fa;
  padding: 14px;
  color: #475467;
  font-size: 14px;
  line-height: 1.6;
}

.result-card {
  margin-bottom: 12px;
}

.image-desc {
  margin-top: 4px;
  text-align: center;
  color: #98a2b3;
  font-size: 12px;
}

.fixed-height-section {
  height: 300px;
  display: flex;
  flex-direction: column;
}

.rotate-card {
  min-height: 96px;
}

.floating-card {
  position: relative;
  min-height: 112px;

  .bb-floating-button-container {
    position: absolute;
    right: 16px;
    bottom: 16px;
  }
}

.inline-floating {
  border-radius: 999px;
}

.tabs-section {
  min-height: 230px;

  .bb-tabs-container {
    height: 170px;
  }
}

.tabbar-section {
  min-height: 260px;

  .bb-tabbar-container {
    height: 200px;
    border: 1px solid #eef0f4;
    border-radius: 14px;
    overflow: hidden;
  }
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

code {
  color: #e96736;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
</style>
