<script setup lang="ts">
import { Form, Field, ErrorMessage, configure } from 'vee-validate';
import * as yup from 'yup';
import { userRepository } from '@/repositories/userRepository';
import type { CreateParticipantDto } from '@/interfaces/Participant';

import MyButton from '@/components/base/MyButton.vue';

const emit = defineEmits<{
  (e: 'add-participant', participant: CreateParticipantDto): void;
}>();

// Схема валідації Yup (відповідає API)
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email')
    // Асинхронна валідація на унікальність
    .test('is-available', 'This email is already registered', async (value) => {
      if (!value) return false;
      try {
        return await userRepository.checkEmailAvailability(value);
      } catch (error) {
        // Якщо API недоступне, краще пропустити валідацію, ніж блокувати форму
        console.error("Email validation failed:", error);
        return true; 
      }
    }),
  password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
  avatar: yup.string().required('Avatar URL is required').url('Must be a valid URL'),
});

// Налаштування VeeValidate
configure({
  bails: false, // Перевіряти всі правила, не зупинятись на першій помилці
  validateOnInput: true, // Валідувати при введенні
});

// Ця функція спрацює тільки якщо форма валідна
const saveParticipant = (values: object, { resetForm }: any) => {
  // 'values' вже мають правильний тип CreateParticipantDto
  // завдяки схемі yup
  emit('add-participant', values as CreateParticipantDto);
  resetForm(); // Очищуємо форму
};
</script>

<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title">REGISTER FORM</h5>
      <p class="card-subtitle mb-2 text-muted">Please fill in all the fields.</p>
      
      <Form 
        @submit="saveParticipant" 
        :validation-schema="schema" 
        v-slot="{ isSubmitting, errors }"
      >
        
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <Field
            name="name"
            type="text"
            id="name"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
            placeholder="Enter user name"
          />
          <ErrorMessage name="name" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            name="email"
            type="email"
            id="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            placeholder="Enter email"
          />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
            placeholder="Enter password"
          />
          <ErrorMessage name="password" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="avatar" class="form-label">Avatar URL</label>
          <Field
            name="avatar"
            type="text"
            id="avatar"
            class="form-control"
            :class="{ 'is-invalid': errors.avatar }"
            placeholder="https://i.imgur.com/..."
          />
          <ErrorMessage name="avatar" class="invalid-feedback" />
        </div>

        <div class="d-flex justify-content-end">
          <MyButton type="submit" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"></span>
            <span v-else>Save</span>
          </MyButton>
        </div>
      </Form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Робимо повідомлення про помилки видимими */
.invalid-feedback {
  display: block;
}
</style>