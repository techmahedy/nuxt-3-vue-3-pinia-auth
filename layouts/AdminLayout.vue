<template>
    <div id="AdminLayout" class="w-full fixed z-30">
        <div 
            id="TopNav" 
            class="w-full flex items-center justify-between md:pt-2.5 md:px-2.5"
        >
            <div class="flex items-center justify-between md:rounded-full md:shadow-sm px-2 md:pl-6 pl-4 py-[8px] bg-white w-full border-b">
                <button
                    @click="logout()"
                    class="w-full flex items-center text-gray-600 text-[15px] p-3 hover:text-black"
                >
                    <Icon name="circum:logout" class="mr-6" />
                    Sign out
                </button>
            </div>
        </div>
    </div>
    <div class="px-2.5 w-full z-0">
        <slot />
    </div>
</template>

<script setup>
    import { useUserStore } from '~~/stores/user'
    const userStore = useUserStore()
    const route = useRoute()
    const router = useRouter()

    const logout = async () => {
        let res = confirm('Are you sure you want to sign out?')
        try {
            if (res) {
                await userStore.logout()
                localStorage.removeItem('token');
                router.push('/')
                return
            }
        } catch (error) {
            console.log(error) 
        }
    }
</script>