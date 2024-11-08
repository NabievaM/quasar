<template>
  <div class="relative max-w-lg w-full mb-6">
    <input
      type="text"
      placeholder="Поиск..."
      @input="onSearch"
      @focus="showSuggestions = true"
      v-model="localSearchQuery"
      class="w-full border border-gray-300 rounded-lg p-4 pl-10 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
    <span
      class="absolute top-5 right-5 text-blue-500 cursor-pointer"
      @click="isSearchActive ? performSearch() : null"
      :class="{ 'opacity-50 cursor-not-allowed': !isSearchActive }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 16s-1.5 0-1.5-1.5S8 13 8 13s1.5 0 1.5 1.5S8 16 8 16zM21 21l-5-5m0 0a7.5 7.5 0 111.414-1.414 7.5 7.5 0 01-1.414 1.414z"
        />
      </svg>
    </span>
    <p v-if="showWarning" class="text-red-500 mt-2">Такой магазин не найден.</p>
    <ul
      v-if="
        showSuggestions && (filteredStores.length || localSearchQuery.length)
      "
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
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  searchQuery: String,
  filteredStores: Array,
});

const emit = defineEmits(["update:searchQuery", "searchPerformed"]);

const localSearchQuery = ref(props.searchQuery);
const showSuggestions = ref(false);
const showWarning = ref(false);

const isSearchActive = computed(() => localSearchQuery.value.trim().length > 0);

const onSearch = () => {
  emit("update:searchQuery", localSearchQuery.value);
  showSuggestions.value = localSearchQuery.value.length > 0;
  showWarning.value = false;
};

const performSearch = () => {
  if (!props.filteredStores.length) {
    showWarning.value = true;
  } else {
    showWarning.value = false;
  }
  showSuggestions.value = false;
  emit("searchPerformed");
};

const selectStore = (store) => {
  localSearchQuery.value = store.name;
  emit("update:searchQuery", store.name);
  showSuggestions.value = false;
};

watch(
  () => props.searchQuery,
  (newVal) => {
    localSearchQuery.value = newVal;
  }
);
</script>

<style scoped>
</style>
