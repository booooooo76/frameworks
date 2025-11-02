<script setup lang="ts">
import { computed } from 'vue';
import type { Participant } from '@/interfaces/Participant';
import MyButton from '@/components/base/MyButton.vue';

const props = defineProps<{
  participants: Participant[];
  winners: Participant[];
}>();

const emit = defineEmits<{
  (e: 'update:winners', value: Participant[]): void;
}>();

const isNewWinnerButtonDisabled = computed(() => {
  return props.winners.length >= 3 || props.participants.length === 0;
});

const selectWinner = () => {
  if (isNewWinnerButtonDisabled.value) return;

  const candidateIds = props.winners.map((w) => w.id);
  const candidates = props.participants.filter(
    (p) => !candidateIds.includes(p.id)
  );

  if (candidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const newWinner = candidates[randomIndex];
    // Випускаємо подію з новим масивом
    emit('update:winners', [...props.winners, newWinner]);
  }
};

const removeWinner = (winnerId: number) => {
  // Випускаємо подію з новим відфільтрованим масивом
  emit(
    'update:winners',
    props.winners.filter((winner) => winner.id !== winnerId)
  );
};
</script>

<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Winners</h5>
      <div class="input-group">
        <div
          class="form-control h-auto d-flex flex-wrap align-items-center gap-2"
          style="min-height: 42px;"
        >
          <span v-if="winners.length === 0" class="text-muted">No winners selected yet</span>
          <span
            v-for="winner in winners"
            :key="winner.id"
            class="badge bg-success d-flex align-items-center"
            style="font-size: 0.875rem; padding: 0.5em 0.75em;"
          >
            {{ winner.name }} ({{ winner.email }})
            <button
              type="button"
              class="btn-close btn-close-white ms-2"
              aria-label="Remove"
              style="font-size: 0.65rem; filter: invert(1);"
              @click="removeWinner(winner.id)"
            ></button>
          </span>
        </div>
        <MyButton 
          @click="selectWinner" 
          :disabled="isNewWinnerButtonDisabled"
          variant="primary"
        >
          New winner
        </MyButton>
      </div>
      <div v-if="winners.length > 0" class="mt-2 text-muted small">
        {{ winners.length }}/3 winners selected
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  background-color: #198754 !important; // Примусово встановлюємо колір
  
  .btn-close {
    filter: invert(1) brightness(2); // Робить хрестик більш видимим
  }
}

.form-control {
  background-color: white;
}
</style>