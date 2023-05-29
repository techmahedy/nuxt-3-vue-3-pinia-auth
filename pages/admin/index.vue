<template>
    <AdminLayout>
        <div 
            id="AdminPage" 
            class="flex h-[100vh] pb-4"
        >
          <div class="max-w-[750px] mx-auto pb-24">
            <h1 class="lg:text-5xl text-3xl text-center font-extrabold mt-20">
              Welcome <b>{{ email }}</b>
            </h1>
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
</script>