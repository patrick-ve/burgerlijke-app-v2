<template>
  <section class="pt-4">
    <auth-hero />

    <auth-login />

    <UContainer class="text-center">
      <nuxt-link
        to="/auth/sign-up"
        label="Heb je nog geen account? Maak er een aan"
        class="mt-8 text-sm"
        >Heb je nog geen account? Maak er een aan</nuxt-link
      >
    </UContainer>
  </section>
</template>
