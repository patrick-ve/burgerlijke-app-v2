<template>
  <div class="h-screen w-screen text-gray-600 dark:text-gray-300">
    <!-- <header class="bg-red-500 h-16 w-screen"></header> -->
    <slot />

    <navigation />
  </div>
</template>

<style>
* {
  font-family: 'DM Sans', sans-serif;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
}
</style>
