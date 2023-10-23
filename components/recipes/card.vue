<template>
  <li>
    <article class="mx-auto max-w-sm">
      <div
        class="rounded-[--card-radius] bg-white shadow ring-1 ring-black/10 [--card-padding:theme(spacing.1)] [--card-radius:theme(borderRadius.2xl)]"
      >
        <div class="p-[--card-padding] pb-0">
          <img
            class="h-32 w-full rounded-[calc(var(--card-radius)-var(--card-padding))] object-cover"
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=4140&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div class="-mt-12 p-6 pt-0">
          <img
            class="h-20 w-20 rounded-full outline outline-2 outline-white"
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=4140&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <p class="mt-4 font-semibold">{{ recipe.name }}</p>
          <p class="text-sm text-gray-600">
            {{ recipe.cookingtime }}
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
