import { defineStore } from 'pinia';

export const useSearchStore = defineStore('searchStore', () => {
  const query = ref('');
  const searchResults = ref([]);

  async function handleSubmit() {
    const { data } = await useFetch('/api/query/recipes', {
      method: 'POST',
      body: {
        query: query.value,
      },
    });

    // @ts-ignore
    searchResults.value = data.value;
  }

  return {
    query,
    searchResults,
    handleSubmit,
  };
});
