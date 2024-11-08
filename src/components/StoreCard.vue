<template>
  <div
    class="bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-xl duration-300"
  >
    <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ store.name }}</h2>
    <p v-if="isAdmin" class="text-gray-600">Адрес: {{ store.address }}</p>
    <p class="text-gray-600">Часы: {{ store.hours }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
  isAdmin: Boolean,
});
</script>

<style scoped></style>
