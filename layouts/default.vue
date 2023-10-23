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

      <UButton
        :label="currentRouteButton?.label"
        @click="currentRouteButton?.action"
      />
    </header>

    <div class="py-16">
      <slot />
    </div>

    <navigation />
  </div>
</template>

<script setup lang="ts">
const documentTitle = computed(() => {
  if (process.client) {
    return document.title;
  }
});

const headerButtons = [
  {
    route: 'my-recipes',
    label: 'Add new recipe',
    action: () => {
      console.log('add new recipe');
    },
  },
];

const currentRouteButton = computed(() => {
  const currentRoute = useRoute();
  const currentRouteName = currentRoute.name;

  return headerButtons.find(
    (button) => button.route === currentRouteName
  );
});
</script>

<style>
* {
  font-family: 'DM Sans', sans-serif;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
}
</style>
