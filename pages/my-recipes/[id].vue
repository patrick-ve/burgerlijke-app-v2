<template>
  <section class="pt-4">
    <UContainer v-if="recipe">
      <h1 class="font-semibold text-xl mb-4">{{ recipe.name }}</h1>
      <p>{{ recipe.description }}</p>
      <p>{{ recipe.cookingTime }}</p>
      <ul>
        <li v-for="step in recipe.preparationSteps" :key="step.id">
          {{ step.description }}
        </li>
      </ul>

      <ul>
        <li
          v-for="ingredient in recipe.ingredients"
          :key="ingredient.id"
        >
          {{ ingredient.name }} - {{ ingredient.amount }} -
          {{ ingredient.unit }}
        </li>
      </ul>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { CompleteRecipe } from '@/types';

const route = useRoute();
const { id } = route.params;

const recipe = ref(null) as Ref<CompleteRecipe | null>;

onMounted(async () => {
  recipe.value = await $fetch(`/api/recipe/${id}`);
});
</script>
