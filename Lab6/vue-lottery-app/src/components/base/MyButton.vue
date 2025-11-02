<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'light';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
});
</script>

<template>
  <button
    :type="props.type"
    class="btn"
    :class="`btn-${props.variant}`"
    :disabled="props.disabled"
  >
    <slot></slot> </button>
</template>

<style lang="scss" scoped>
/* Можна додати кастомні стилі для кнопки, якщо потрібно */
</style>