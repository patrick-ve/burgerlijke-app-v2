<template>
  <div
    class="h-full w-full text-gray-600 dark:text-gray-300 relative"
  >
    <header
      class="border-b-[1px] h-16 w-screen p-4 fixed z-50 bg-white flex items-center justify-between"
    >
      <h1 class="text-xl font-semibold">
        {{ documentTitle }}
      </h1>

      <UButton label="Add new recipe" />
    </header>

    <div class="py-16">
      <slot />
    </div>

    <navigation />
  </div>
</template>

<script setup lang="ts">
// Get Document title

const documentTitle = computed(() => {
  if (process.client) {
    return document.title;
  }
});
</script>

<style>
* {
  font-family: 'DM Sans', sans-serif;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
}
</style>
