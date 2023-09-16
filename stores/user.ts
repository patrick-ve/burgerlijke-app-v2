import { defineStore } from 'pinia';

const user = useSupabaseUser();
const userId = user.value!.id;

export const useUserStore = defineStore('user', {
  state: () => ({
    recipes: [],
  }),

  actions: {
    async fetchRecipes() {
      try {
        this.recipes = await $fetch(`/api/recipe/${userId}`, {
          method: 'GET',
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
