<template>
  <section class="pt-4">
    <UContainer>
      <recipes-gallery />

      <UModal
        v-model="appStateStore.isNewRecipeModalOpen"
        :ui="{ base: '-top-[15vh] left-0' }"
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
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { useAppStateStore } from '@/stores/app';

const appStateStore = useAppStateStore();

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

useHead({
  title: 'My recipes',
});
</script>
