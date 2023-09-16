<template>
  <section class="pt-4">
    <UContainer>
      <h1 class="font-semibold text-xl mb-4">My recipes</h1>

      <nuxt-link
        v-for="recipe in store.recipes"
        :key="recipe.id"
        :to="`/my-recipes/${recipe.id}`"
      >
        <article>
          {{ recipe.name }} - {{ recipe.description }}
        </article>
      </nuxt-link>
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
