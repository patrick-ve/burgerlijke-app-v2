<template>
  <section class="pt-4">
    <UContainer>
      <h1 class="mb-4 text-xl font-semibold">My recipes</h1>

      <div v-if="pending">Loading...</div>

      <div v-if="error">{{ error }}</div>

      <div v-if="recipes">
        <article
          v-for="(recipes, kitchen) in recipesGroupedByKitchen"
          :key="kitchen"
        >
          <h2 class="mb-2 text-xl font-semibold">{{ kitchen }}</h2>
          <ul>
            <li v-for="recipe in recipes" :key="recipe.id">
              <h3>{{ recipe.name }}</h3>
              <p>Portions: {{ recipe.portions }}</p>
              <p>Cooking Time: {{ recipe.cookingtime }} minutes</p>
            </li>
          </ul>
        </article>
      </div>

      <UModal
        v-model="isModalOpen"
        :ui="{ base: '-top-[20vh] left-0' }"
      >
        <UCard>
          <template #header>
            <h1 class="text-xl font-semibold">Create a new recipe</h1>
          </template>
          <recipes-create-form @change-tab="handleButton" />

          <template #footer>
            <UButton
              size="lg"
              square
              :label="modalButtons[activeIndex].label"
              class="justify-center w-full"
              @click="modalButtons[activeIndex].action()"
            />
          </template>
        </UCard>
      </UModal>

      <UButton
        block
        label="Maak een nieuw recept aan"
        icon="i-heroicons-plus-circle"
        @click="isModalOpen = true"
      />
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const isModalOpen = ref(false);
const activeIndex = ref(0);

function handleButton(index: number) {
  activeIndex.value = index;
}

const modalButtons = [
  {
    label: 'Create new recipe',
    action: () => {
      console.log('create new recipe');
    },
  },
  {
    label: 'Add ingredient',
    action: () => {
      console.log('add ingredient');
    },
  },
  {
    label: 'Add preparation step',
    action: () => {
      console.log('add step');
    },
  },
];

const {
  data: recipes,
  error,
  pending,
} = await useLazyFetch('/api/recipes', {
  method: 'GET',
});

const recipesGroupedByKitchen = recipes.value!.reduce(
  (group: Record<string | number, (typeof product)[]>, product) => {
    const kitchen = product.kitchen as string;
    group[kitchen] = group[kitchen] ?? [];
    group[kitchen].push(product);
    return group;
  },
  {}
);

console.dir(recipesGroupedByKitchen);
</script>
