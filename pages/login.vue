<template>
    <AdminLayout>
        <div class="h-screen w-full flex justify-center">
            <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
                <main class="w-full">
                    <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
                        <div class="mt-10">
                            <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
                                Log in
                            </h1>
                            <form class="mt-12" @submit.prevent="login()">
                                <div>
                                    <TextInput placeholder="Email: link@gmail.com" v-model:input="email"
                                        inputType="email" :error="errors && errors.email ? errors.email[0] : ''" />
                                </div>
                                <div class="mt-4">
                                    <TextInput placeholder="Password" v-model:input="password" inputType="password"
                                        :error="errors && errors.password ? errors.password[0] : ''" />
                                </div>
                                <div class="mt-10">
                                    <button type="submit" class="rounded-full w-full p-3 font-bold"
                                        :disabled="(!email || !password)"
                                        :class="(email && password) ?
                                        'bg-[#8228D9] hover:bg-[#6c21b3] text-white' :
                                        'bg-[#EFF0EB] text-[#A7AAA2]'">
                                        Log in
                                    </button>
                                </div>
                            </form>
                            <div class="text-[14px] text-center pt-12">
                                Don't have an account?
                                <NuxtLink to="/register" class="text-[#8228D9] underline">
                                    Sign up
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
    import axios from 'axios';
    import {
        useUserStore
    } from '~~/stores/user';
    const userStore = useUserStore()
    import AdminLayout from '~/layouts/AdminLayout.vue';
    const router = useRouter()

    definePageMeta({
        middleware: 'is-logged-in'
    })

    let email = ref(null)
    let password = ref(null)
    let errors = ref(null)

    const login = async () => {
        errors.value = null
        try {
            await userStore.login(email.value, password.value);
            const token = window.localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.api_token;
            }
            router.push('/')
        } catch (error) {
            errors.value = error.response.data.errors
        }
    }
</script>
