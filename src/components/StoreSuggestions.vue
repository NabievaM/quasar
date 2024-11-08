<template>
  <ul
    v-if="showSuggestions && (filteredStores.length || searchQuery.length)"
    class="mt-2 bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto"
  >
    <li
      v-for="store in filteredStores"
      :key="store.name"
      @click="selectStore(store)"
      class="p-4 cursor-pointer hover:bg-blue-50 transition duration-200"
    >
      {{ store.name }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps(["showSuggestions", "filteredStores", "searchQuery"]);

const selectStore = (store) => {
  emit("update:searchQuery", store.name);
  emit("update:showSuggestions", false);
};
</script>

<style scoped></style>
