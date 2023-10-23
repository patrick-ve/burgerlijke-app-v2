<template>
  <UForm
    :state="recipe"
    class="space-y-2 p-1 overflow-y-scroll !h-[50vh] scrollbar-hide"
  >
    <UTabs :items="tabItems" @change="$emit('change-tab', $event)">
      <template #item="{ item }">
        <div v-if="item.key === 'description'" class="space-y-2">
          <UFormGroup label="Title" name="title">
            <UInput
              size="lg"
              v-model="recipe.title"
              :placeholder="placeholders.title"
            />
          </UFormGroup>

          <UFormGroup label="Description" name="description">
            <UTextarea
              size="lg"
              v-model="recipe.description"
              :rows="4"
              :placeholder="placeholders.description"
            />
          </UFormGroup>

          <UFormGroup label="Kitchen" name="kitchen">
            <USelectMenu
              size="lg"
              v-model="recipe.kitchen"
              :options="kitchensFormatted"
            />
          </UFormGroup>

          <div class="flex gap-4 pt-2">
            <UFormGroup label="Vegetarian" name="vegetarian">
              <UToggle
                on-icon="i-heroicons-check-20-solid"
                off-icon="i-heroicons-x-mark-20-solid"
                v-model="recipe.isVegeterian"
              />
            </UFormGroup>

            <UFormGroup
              :label="`Portions: ${recipe.portions}`"
              name="time"
              class="w-full"
            >
              <URange
                v-model="recipe.portions"
                :min="1"
                :max="12"
                :step="1"
              />
            </UFormGroup>
          </div>

          <UFormGroup
            :label="`Cooking time: ${recipe.cookingTime} minutes`"
            name="time"
            class="w-full mt-2"
          >
            <URange
              v-model="recipe.cookingTime"
              :min="5"
              :max="120"
              :step="5"
            />
          </UFormGroup>
        </div>

        <div v-if="item.key === 'ingredients'">
          <input-ingredient />
        </div>
      </template>
    </UTabs>
  </UForm>
</template>

<script setup lang="ts">
import { formatEnumValue, toEnumValue } from '@/utils/enums';

enum Kitchen {
  ITALIAN = 'Italian',
  MEXICAN = 'Mexican',
  SPANISH = 'Spanish',
  GREEK = 'Greek',
  JAPANESE = 'Japanese',
  CHINESE = 'Chinese',
  INDIAN = 'Indian',
  FRENCH = 'French',
  DUTCH = 'Dutch',
  AMERICAN = 'American',
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
  OTHER = 'Other',
}

const recipe = reactive({
  title: '',
  description: '',
  kitchen: formatEnumValue(Kitchen.ITALIAN),
  isVegeterian: false,
  portions: 2,
  cookingTime: 30,
});

const placeholders = {
  title: 'Spaghetti alla carbonara',
  description:
    'A tasty recipe from Rome that only contains 4 ingredients. If you prepare this recipe with cream, you will be banned from Italy.',
};

const kitchens = Object.values(Kitchen);

// Use the helper function to format the enum values for display
const kitchensFormatted = kitchens.map(formatEnumValue);

// When saving to the database, use the other helper function to convert back to enum
const kitchenToSave = toEnumValue(recipe.kitchen);

const tabItems = [
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'ingredients',
    label: 'Ingredients',
  },
  {
    key: 'preparation',
    label: 'Preparation',
  },
];
</script>
