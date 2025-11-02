<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from '@/services/authService';
import MyButton from '@/components/base/MyButton.vue';

const { login } = useAuth();
const errorMessage = ref('');

// Схема валідації (поки що припущення, чекаю на API)
const schema = yup.object({
  // АБО username, залежно від API
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required'),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

// Ця функція спрацює тільки якщо форма валідна
const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = '';
  try {
    // ВИКОРИСТОВУЄМО AUTH SERVICE
    // values.email, values.password
    await login(values.email, values.password); 
    // Guard в router/index.ts автоматично перекине нас
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials.';
    console.error(error);
  }
});
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-center mb-4">Login</h5>
          
          <form @submit="onSubmit" novalidate>
            
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <Field
                name="email"
                type="email"
                id="email"
                class="form-control"
                :class="{ 'is-invalid': !!errorMessage }"
              />
              <ErrorMessage name="email" class="invalid-feedback d-block" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <Field
                name="password"
                type="password"
                id="password"
                class="form-control"
                :class="{ 'is-invalid': !!errorMessage }"
              />
              <ErrorMessage name="password" class="invalid-feedback d-block" />
            </div>

            <div v-if="errorMessage" class="alert alert-danger py-2">
              {{ errorMessage }}
            </div>

            <div class="d-grid">
              <MyButton type="submit" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"></span>
                <span v-else>Login</span>
              </MyButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>