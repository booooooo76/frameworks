<script setup lang="ts">
import AppNavigation from './AppNavigation.vue';
</script>

<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">
        Vue Lottery
      </RouterLink>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <AppNavigation />
      </div>
    </div>
  </header>
</template>