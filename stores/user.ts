import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    recipes: [],
  }),

  actions: {
    async getAllRecipes() {
      let res = await useFetch('/api/recipes');
      this.recipes = res.data as any;
      return res.data;
    },
  },
});
