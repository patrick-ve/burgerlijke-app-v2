<template>
  <div>
    <NuxtLayout>
      <NuxtPage />

      <Navigation />
      <UNotifications />
    </NuxtLayout>
  </div>
</template>

<style>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
