<template>
  <section class="pt-4">
    <UContainer>
      <h1 class="font-semibold text-xl mb-4">My recipes</h1>
      <code>{{ store.recipes }}</code>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const store = useUserStore();

onMounted(() => {
  store.fetchRecipes();
});
</script>
