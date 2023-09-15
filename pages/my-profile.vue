<template>
  <section class="pt-4">
    <UContainer>
      <h1>Hello, {{ user }}</h1>
    </UContainer>

    <UContainer class="text-center">
      <UButton
        icon="i-heroicons-user-circle"
        size="sm"
        color="primary"
        variant="solid"
        type="Submit"
        label="Log uit"
        class="w-full justify-center mt-3"
        :trailing="false"
        @click="logoutHandler"
      />
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const toast = useToast();

const logoutHandler = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    toast.add({
      title: 'Je bent succesvol uitgelogd.',
      timeout: 2500,
    });

    await navigateTo('/auth/login');
  } catch (error: any) {
    toast.add({
      title: `Er is een fout opgetreden: ${error.message}.`,
    });
    console.error(error);
  }
};
</script>
