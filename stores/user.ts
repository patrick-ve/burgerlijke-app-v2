import { defineStore } from 'pinia';
import type { Recipe } from '@prisma/client';

export const useUserStore = defineStore('user', {
  state: () => ({
    recipes: [] as Recipe[],
  }),

  actions: {
    async fetchRecipes() {
      const user = useSupabaseUser();
      const userId = user.value!.id.toString();

      try {
        const data = await $fetch(`/api/recipes/${userId}`);

        this.recipes = data.map((recipe: any) => ({
          ...recipe,
          createdAt: new Date(recipe.createdAt),
          updatedAt: new Date(recipe.updatedAt),
        }));
      } catch (error) {
        console.error(error);
      }
    },
  },
});
