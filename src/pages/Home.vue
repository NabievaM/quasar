<template>
  <div
    class="padding min-h-screen bg-gradient-to-r from-blue-100 to-purple-300 flex flex-col items-center"
  >
    <header
      class="w-full px-5 py-3 flex justify-between items-center mb-8 shadow-lg"
    >
      <h1 class="text-5xl font-extrabold text-gray-800">Store Finder</h1>
      <router-link
        to="/login"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Admin Login
      </router-link>
    </header>

    <LocationRequest
      :userLocationRequested="userLocationRequested"
      :locationError="locationError"
      @update:userLocationRequested="userLocationRequested = $event"
      @update:locationError="locationError = $event"
    />

    <SearchBar
      :searchQuery="searchQuery"
      :filteredStores="filteredStores"
      @update:searchQuery="updateSearchQuery"
      @searchPerformed="performSearch"
    />

    <div
      v-if="sortedStores.length > 0"
      class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <StoreCard
        v-for="store in displayedStores"
        :key="store.name"
        :store="store"
        :is-admin="store.isAdmin"
      />
    </div>

    <div v-else class="mt-8 text-center text-lg text-gray-600">
      <p>No stores found in your area or matching your search.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import LocationRequest from "../components/LocationRequest.vue";
import StoreCard from "../components/StoreCard.vue";
import SearchBar from "../components/SearchBar.vue";
import { useStore } from "../stores/useStore";
import { calculateDistance } from "../utils/calculateDistance";

defineOptions({
  name: "HomePage",
});

const store = useStore();

onMounted(() => {
  store.fetchStores();
});

const searchQuery = ref("");
const userLocationRequested = ref(false);
const locationError = ref(false);

const updateSearchQuery = (newQuery) => {
  searchQuery.value = newQuery;
};

const performSearch = () => {
  if (!filteredStores.value.length) {
    console.log("Store not found.");
  }
};

const filteredStores = computed(() => {
  if (!searchQuery.value) return [];
  return store.stores
    .flatMap((cityObj) => cityObj.stores)
    .filter((store) =>
      store.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const sortedStores = computed(() => {
  const allStores = store.stores.flatMap((cityObj) => cityObj.stores);

  if (store.userLocation) {
    return allStores.slice().sort((a, b) => {
      const distanceA = calculateDistance(
        store.userLocation.latitude,
        store.userLocation.longitude,
        a.latitude,
        a.longitude
      );
      const distanceB = calculateDistance(
        store.userLocation.latitude,
        store.userLocation.longitude,
        b.latitude,
        b.longitude
      );
      return distanceA - distanceB;
    });
  }

  return allStores;
});

const displayedStores = computed(() => {
  if (searchQuery.value && filteredStores.value.length) {
    return filteredStores.value;
  }
  return sortedStores.value;
});
</script>

<style scoped>
.padding {
  padding-bottom: 30px;
}
</style>
