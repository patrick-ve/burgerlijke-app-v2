<template>
  <div v-if="pending">Loading...</div>

  <div v-if="error">{{ error }}</div>

  <div v-if="recipes">
    <section
      v-for="(recipes, kitchen) in recipesGroupedByKitchen"
      :key="kitchen"
    >
      <h2 class="mb-2 text-xl font-semibold">{{ kitchen }}</h2>
      <ul
        class="mb-4 flex snap-x snap-mandatory w-full h-54 overflow-x-scroll py-1 scrollbar-hide"
      >
        <recipes-card
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
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
</script>
