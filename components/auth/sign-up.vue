<template>
  <UContainer class="p-4">
    <UForm
      :validate="validate"
      :state="state"
      :schema="schema"
      @submit="signUpHandler"
    >
      <UFormGroup label="Email" name="email" class="mb-3">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UFormGroup label="Wachtwoord" name="password" class="mb-3">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UFormGroup
        label="Herhaal wachtwoord"
        name="repeatPassword"
        class="mb-3"
      >
        <UInput v-model="state.repeatPassword" type="password" />
      </UFormGroup>
      <UButton
        icon="i-heroicons-pencil-square"
        size="sm"
        color="primary"
        variant="solid"
        type="Submit"
        label="Creëer een burgerlijk account"
        class="w-full justify-center mt-3"
        :trailing="false"
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
  repeatPassword: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Wachtwoord moet voldoen aan de volgende eisen: 8 karakters lang, 1 cijfer, 1 hoofdletter'
    ),
});

const state = ref({
  email: undefined,
  password: undefined,
  repeatPassword: undefined,
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
  if (!state.repeatPassword)
    errors.push({
      path: 'repeatPassword',
      message:
        'Wachtwoord moet tenminste 8 karakters lang zijn, 1 cijfer, 1 hoofdletter',
    });
  if (state.password !== state.repeatPassword)
    errors.push({
      path: 'repeatPassword',
      message: 'Wachtwoorden zijn niet gelijk',
    });

  return errors;
};

const supabase = useSupabaseClient();
const toast = useToast();

async function signUpHandler(event: FormSubmitEvent<any>) {
  console.log(event.data);
  const { email, password } = event.data;

  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    toast.add({
      title: `Er is een e-mail gestuurd naar ${email}. Bevestig je e-mailadres om vervolgens in te kunnen loggen.`,
    });
  } catch (error) {
    toast.add({
      title: `Er is een fout opgetreden: ${error.message}.`,
    });
    console.log(error);
  }
}
</script>
