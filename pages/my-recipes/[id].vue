<template>
  <section class="pt-4">
    <UContainer v-if="recipe">
      <h1 class="font-semibold text-xl mb-4">{{ recipe.name }}</h1>
      <p>{{ recipe.description }}</p>
      <span class="flex items-center"
        ><UIcon name="i-heroicons-clock" class="mr-1" />
        {{ recipe.cookingTime }} minuten</span
      >

      <UTabs :items="items" class="w-full mt-4">
        <template #default="{ item, index, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate">{{ item.label }}</span>
          </div>
        </template>

        <template #item="{ item, selected }">
          <ul v-if="item.key === 'ingredients'" class="mb-4">
            <li
              v-for="ingredient in recipe.ingredients"
              :key="ingredient.id"
              class="py-1 border-b border-gray-200"
            >
              {{ ingredient.amount }}
              {{
                mapIngredientAmount(
                  ingredient.unit,
                  ingredient.amount
                )
              }}
              {{
                ingredient.name.charAt(0).toLowerCase() +
                ingredient.name.slice(1)
              }}
            </li>
          </ul>

          <ul v-if="item.key === 'preparation'">
            <li
              v-for="(step, index) in recipe.preparationSteps"
              :key="step.id"
            >
              {{ index + 1 }}. {{ step.description }}
            </li>
          </ul>

          <UButton
            v-if="item.key === 'ingredients'"
            block
            label="Plan deze maaltijd in"
          />
        </template>
      </UTabs>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { CompleteRecipe } from '@/types';
import { mapIngredientAmount } from '@/utils/amountTransformer';

const route = useRoute();
const { id } = route.params;

const recipe = ref(null) as Ref<CompleteRecipe | null>;

const items = [
  {
    label: 'Ingredienten',
    key: 'ingredients',
    icon: 'i-heroicons-list-bullet',
    item: recipe.value?.ingredients,
  },
  {
    label: 'Bereiding',
    key: 'preparation',
    icon: 'i-heroicons-information-circle',
    item: recipe.value?.preparationSteps,
  },
];

onMounted(async () => {
  recipe.value = await $fetch(`/api/recipe/${id}`);
});
</script>
