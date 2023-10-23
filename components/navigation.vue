<template>
  <nav
    class="w-screen border-t-[1px] h-16 bg-white fixed bottom-0 left-0"
  >
    <ul class="flex justify-evenly items-center h-full">
      <li
        v-for="link in navigationLinks"
        :key="link.name"
        class="flex flex-col justify-center items-center w-1/5"
      >
        <nuxt-link
          v-if="link.path"
          :to="link.path"
          class="flex flex-col justify-center items-center"
        >
          <UIcon :name="link.icon" class="w-6 h-6"></UIcon>
          <span class="text-xs">{{ link.name }}</span>
        </nuxt-link>
        <p v-else class="flex flex-col justify-center items-center">
          <UIcon :name="link.icon" class="w-6 h-6"></UIcon>
          <span class="text-xs">{{ link.name }}</span>
        </p>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const navigationLinks = [
  {
    name: 'Home',
    path: '/',
    icon: 'i-heroicons-home',
  },
  {
    name: 'Recepten',
    path: '/recipes',
    icon: 'i-heroicons-book-open',
  },
  {
    name: 'Boodschappen',
    // path: '/my-shopping-list',
    icon: 'i-heroicons-shopping-cart',
  },
  {
    name: "To do's",
    // path: '/my-todos',
    icon: 'i-heroicons-list-bullet',
  },
  {
    name: 'Profiel',
    path: '/my-profile',
    icon: 'i-heroicons-user-circle',
  },
];
</script>
