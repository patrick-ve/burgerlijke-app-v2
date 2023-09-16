import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    recipes: [],
  }),

  actions: {
    async fetchRecipes() {
      try {
        this.recipes = await $fetch(`/api/recipes`, {
          method: 'GET',
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
