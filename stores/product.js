import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useProductStore = defineStore('product', {
    state: () => ({
        products: {},
        isLoading: false,
    }),
    actions: {
        async getProduct() {
            let res = await $axios.get('http://192.168.101.146/api/v1/products')
            this.$state.products = res.data.data.result;
        },
    },
    persist: true,
})