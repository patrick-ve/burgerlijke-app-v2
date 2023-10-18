<template>
  <section class="pt-4">
    <UContainer>
      <h1 class="font-semibold text-xl mb-4">My recipes</h1>

      <UIcon name="i-heroicons-arrow-down-right-20-solid" />

      <nuxt-link
        v-for="recipe in store.recipes"
        :key="recipe.id"
        :to="`/my-recipes/${recipe.id}`"
      >
        <article>
          {{ recipe.name }} - {{ recipe.description }}
        </article>
      </nuxt-link>

      <UModal v-model="isModalOpen">
        <UCard>
          <template #header>
            <h1 class="font-semibold text-xl">
              Maak een nieuw recept aan
            </h1>
          </template>
          <recipes-create-form />
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
import { useUserStore } from '@/stores/user';

const store = useUserStore();

const isModalOpen = ref(false);

onMounted(() => {
  store.fetchRecipes();
});
</script>
