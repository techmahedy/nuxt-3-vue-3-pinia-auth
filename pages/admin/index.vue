<template>
    <AdminLayout>
        <div 
            id="AdminPage" 
            class="flex h-[100vh] pb-4"
        >
            <div class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
                <div class="max-w-[750px] mx-auto pb-24">
                   <H1>Welcome to admin panel {{ email }}</H1>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '~~/layouts/AdminLayout.vue';
import { useUserStore } from '~~/stores/user'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { email } = storeToRefs(userStore)

definePageMeta({ middleware: 'is-logged-out' })

onMounted(async () => {
  try {
    await userStore.getUser()
  } catch (error) {
    console.log(error)
  }
})
</script>