// @ts-nocheck
import { defineStore } from "pinia";
import { api } from "../boot/axios";
import Cookies from "js-cookie";

export const useStore = defineStore("store", {
  state: () => ({
    stores: [],
    userLocation: null,
    isAdmin: false,
  }),
  actions: {
    async fetchStores() {
      try {
        const response = await api.get("/stores");

        this.stores = response.data.map((cityData) => {
          return {
            city: cityData.city,
            stores: cityData.stores.map((store) => {
              return store;
            }),
          };
        });
      } catch (error) {
        console.error("Ошибка при получении списка магазинов:", error);
      }
    },

    async login(username, password) {
      try {
        const response = await api.post("/login", { username, password });
        if (response.data.success) {
          this.isAdmin = true;
          Cookies.set("isAdmin", "true", { expires: 7 });
          this.fetchStores();
        } else {
          this.isAdmin = false;
          Cookies.set("isAdmin", "false", { expires: 7 });
        }
      } catch (error) {
        console.error("Ошибка Логина:", error);
      }
    },

    setUserLocation(location) {
      this.userLocation = location;
      this.fetchStores();
    },
    setAdminStatus(status) {
      this.isAdmin = status;
    },
  },
});
