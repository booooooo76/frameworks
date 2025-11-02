<script setup lang="ts">
interface Props {
  show: boolean;
}
defineProps<Props>();
const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="modal-mask"
      tabindex="-1"
      @keydown.esc="emit('close')"
    >
      <div class="modal-dialog" @click.self="emit('close')">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="header">Default Header</slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="emit('close')"
            ></button>
          </div>
          <div class="modal-body">
            <slot>Default Body</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-secondary" @click="emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
/* Стилі для анімації та фону модального вікна */
.modal-mask {
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  overflow-y: auto;
}

.modal-dialog {
  margin: 1.75rem auto; /* Використовуємо flex + margin auto для центрування */
}

/* Анімації для Transition */
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-dialog,
.modal-leave-active .modal-dialog {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
  transform: translateY(-50px);
}
</style>