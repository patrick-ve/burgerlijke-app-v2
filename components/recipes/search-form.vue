<template>
  <form class="mb-4" @submit.prevent>
    <UFormGroup name="search" size="lg">
      <UInput
        placeholder="Search for a recipe"
        icon="i-heroicons-magnifying-glass"
        v-model="searchStore.query"
        @keyup.enter="handleSubmit"
      />
    </UFormGroup>
  </form>

  <section v-if="searchStore.searchResults.length > 0">
    <h2 class="mb-2 text-xl font-semibold">Results</h2>
    <ul
      class="mb-4 flex snap-x snap-mandatory w-full h-54 overflow-x-scroll py-1 scrollbar-hide"
    >
      <recipes-card
        v-for="recipe in searchStore.searchResults"
        :key="recipe.id"
        :recipe="recipe"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore();

const { handleSubmit } = searchStore;
</script>
