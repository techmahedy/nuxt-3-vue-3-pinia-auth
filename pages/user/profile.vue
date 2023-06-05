<template>
    <AdminLayout>
        <div class="flex">
            <div class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
                <div class="flex flex-col justify-center mt-6">
                    <aside>
                        <ul>
                            <li>
                                <a class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md "
                                    href="#">
                                    <span class="mx-4 font-medium">My Order</span>
                                </a>
                            </li>
                            <li>
                                <button class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
                                @click="logout()">
                                    <span class="mx-4 font-medium">
                                        Sign out
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
            <div class="w-full h-full p-4 m-8 overflow-y-auto">
                <div class="flex items-center justify-center p-40 border-4 border-dotted">
                    Profile of: {{ email }}
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
    import AdminLayout from '~~/layouts/AdminLayout.vue';
    import { useUserStore } from '~~/stores/user'
    import { storeToRefs } from 'pinia';
    const router = useRouter()
    const userStore = useUserStore()

    const { email} = storeToRefs(userStore)

    definePageMeta({
        middleware: 'is-logged-out'
    })

    onMounted(async () => {
        try {
            await userStore.getUser()
        } catch (error) {
            console.log(error)
        }
    })

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
