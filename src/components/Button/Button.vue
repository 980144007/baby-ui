<script setup lang="ts" name="BabyButton">
defineOptions({
  name: 'BabyButton',
});

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'default';
type ButtonSize = 'small' | 'normal' | 'large';

withDefaults(defineProps<{
  type?: ButtonType;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
}>(), {
  type: 'default',
  size: 'normal',
  block: false,
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<template>
  <button
    class="baby-button"
    :class="[`baby-button--${type}`, `baby-button--${size}`, { 'baby-button--block': block, 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="baby-button__loading" />
    <span class="baby-button__content"><slot /></span>
  </button>
</template>

<style lang="less">
.baby-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border: 1px solid var(--baby-border-color);
  border-radius: 6px;
  background: var(--baby-background-color);
  color: var(--baby-text-color);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.2s, border-color 0.2s, background 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &--primary,
  &--success,
  &--warning,
  &--danger {
    color: #fff;
    border-color: transparent;
  }

  &--primary {
    background: var(--baby-primary-color);
  }

  &--success {
    background: var(--baby-success-color);
  }

  &--warning {
    background: var(--baby-warning-color);
  }

  &--danger {
    background: var(--baby-danger-color);
  }

  &--small {
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
  }

  &--large {
    height: 44px;
    padding: 0 20px;
    font-size: 16px;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &__loading {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: baby-button-spin 0.8s linear infinite;
  }
}

@keyframes baby-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
