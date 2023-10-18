<template>
  <section class="pt-4">
    <UContainer>
      <h1 class="mb-4 text-xl font-semibold">My recipes</h1>

      <UIcon name="i-heroicons-arrow-down-right-20-solid" />

      <!-- <nuxt-link
        v-for="recipe in store.recipes"
        :key="recipe.id"
        :to="`/my-recipes/${recipe.id}`"
      >
        <article>
          {{ recipe.name }} - {{ recipe.description }}
        </article>
      </nuxt-link> -->

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
</script>
