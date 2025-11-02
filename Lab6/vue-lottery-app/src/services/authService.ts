import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from './apiClient';

// Стан токену
const token = ref(localStorage.getItem('access_token') || null);
const isAuthenticated = computed(() => !!token.value);

// Встановлюємо токен в apiClient, якщо він є при завантаженні
if (token.value) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
}

export function useAuth() {
  const router = useRouter();

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('access_token', newToken);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const removeToken = () => {
    token.value = null;
    localStorage.removeItem('access_token');
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const login = async (email: string, password: string) => {
    // Наше припущення про структуру запиту
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    // Наше припущення про структуру відповіді
    if (response.data && response.data.access_token) {
      setToken(response.data.access_token);
      
      // Після успішного логіну перекидаємо на сторінку лотереї
      router.push({ name: 'Lottery' });
    } else {
      throw new Error('Invalid login response format');
    }
  };

  const logout = () => {
    removeToken();
    // Після логауту перекидаємо на сторінку логіну
    router.push({ name: 'Login' });
  };
  
  // Ця функція не потрібна, якщо ми перевіряємо токен при завантаженні файлу
  // const checkAuth = () => { ... };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}