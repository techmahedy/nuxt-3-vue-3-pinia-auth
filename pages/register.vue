<template>
    <AdminLayout>
        <div class="h-screen w-full flex justify-center">
            <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
                <main class="w-full">
                    <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
                        <div class="mt-10">
                            <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
                                Create your account
                            </h1>

                            <form class="mt-12" @submit.prevent="register()">
                                <div>
                                    <TextInput placeholder="Username" v-model:input="name" inputType="text"
                                        :error="errors && errors.name ? errors.name[0] : ''" />
                                </div>

                                <div class="mt-4">
                                    <TextInput placeholder="Email: link@gmail.com" v-model:input="email"
                                        inputType="email" :error="errors && errors.email ? errors.email[0] : ''" />
                                </div>

                                <div class="mt-4">
                                    <TextInput placeholder="Password" v-model:input="password" inputType="password"
                                        :error="errors && errors.password ? errors.password[0] : ''" />
                                </div>

                                <div class="mt-4">
                                    <TextInput placeholder="Confirm Password" v-model:input="confirmPassword"
                                        inputType="password" />
                                </div>

                                <div class="mt-10">
                                    <button type="submit" class="rounded-full w-full p-3 font-bold"
                                        :disabled="(!name || !email || !password || !confirmPassword)"
                                        :class="(name && email && password && confirmPassword) ?
                                        'bg-[#8228D9] hover:bg-[#6c21b3] text-white' :
                                        'bg-[#EFF0EB] text-[#A7AAA2]'">
                                        Create account
                                    </button>
                                </div>
                            </form>

                            <div class="text-[14px] text-center pt-12">
                                Already have an account?
                                <NuxtLink to="/" class="text-[#8228D9] underline">
                                    Log in
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
    import { useUserStore } from '~~/stores/user';
    import AdminLayout from '~/layouts/AdminLayout.vue';
    const router = useRouter()
    const userStore = useUserStore()

    definePageMeta({
        middleware: 'is-logged-in'
    })

    let name = ref(null)
    let email = ref(null)
    let password = ref(null)
    let confirmPassword = ref(null)
    let errors = ref(null)

    const register = async () => {
        errors.value = null

        try {
            await userStore.register(
                name.value,
                email.value,
                password.value,
                confirmPassword.value
            )
            router.push('/')
        } catch (error) {
            console.log(error)
            errors.value = error.response.data.errors
        }
    }
</script>
