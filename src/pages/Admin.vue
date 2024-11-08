<template>
  <div class="container mx-auto p-10 bg-gray-50 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
      Панель администратора - Магазины
    </h1>
    <div v-if="stores.length === 0" class="text-gray-500 text-center text-lg">
      Нет данных.
    </div>
    <div v-else>
      <div v-for="(cityData, index) in stores" :key="index" class="my-4">
        <h3 class="text-xl font-semibold">{{ cityData.city }}</h3>
        <table
          class="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
        >
          <thead class="bg-gray-200">
            <tr>
              <th
                class="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold"
              >
                Название
              </th>
              <th
                class="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold"
              >
                Координаты
              </th>
              <th
                class="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold"
              >
                Адрес
              </th>
              <th
                class="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold"
              >
                Время работы
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(store, storeIndex) in cityData.stores"
              :key="storeIndex"
              class="hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              <td class="border border-gray-300 px-6 py-4 text-gray-700">
                {{ store.name }}
              </td>
              <td class="border border-gray-300 px-6 py-4 text-gray-700">
                {{ store.latitude }}, {{ store.longitude }}
              </td>
              <td class="border border-gray-300 px-6 py-4 text-gray-700">
                {{ store.address }}
              </td>
              <td class="border border-gray-300 px-6 py-4 text-gray-700">
                {{ store.hours }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "../stores/useStore";

export default defineComponent({
  name: "AdminPage",
  setup() {
    const store = useStore();
    const stores = ref(store.stores);

    store.fetchStores().then(() => {
      stores.value = store.stores;
    });

    return {
      stores,
    };
  },
});
</script>

<style scoped>
.container {
  @apply max-w-full bg-gray-50 rounded-lg shadow-md p-10;
}

table {
  @apply border-collapse w-full;
}

th {
  @apply bg-gray-200 text-gray-700 font-semibold;
}

td {
  @apply px-6 py-4 text-gray-700;
}

tr:hover {
  @apply bg-gray-100;
}
</style>
