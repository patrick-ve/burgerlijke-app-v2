<template>
  <div class="flex gap-2 mb-2">
    <UFormGroup label="Quantity" name="quantity" class="w-1/4">
      <UInput size="lg" v-model="ingredient.quantity" />
    </UFormGroup>
    <UFormGroup label="Unit" name="unit" class="w-full">
      <USelectMenu
        size="lg"
        v-model="ingredient.unit"
        :options="unitsFormatted"
      />
    </UFormGroup>
  </div>
  <UFormGroup label="Ingredient name" name="name">
    <UInput size="lg" v-model="ingredient.name" />
  </UFormGroup>
</template>

<script setup lang="ts">
import { formatEnumValue, toEnumValue } from '@/utils/enums';

enum Unit {
  GRAM = 'grams',
  KILOGRAM = 'kilogram',
  LITER = 'liter',
  MILLILITER = 'ml',
  PIECE = 'pieces',
  TEASPOON = 'tsp',
  TABLESPOON = 'tbsp',
  CUP = 'cup',
  PINCH = 'pinch',
  SOME = 'some',
  OTHER = 'other',
}

const ingredient = reactive({
  name: '',
  quantity: 100,
  unit: formatEnumValue(Unit.GRAM),
});

const units = Object.keys(Unit);

const unitsFormatted = units.map(formatEnumValue);

const ingredients = ref([]);
</script>
