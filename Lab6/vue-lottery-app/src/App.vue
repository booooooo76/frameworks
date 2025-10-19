<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

// --- Типізація ---
interface Participant {
  id: number;
  name: string;
  dob: string;
  email: string;
  phone: string;
}

// --- Стан (State) ---
// Масив для зберігання всіх зареєстрованих учасників
const participants = ref<Participant[]>([]);
// Масив для зберігання переможців
const winners = ref<Participant[]>([]);

// Реактивний об'єкт для даних з форми
const newParticipant = reactive({
  name: '',
  dob: '',
  email: '',
  phone: '',
});

// Реактивний об'єкт для зберігання помилок валідації
const formErrors = reactive({
  name: '',
  dob: '',
  email: '',
  phone: '',
});

// --- Обчислювані властивості (Computed) ---
// Властивість для деактивації кнопки "New winner"
const isNewWinnerButtonDisabled = computed(() => {
  return winners.value.length >= 3 || participants.value.length === 0;
});


// --- Функції (Methods) ---

/**
 * Очищує об'єкт з даними форми та об'єкт помилок.
 */
const clearForm = () => {
  newParticipant.name = '';
  newParticipant.dob = '';
  newParticipant.email = '';
  newParticipant.phone = '';

  formErrors.name = '';
  formErrors.dob = '';
  formErrors.email = '';
  formErrors.phone = '';
};

/**
 * Валідує форму перед збереженням.
 * @returns {boolean} - true, якщо форма валідна, інакше false.
 */
const validateForm = (): boolean => {
  let isValid = true;
  // Очищення попередніх помилок
  formErrors.name = '';
  formErrors.dob = '';
  formErrors.email = '';
  formErrors.phone = '';

  // 1. Перевірка імені
  if (!newParticipant.name.trim()) {
    formErrors.name = 'Name is required.';
    isValid = false;
  }

  // 2. Перевірка дати народження
  if (!newParticipant.dob) {
    formErrors.dob = 'Date of Birth is required.';
    isValid = false;
  } else {
    const selectedDate = new Date(newParticipant.dob);
    const today = new Date();
    // Встановлюємо час на 00:00:00, щоб коректно порівнювати лише дати
    today.setHours(0, 0, 0, 0); 
    if (selectedDate > today) {
      formErrors.dob = 'Date of Birth cannot be in the future.';
      isValid = false;
    }
  }

  // 3. Перевірка Email за допомогою RegExp
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!newParticipant.email) {
    formErrors.email = 'Email is required.';
    isValid = false;
  } else if (!emailRegex.test(newParticipant.email)) {
    formErrors.email = 'Please enter a valid email address.';
    isValid = false;
  }
  
  // 4. Перевірка телефону за допомогою RegExp
  // Проста перевірка на наявність хоча б 10 цифр, можливо з плюсом на початку
  const phoneRegex = /^\+?(\d.*){10,}$/;
   if (!newParticipant.phone) {
    formErrors.phone = 'Phone number is required.';
    isValid = false;
  } else if (!phoneRegex.test(newParticipant.phone)) {
    formErrors.phone = 'Please enter a valid phone number (at least 10 digits).';
    isValid = false;
  }

  return isValid;
};


/**
 * Зберігає нового учасника, якщо валідація пройшла успішно.
 */
const saveParticipant = () => {
  if (validateForm()) {
    participants.value.push({
      id: Date.now(), // Унікальний ID на основі часу
      ...newParticipant,
    });
    clearForm();
  }
};


/**
 * Вибирає випадкового переможця зі списку учасників.
 */
const selectWinner = () => {
  if (isNewWinnerButtonDisabled.value) return;

  // Створюємо список кандидатів (учасники, які ще не є переможцями)
  const candidateIds = winners.value.map(w => w.id);
  const candidates = participants.value.filter(p => !candidateIds.includes(p.id));

  if (candidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const newWinner = candidates[randomIndex];
    winners.value.push(newWinner);
  }
};


/**
 * Видаляє переможця зі списку переможців.
 * @param {number} winnerId - ID переможця, якого потрібно видалити.
 */
const removeWinner = (winnerId: number) => {
  winners.value = winners.value.filter(winner => winner.id !== winnerId);
};

</script>

<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="input-group">
              <div class="form-control h-auto d-flex flex-wrap align-items-center gap-2">
                <span v-if="winners.length === 0" class="text-muted">Winners</span>
                <span
                  v-for="winner in winners"
                  :key="winner.id"
                  class="badge bg-success d-flex align-items-center"
                >
                  {{ winner.name }}
                  <button 
                    type="button" 
                    class="btn-close btn-close-white ms-2" 
                    aria-label="Remove"
                    style="font-size: 0.65rem;"
                    @click="removeWinner(winner.id)"
                  ></button>
                </span>
              </div>
              <button
                class="btn btn-primary"
                type="button"
                @click="selectWinner"
                :disabled="isNewWinnerButtonDisabled"
              >
                New winner
              </button>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5 class="card-title">REGISTER FORM</h5>
            <p class="card-subtitle mb-2 text-muted">Please fill in all the fields.</p>
            <form @submit.prevent="saveParticipant" novalidate>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  :class="{ 'is-invalid': formErrors.name }"
                  v-model.trim="newParticipant.name"
                  placeholder="Enter user name"
                >
                <div v-if="formErrors.name" class="invalid-feedback">{{ formErrors.name }}</div>
              </div>

              <div class="mb-3">
                <label for="dob" class="form-label">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  class="form-control"
                  :class="{ 'is-invalid': formErrors.dob }"
                  v-model="newParticipant.dob"
                >
                <div v-if="formErrors.dob" class="invalid-feedback">{{ formErrors.dob }}</div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  :class="{ 'is-invalid': formErrors.email }"
                  v-model.trim="newParticipant.email"
                  placeholder="Enter email"
                >
                <div v-if="formErrors.email" class="invalid-feedback">{{ formErrors.email }}</div>
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  class="form-control"
                  :class="{ 'is-invalid': formErrors.phone }"
                  v-model.trim="newParticipant.phone"
                  placeholder="Enter phone number"
                >
                <div v-if="formErrors.phone" class="invalid-feedback">{{ formErrors.phone }}</div>
              </div>

              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>

        <div class="card shadow-sm">
           <div class="card-body">
            <table class="table table-striped table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone number</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="participants.length === 0">
                  <td colspan="5" class="text-center text-muted">No participants yet.</td>
                </tr>
                <tr v-for="(participant, index) in participants" :key="participant.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ participant.name }}</td>
                  <td>{{ participant.dob }}</td>
                  <td>{{ participant.email }}</td>
                  <td>{{ participant.phone }}</td>
                </tr>
              </tbody>
            </table>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
/* Глобальний стиль для всього застосунку */
body {
  background-color: #f8f9fa; /* Світло-сірий фон */
}

/* Стилі для карток, щоб вони мали однаковий вигляд */
.card {
  border: none; /* Прибираємо стандартні рамки */
}

/* Стиль для невалідного поля вводу */
.form-control.is-invalid {
    border-color: #dc3545; /* Червона рамка для помилки */
}
.invalid-feedback {
    display: block; /* Завжди показуємо блок з помилкою, v-if контролює його вміст */
}

/* Додаткові відступи для кращого вигляду */
.my-5 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}
</style>