<template>
    <AdminLayout>
        <div 
            id="AdminPage" 
            class="flex h-[100vh] pb-4"
        >
          <div class="max-w-[750px] mx-auto pb-24">
            <h1 class="lg:text-5xl text-3xl text-center font-extrabold mt-20">
              Your profile
            </h1>
            <p>ID: {{ id }}</p>
            <p>Email: {{ email }}</p>
          </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '~~/layouts/AdminLayout.vue';
import { useUserStore } from '~~/stores/user'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { id,email } = storeToRefs(userStore)

definePageMeta({ middleware: 'is-logged-out' })

onMounted(async () => {
  try {
    await userStore.getUser()
  } catch (error) {
    console.log(error)
  }
})
</script>