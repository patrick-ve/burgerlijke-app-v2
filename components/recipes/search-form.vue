<template>
  <form class="mb-4" @submit.prevent>
    <UFormGroup name="search" size="lg">
      <UInput
        placeholder="Search for a recipe"
        icon="i-heroicons-magnifying-glass"
        v-model="query"
        @keyup.enter="handleSubmit"
      />
    </UFormGroup>
  </form>

  <section v-if="recipes.length > 0 && query.length !== 0">
    <h2 class="mb-2 text-xl font-semibold">Results</h2>
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
</template>

<script setup lang="ts">
const query = ref('');
const recipes = ref([]);

async function handleSubmit() {
  const { data, pending, error } = await useFetch(
    '/api/query/recipes',
    {
      method: 'POST',
      body: {
        query: query.value,
      },
    }
  );

  console.log(data.value!);

  // @ts-ignore
  recipes.value = data.value;
}
</script>
