import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useAuth } from '@/services/authService'; // Наш сервіс автентифікації

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    // Приклад асинхронного компоненту (вимога з ТЗ)
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/lottery',
    name: 'Lottery',
    component: () => import('@/views/LotteryView.vue'),
    meta: { requiresAuth: true }, // Приклад захищеного роуту
  },
  {
    path: '/users/:id', // Динамічний роутинг
    name: 'UserDetail',
    component: () => import('@/views/UserDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresGuest: true }, // Не пускати, якщо вже залогінений
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard (вимога з ТЗ)
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Якщо роут вимагає логін, а юзер не в системі -> на логін
    next({ name: 'Login' });
  } else if (to.meta.requiresGuest && isAuthenticated.value) {
    // Якщо роут для гостей (логін), а юзер в системі -> на головну
    next({ name: 'Home' });
  } else {
    // В усіх інших випадках
    next();
  }
});

export default router;