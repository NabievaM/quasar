<template>
  <div
    v-if="!userLocationRequested || locationError"
    class="bg-white border border-gray-300 rounded-lg p-4 shadow-lg mb-8 max-w-md text-center transition duration-300 transform hover:shadow-xl"
  >
    <p class="text-gray-800 mb-6 text-lg font-medium">
      Сайт запрашивает ваше местоположение, чтобы показать ближайшие магазины.
    </p>
    <div class="flex justify-center gap-4">
      <button
        @click="requestLocation"
        class="bg-blue-600 text-white px-4 py-3 rounded-full shadow hover:bg-blue-700 transition duration-700 transform hover:scale-105"
      >
        Разрешить доступ к местоположению
      </button>
      <button
        @click="denyLocation"
        class="bg-gray-300 text-gray-700 px-6 py-3 rounded-full shadow hover:bg-gray-400 transition duration-700 transform hover:scale-105"
      >
        Нет
      </button>
    </div>
    <p v-if="locationError" class="text-red-500 mt-4">
      Разрешение на получение местоположения не предоставлено или произошла
      ошибка.
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../stores/useStore";

const props = defineProps({
  userLocationRequested: Boolean,
  locationError: Boolean,
});

const emit = defineEmits([
  "update:userLocationRequested",
  "update:locationError",
]);

const store = useStore();

const requestLocation = () => {
  emit("update:userLocationRequested", true);
  emit("update:locationError", false);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      store.userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    },
    (error) => {
      locationError.value = true;
    }
  );
};

const denyLocation = () => {
  emit("update:userLocationRequested", true);
  store.setUserLocation({ latitude: 55.7558, longitude: 37.6173 });
};
</script>

<style scoped></style>
