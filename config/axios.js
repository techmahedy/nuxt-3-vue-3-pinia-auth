import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.baseURL = 'http://127.0.0.1:8000'
    axios.defaults.withCredentials = false;
    axios.defaults.proxyHeaders = false;
    return {
        provide: { 
            axios: axios
        },
    }
})