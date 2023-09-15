<template>
  <UContainer class="p-4">
    <UForm :validate="validate" :state="state" @submit="submit">
      <UFormGroup label="Email" name="email" class="mb-3">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Wachtwoord" name="password" class="mb-3">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UButton
        icon="i-heroicons-user-circle"
        size="sm"
        color="primary"
        variant="solid"
        type="Submit"
        label="Log in met je burgerlijk account"
        class="w-full justify-center mt-3"
        :trailing="false"
      />
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const client = useSupabaseClient();
const user = useSupabaseUser();

import type {
  FormError,
  FormSubmitEvent,
} from '@nuxt/ui/dist/runtime/types';

const state = ref({
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email)
    errors.push({ path: 'email', message: 'Verplicht' });
  if (!state.password)
    errors.push({
      path: 'password',
      message:
        'Wachtwoord moet tenminste 8 karakters lang zijn, 1 cijfer, 1 hoofdletter',
    });
  return errors;
};

async function submit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}

watchEffect(() => {
  if (user.value) {
    return navigateTo('/');
  }
});
</script>
