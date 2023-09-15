<template>
  <div class="h-screen">
    <h1>Hi</h1>

    <p>{{ user }}</p>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
// const toast = useToast();
// toast.add({ title: 'Hello world!' });
</script>
