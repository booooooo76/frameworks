<script setup lang="ts">
import { useAuth } from '@/services/authService';
import { useRouter } from 'vue-router';

const { isAuthenticated, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  // Після логауту, NavigationGuard в router/index.ts 
  // сам перекине нас на /login, але для надійності
  // можна додати явний push.
  router.push({ name: 'Login' }); 
};
</script>

<template>
  <nav class="navbar-nav ms-auto d-flex flex-lg-row align-items-center gap-2">
    
    <RouterLink to="/" class="nav-link" active-class="active">Home</RouterLink>
    <RouterLink to="/about" class="nav-link" active-class="active">About</RouterLink>
    
    <RouterLink v-if="isAuthenticated" to="/lottery" class="nav-link" active-class="active">
      Lottery
    </RouterLink>

    <RouterLink 
      v-if="!isAuthenticated" 
      to="/login" 
      class="btn btn-outline-light btn-sm" 
      role="button"
    >
      Login
    </RouterLink>
    
    <button v-if="isAuthenticated" @click="handleLogout" class="btn btn-outline-secondary btn-sm">
      Logout
    </button>
  </nav>
</template>

<style lang="scss" scoped>
/* Додаємо стилі, щоб активне посилання було жирним */
.nav-link.active {
  font-weight: bold;
  color: #fff !important;
}

/* Кнопка "Login" не має бути підкреслена */
.btn.router-link-active {
  text-decoration: none;
}
</style>