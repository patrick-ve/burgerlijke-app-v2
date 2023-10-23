import { defineStore } from 'pinia';
import { AppState } from '@/types';

export const useAppStateStore = defineStore('appStateStore', () => {
  const currentAppState = ref('default');
  const isNewRecipeModalOpen = ref(false);

  function setAppState(state: AppState) {
    currentAppState.value = state;
  }

  function toggleNewRecipeModal() {
    isNewRecipeModalOpen.value = !isNewRecipeModalOpen.value;
  }

  return {
    setAppState,
    currentAppState,
    toggleNewRecipeModal,
    isNewRecipeModalOpen,
  };
});
