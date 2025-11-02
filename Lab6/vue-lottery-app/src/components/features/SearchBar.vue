<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'filter-by-name', query: string): void;
}>();

const searchTerm = ref('');

const handleInput = () => {
  emit('filter-by-name', searchTerm.value);
};
</script>

<template>
  <div class="mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Search by name..."
      v-model.trim="searchTerm"
      @input="handleInput"
    />
  </div>
</template>