<template>
  <section class="pt-4">
    <auth-hero />

    <auth-sign-up />

    <UContainer class="text-center">
      <nuxt-link to="/auth/login" class="mt-8 text-sm"
        >Heb je al een account? Log in</nuxt-link
      >
    </UContainer>
  </section>
</template>

<script setup lang="ts"></script>
