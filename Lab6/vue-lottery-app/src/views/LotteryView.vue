<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { 
  Participant, 
  CreateParticipantDto, 
  UpdateParticipantDto 
} from '@/interfaces/Participant';
import { userRepository } from '@/repositories/userRepository';

// Імпортуємо всі наші компоненти
import WinnersBlock from '@/components/features/WinnersBlock.vue';
import RegistrationForm from '@/components/features/RegistrationForm.vue';
import ParticipantsTable from '@/components/features/ParticipantsTable.vue';
import Modal from '@/components/base/Modal.vue';
import MyButton from '@/components/base/MyButton.vue';

import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate';
import * as yup from 'yup'; // <-- Ось виправлення

// --- Головний стан ---
const participants = ref<Participant[]>([]);
const winners = ref<Participant[]>([]);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null); // Для показу помилок API

// --- Отримання даних при завантаженні (Lifecycle Hook) ---
onMounted(async () => {
  isLoading.value = true;
  errorMessage.value = null;
  try {
    participants.value = await userRepository.getAll();
  } catch (error) {
    console.error('Failed to fetch participants:', error);
    errorMessage.value = 'Failed to load participants. Please try again later.';
  } finally {
    isLoading.value = false;
  }
});

// --- Обробники подій ---
// existingEmails.value нам більше не потрібен,
// оскільки VeeValidate займається перевіркою в формі реєстрації

const handleAddParticipant = async (newP: CreateParticipantDto) => {
  errorMessage.value = null;
  try {
    const createdParticipant = await userRepository.create(newP);
    participants.value.push(createdParticipant);
  } catch (error) {
    console.error('Failed to add participant:', error);
    errorMessage.value = 'Failed to add participant. This email might already be taken.';
  }
};

// --- Логіка модального вікна "Видалення" ---
const showDeleteModal = ref(false);
const participantToDelete = ref<Participant | null>(null);

const openDeleteModal = (participant: Participant) => {
  participantToDelete.value = participant;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (participantToDelete.value) {
    errorMessage.value = null;
    try {
      // API повертає boolean
      const success = await userRepository.delete(participantToDelete.value.id);
      
      if (success) {
        participants.value = participants.value.filter(
          (p) => p.id !== participantToDelete.value!.id
        );
        winners.value = winners.value.filter(
          (w) => w.id !== participantToDelete.value!.id
        );
      } else {
        throw new Error('API returned false on delete');
      }
    } catch (error) {
      console.error('Failed to delete participant:', error);
      errorMessage.value = 'Failed to delete participant.';
    }
  }
  closeModals();
};

// --- Логіка модального вікна "Редагування" ---
const showEditModal = ref(false);
const participantToEdit = ref<Participant | null>(null);
const submitEditForm = ref<HTMLButtonElement | null>(null); // Ref для кнопки submit

// Схема валідації для редагування
const editSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email'),
    // Перевірку на унікальність email при редагуванні складніше реалізувати,
    // оскільки треба ігнорувати власний email.
    // Для ЛР цього може бути достатньо.
  avatar: yup.string().required('Avatar URL is required').url('Must be a valid URL'),
  role: yup.string().required().oneOf(['admin', 'customer']),
});

const openEditModal = (participant: Participant) => {
  // Глибока копія для форми
  participantToEdit.value = JSON.parse(JSON.stringify(participant));
  showEditModal.value = true;
};

// 'values' - це дані з форми VeeValidate
const confirmUpdate = async (values: any) => {
  if (participantToEdit.value && participantToEdit.value.id) {
    errorMessage.value = null;
    try {
      const updatedParticipant = await userRepository.update(
        participantToEdit.value.id,
        values as UpdateParticipantDto
      );

      const index = participants.value.findIndex(
        (p) => p.id === updatedParticipant.id
      );
      if (index !== -1) {
        participants.value[index] = updatedParticipant;
        
        const winnerIndex = winners.value.findIndex(w => w.id === updatedParticipant.id);
        if(winnerIndex !== -1) {
          winners.value[winnerIndex] = updatedParticipant;
        }
      }
      closeModals();
    } catch (error) {
      console.error('Failed to update participant:', error);
      errorMessage.value = 'Failed to update participant. Email might be taken.';
    }
  }
};

// --- Спільні функції модальних вікон ---
const closeModals = () => {
  showDeleteModal.value = false;
  participantToDelete.value = null;

  showEditModal.value = false;
  participantToEdit.value = null;
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      
      <WinnersBlock
        :participants="participants"
        v-model:winners="winners"
      />

      <RegistrationForm
        @add-participant="handleAddParticipant"
      />

      <div v-if="errorMessage" class="alert alert-danger">
  {{ errorMessage }}
</div>

      <div v-if="isLoading" class="text-center my-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading participants...</p>
      </div>
      
      <ParticipantsTable
        v-else
        :participants="participants"
        @edit="openEditModal"
        @delete="openDeleteModal"
      />

    </div>
  </div>

  <Modal :show="showEditModal" @close="closeModals" @keydown.esc.prevent="closeModals">
    <template #header>Edit Participant</template>
    
    <template #default>
      <VeeForm
        v-if="participantToEdit"
        :validation-schema="editSchema"
        :initial-values="participantToEdit"
        @submit="confirmUpdate"
      >
        <div class="mb-3">
          <label for="edit-name" class="form-label">Name</label>
          <VeeField name="name" type="text" id="edit-name" class="form-control" />
          <VeeErrorMessage name="name" class="invalid-feedback d-block" />
        </div>

        <div class="mb-3">
          <label for="edit-email" class="form-label">Email</label>
          <VeeField name="email" type="email" id="edit-email" class="form-control" />
          <VeeErrorMessage name="email" class="invalid-feedback d-block" />
        </div>

        <div class="mb-3">
          <label for="edit-avatar" class="form-label">Avatar URL</label>
          <VeeField name="avatar" type="text" id="edit-avatar" class="form-control" />
          <VeeErrorMessage name="avatar" class="invalid-feedback d-block" />
        </div>
        
        <div class="mb-3">
          <label for="edit-role" class="form-label">Role</label>
          <VeeField name="role" as="select" id="edit-role" class="form-select">
            <option value="customer">customer</option>
            <option value="admin">admin</option>
          </VeeField>
          <VeeErrorMessage name="role" class="invalid-feedback d-block" />
        </div>
        
        <button type="submit" ref="submitEditForm" style="display: none;"></button>
        
      </VeeForm>
    </template>
    
    <template #footer>
      <MyButton variant="secondary" @click="closeModals">Cancel</MyButton>
      <MyButton variant="primary" @click="submitEditForm?.click()">
        Update Data
      </MyButton>
    </template>
  </Modal>

  <Modal :show="showDeleteModal" @close="closeModals" @keydown.esc.prevent="closeModals">
    <template #header>Confirm Deletion</template>
    
    <template #default>
      <p v-if="participantToDelete">
        Ви дійсно бажаєте видалити учасника
        "<b>{{ participantToDelete.name }}</b>",
        "<b>{{ participantToDelete.email }}</b>"?
      </p>
    </template>
    
    <template #footer>
      <MyButton variant="secondary" @click="closeModals">Ні</MyButton>
      <MyButton variant="danger" @click="confirmDelete">Так</MyButton>
    </template>
  </Modal>
</template>