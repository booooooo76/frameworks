<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
</script>

<template>
  <AppHeader />

  <main class="container my-5">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style>
/* Стилі для анімації переходу між сторінками */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>