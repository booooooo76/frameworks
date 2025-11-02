<script setup lang="ts">
// Тут може бути логіка для головної сторінки
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card shadow-sm">
        <div class="card-body text-center">
          <h1 class="card-title">Welcome to Vue Lottery!</h1>
          <p class="lead">
            This is the main page of our application.
          </p>
          <RouterLink to="/lottery" class="btn btn-primary btn-lg">
            Go to Lottery
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>