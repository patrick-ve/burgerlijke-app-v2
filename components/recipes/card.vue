<template>
  <li class="pl-1 snap-start shrink-0 h-52 w-52">
    <article class="mr-2">
      <div
        class="rounded-[--card-radius] bg-white ring-2 ring-gray-600/10 [--card-padding:theme(spacing.1)] [--card-radius:theme(borderRadius.2xl)]"
      >
        <div class="p-[--card-padding] pb-0">
          <img
            class="h-1/2 w-auto rounded-[calc(var(--card-radius)-var(--card-padding))] object-cover"
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=4140&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div class="p-2 pt-0">
          <p
            class="mt-4 text-sm font-semibold text-gray-600 text-ellipsis"
          >
            {{ recipe.name }}
          </p>
          <p class="text-sm text-gray-600 flex items-center">
            <UIcon
              name="i-heroicons-clock"
              class="inline-block w-4 h-4 mr-1"
            />
            {{ recipe.cookingtime }} minutes
          </p>
          <div class="mt-2 text-sm"></div>
        </div>
      </div>
    </article>
  </li>
</template>

<script setup lang="ts">
defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});
</script>
