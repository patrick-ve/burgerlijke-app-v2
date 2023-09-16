<template>
  <UContainer v-if="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>
    <p>{{ recipe.cookingTime }}</p>
    <p>{{ recipe }}</p>
  </UContainer>
</template>

<script setup lang="ts">
import type { Recipe } from '@prisma/client';

const route = useRoute();
const { id } = route.params;

const recipe = ref(null) as Ref<Recipe | null>;

onMounted(async () => {
  recipe.value = await $fetch(`/api/recipe/${id}`);
});
</script>
