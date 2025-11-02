<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Щоб отримати :id з URL
import { userRepository } from '@/repositories/userRepository';
import type { Participant } from '@/interfaces/Participant';

const route = useRoute();
const router = useRouter(); // Для перенаправлення
const user = ref<Participant | null>(null);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  isLoading.value = true;
  errorMessage.value = null;
  
  // route.params.id - це завжди рядок (або масив)
  const userId = Number(route.params.id); 
  
  if (isNaN(userId)) {
    errorMessage.value = 'Invalid User ID specified.';
    isLoading.value = false;
    // Можна перенаправити на сторінку 404
    // router.push({ name: 'NotFound' }); 
    return;
  }

  try {
    user.value = await userRepository.getById(userId);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    errorMessage.value = 'User not found or failed to load. Please try again.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      
      <div v-if="isLoading" class="text-center my-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading user details...</p>
      </div>
      
      <div v-else-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <div v-else-if="user" class="card shadow-sm">
        <div class="card-body d-flex flex-column align-items-center">
          
          <img 
            :src="user.avatar" 
            :alt="user.name" 
            class="rounded-circle mb-3" 
            width="150" 
            height="150"
            style="object-fit: cover;"
            @error="($event.target as HTMLImageElement).src = 'https://i.imgur.com/LDOO4Qs.jpg'"
          />
          
          <h3 class="card-title">{{ user.name }}</h3>
          
          <span 
            class="badge fs-6 mb-3" 
            :class="user.role === 'admin' ? 'bg-primary' : 'bg-secondary'"
          >
            {{ user.role }}
          </span>
          
          <ul class="list-group list-group-flush w-100">
            <li class="list-group-item d-flex justify-content-between">
              <strong>Email:</strong> 
              <span>{{ user.email }}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <strong>User ID:</strong> 
              <span>#{{ user.id }}</span>
            </li>
            </ul>
          
          <RouterLink to="/lottery" class="btn btn-secondary mt-4">
            &larr; Back to Lottery
          </RouterLink>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Стилі для цієї конкретної сторінки */
.card-body {
  padding: 2rem;
}
.rounded-circle {
  border: 4px solid #eee;
}
</style>