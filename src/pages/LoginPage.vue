<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="handleLogin"
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 class="text-center text-3xl mb-7 font-bold text-gray-700">Sign in</h2>
      <div class="mb-4">
        <input
          v-model="username"
          placeholder="Логин"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="mb-6">
        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../stores/useStore";
import Cookies from "js-cookie";

const username = ref("");
const password = ref("");
const store = useStore();
const router = useRouter();

onMounted(() => {
  const isAuth = Cookies.get("auth");
  if (isAuth === "true") {
    router.push("/admin");
  }
});

async function handleLogin() {
  try {
    await store.login(username.value, password.value);

    if (store.isAdmin) {
      Cookies.set("auth", "true");

      router.push("/admin");
    } else {
      alert("Неверный логин или пароль");
    }
  } catch (error) {
    alert("Произошла ошибка при попытке входа");
    console.error(error);
  }
}
</script>

<style scoped></style>
