<script setup lang="ts" name="BabyCell">
defineOptions({
  name: 'BabyCell',
});

withDefaults(defineProps<{
  title?: string;
  value?: string;
  label?: string;
  border?: boolean;
  clickable?: boolean;
}>(), {
  title: '',
  value: '',
  label: '',
  border: true,
  clickable: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<template>
  <div class="baby-cell" :class="{ 'baby-cell--border': border, 'baby-cell--clickable': clickable }" @click="handleClick">
    <div class="baby-cell__body">
      <div class="baby-cell__title">
        <slot name="title">{{ title }}</slot>
        <div v-if="label" class="baby-cell__label">{{ label }}</div>
      </div>
      <div class="baby-cell__value">
        <slot>{{ value }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.baby-cell {
  padding: 12px 16px;
  background: var(--baby-background-color);
  color: var(--baby-text-color);
  font-size: 14px;

  &--border {
    border-bottom: 1px solid var(--baby-border-color);
  }

  &--clickable {
    cursor: pointer;

    &:active {
      background: #f5f7fa;
    }
  }

  &__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 24px;
  }

  &__title {
    min-width: 0;
    font-weight: 500;
  }

  &__label {
    margin-top: 4px;
    color: #7b8494;
    font-size: 12px;
    font-weight: 400;
  }

  &__value {
    min-width: 0;
    color: #646b79;
    text-align: right;
  }
}
</style>
