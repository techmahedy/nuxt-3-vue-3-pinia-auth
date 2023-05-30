import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    
    if (to.fullPath === '/login' && userStore.id) {
        return navigateTo('/')
    }

    if (to.fullPath === '/register' && userStore.id) {
        return navigateTo('/')
    }
})