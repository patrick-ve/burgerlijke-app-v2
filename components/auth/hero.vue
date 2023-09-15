<template>
  <UContainer class="mb-8 mt-20 text-center">
    <h1
      class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      De <span class="text-blue-500">Burgerlijke</span> App
    </h1>
    <p
      class="mt-6 mb-6 text-lg tracking-tight text-gray-600 dark:text-gray-300"
    >
      De app die stelletjes en singles helpt met het inrichten van het
      burgerlijke leven.
    </p>
    <ul>
      <li v-for="(item, index) in ctaItems" :key="index">
        <UIcon
          name="i-heroicons-check-circle"
          class="w-4 h-4 text-blue-500"
        />
        <span class="ml-2">{{ item }}</span>
      </li>
    </ul>
  </UContainer>
</template>

<script setup lang="ts">
const ctaItems = [
  'Beheer al je favoriete recepten',
  'Maak interactieve boodschappenlijstjes',
  "Krijg meldingen voor belangrijke to-do's",
  'Vergeet nooit meer verjaardagen van vrienden en familie',
];
</script>
