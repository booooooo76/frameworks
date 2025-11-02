import axios from 'axios';
import { useAuth } from './authService';

const apiClient = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1', //
});

// Interceptor: Додаємо токен до кожного запиту
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuth();
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Тут також можна додати interceptor для обробки 401 (Unauthorized)
// і автоматичного оновлення токену (refresh-token), але для ЛР це може бути надмірно.

export default apiClient;