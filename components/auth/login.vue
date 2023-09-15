<template>
  <UContainer class="p-4">
    <UForm
      :validate="validate"
      :state="state"
      :schema="schema"
      @submit="loginHandler"
    >
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
        :disabled="formContainsErrors"
      />
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod';
import type {
  FormError,
  FormSubmitEvent,
} from '@nuxt/ui/dist/runtime/types';

// const client = useSupabaseClient();
// const user = useSupabaseUser();

const schema = z.object({
  email: z
    .string()
    .regex(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
      'Ongeldig e-mailadres'
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Wachtwoord moet voldoen aan de volgende eisen: 8 karakters lang, 1 cijfer, 1 hoofdletter'
    ),
});

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

const formContainsErrors = computed(() => {
  return validate(state.value).length > 0;
});

const supabase = useSupabaseClient();
const toast = useToast();

async function loginHandler(event: FormSubmitEvent<any>) {
  console.log(event.data);

  const { email, password } = event.data;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    toast.add({
      title: 'Je bent succesvol ingelogd.',
    });

    navigateTo('/');
  } catch (error) {
    toast.add({
      title: `Er is een fout opgetreden: ${error.message}.`,
    });
  }
}

// watchEffect(() => {
//   if (user.value) {
//     return navigateTo('/');
//   }
// });
</script>
