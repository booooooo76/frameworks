<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Participant } from '@/interfaces/Participant';
import SearchBar from '@/components/features/SearchBar.vue';
import MyButton from '@/components/base/MyButton.vue';

const props = defineProps<{
  participants: Participant[];
}>();

const emit = defineEmits<{
  (e: 'edit', participant: Participant): void;
  (e: 'delete', participant: Participant): void;
}>();

// --- Стан для фільтрації ---
const filterQuery = ref('');
const handleFilter = (query: string) => {
  filterQuery.value = query.toLowerCase();
};

// --- Стан для сортування ---
const sortKey = ref<'name' | 'role' | null>(null); // Оновлено
const sortOrder = ref<'asc' | 'desc'>('asc');

const setSort = (key: 'name' | 'role') => { // Оновлено
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const getSortIcon = (key: 'name' | 'role') => { // Оновлено
  if (sortKey.value !== key) return 'bi-sort-down';
  if (sortOrder.value === 'asc') return 'bi-sort-alpha-down';
  return 'bi-sort-alpha-up-alt';
};

// --- Обчислювані властивості для відображення ---
const filteredParticipants = computed(() => {
  if (!filterQuery.value) {
    return props.participants;
  }
  return props.participants.filter((p) =>
    p.name.toLowerCase().includes(filterQuery.value)
  );
});

const sortedAndFilteredParticipants = computed(() => {
  if (!sortKey.value) {
    return filteredParticipants.value;
  }
  
  const key = sortKey.value;
  const order = sortOrder.value === 'asc' ? 1 : -1;

  // Створюємо копію, щоб не мутувати 'props'
  return [...filteredParticipants.value].sort((a, b) => {
    // Сортування для рядків (name або role)
    return a[key].localeCompare(b[key]) * order;
  });
});
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <SearchBar @filter-by-name="handleFilter" />
      
      <div class="table-responsive">
        <table class="table table-striped table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Avatar</th>
              <th scope="col" @click="setSort('name')" style="cursor: pointer">
                Name <i class="bi" :class="getSortIcon('name')"></i>
              </th>
              <th scope="col" @click="setSort('role')" style="cursor: pointer">
                Role <i class="bi" :class="getSortIcon('role')"></i>
              </th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="sortedAndFilteredParticipants.length === 0">
              <td colspan="6" class="text-center text-muted">No participants found.</td>
            </tr>
            <tr
              v-for="(participant, index) in sortedAndFilteredParticipants"
              :key="participant.id"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <img 
                  :src="participant.avatar" 
                  :alt="participant.name" 
                  class="rounded-circle" 
                  width="40" 
                  height="40" 
                  @error="($event.target as HTMLImageElement).src = 'https://i.imgur.com/LDOO4Qs.jpg'"
                />
              </td>
              <td>
                <RouterLink :to="{ name: 'UserDetail', params: { id: participant.id } }">
                  {{ participant.name }}
                </RouterLink>
              </td>
              <td>
                <span 
                  class="badge" 
                  :class="participant.role === 'admin' ? 'bg-primary' : 'bg-secondary'"
                >
                  {{ participant.role }}
                </span>
              </td>
              <td>{{ participant.email }}</td>
              <td>
                <MyButton
                  variant="secondary"
                  class="btn-sm me-2"
                  @click="emit('edit', participant)"
                >
                  Edit
                </MyButton>
                <MyButton
                  variant="danger"
                  class="btn-sm"
                  @click="emit('delete', participant)"
                >
                  Delete
                </MyButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
th[scope="col"] {
  user-select: none; /* Забороняємо виділення тексту на заголовках */
  cursor: pointer;
}
img.rounded-circle {
  object-fit: cover; /* Гарантує, що аватар не буде розтягнутий */
}
</style>