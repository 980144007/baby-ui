<script setup lang="ts" name="BbDatePicker">
import dayjs from "dayjs";
const $dayjs = inject<typeof dayjs>("$dayjs", dayjs);
const innerShowPicker = ref(false);

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  rules: {
    type: Array,
    default: () => new Array()
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ""
  },
  required: {
    type: Boolean,
    default: false
  },
  iconColor: {
    type: String,
    default: ""
  },
  show: {
    type: Boolean,
    default: undefined
  },
  showField: {
    type: Boolean,
    default: true
  },
})
const emits = defineEmits(["onVisible", "update:modelValue", "update:show", "confirm", "closed"]);
const isShowControlled = computed(() => typeof props.show === "boolean");
const showPicker = computed({
  get() {
    return isShowControlled.value ? props.show : innerShowPicker.value;
  },
  set(value) {
    if (!isShowControlled.value) {
      innerShowPicker.value = value;
    }
    emits("update:show", value);
    if (!value) {
      emits("closed");
    }
  },
});
watch(showPicker, (n) => {
  emits("onVisible", n);
})
const onConfirm = ({ selectedValues }) => {
  const val = selectedValues.join("-");
  emits("update:modelValue", val);
  emits("confirm", val);
  showPicker.value = false;
}


function clear() {
  emits("update:modelValue");
  emits("confirm");
}

const onShowChange = () => {
  if (props.readonly || props.disabled) return;
  showPicker.value = !showPicker.value;
}

const formatter = (type, option) => {
  if (type === 'year') {
    option.text += '年';
  }
  if (type === 'month') {
    option.text += '月';
  }
  if (type === 'day') {
    option.text += '日';
  }
  return option;
};
</script>

<template>
  <div class="bb-date-picker-container" ref="bb-picker" v-if="showField">
  <van-field :modelValue="modelValue" :name="name" :label="label" :required="required" readonly
    :is-link="!props.disabled && !props.readonly" :disabled="props.disabled" @click.stop="onShowChange"
    :placeholder="props.disabled || props.readonly ? '' : placeholder || `请选择${label}`"
    :rules="rules[0] ? rules : [{ required, message: `请选择${label}` }]">
    <template #left-icon v-if="$slots['left-icon']">
      <slot name="left-icon"></slot>
    </template>
    <template #button v-if="clearable && (!!modelValue || modelValue === 0) && !props.disabled && !props.readonly">
      <van-icon :color="iconColor" name="clear" @click.stop="clear" />
    </template>
  </van-field>
  </div>
  <van-popup v-model:show="showPicker" round position="bottom" teleport="body" close-on-click-overlay @closed="emits('closed')">
    <van-date-picker :modelValue="(modelValue || $dayjs().format('YYYY-MM-DD')).split('-')" @confirm="onConfirm"
      @cancel="showPicker = false" :formatter="formatter" />
  </van-popup>


</template>

<style lang="less" scoped>
.bb-picker-container {
  width: 100%;
  box-sizing: border-box;
  @flex-row-center();
  color: @theme-color;

  .input-box {
    @full();
  }

  .value-box {
    width: 100%;
    @flex-row-center();
    color: @theme-color;

    &.disabled {
      .arrow {
        // display: none;
      }
    }

    .value {
      background: none;
      @flex-row-grow();
      padding: @padding-base;
      font-size: @font-size-lg;
      line-height: @font-size-lg;
      height: @font-size-lg;
      border: none;

      &.border {
        border-bottom: 1px solid @border-color;
      }

      .ellipsis();

      &::placeholder {
        opacity: 0.4;
      }

    }

    .arrow {
      @flex-row-center();
    }
  }
}
</style>
