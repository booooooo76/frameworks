<script setup lang="ts">
interface Props {
  modelValue: string;
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  error: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="mb-3">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      class="form-control"
      :class="{ 'is-invalid': error }"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
    />
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<style lang="scss" scoped>
.invalid-feedback {
  display: block; /* Завжди показуємо блок, щоб не було "стрибків" */
}
</style>