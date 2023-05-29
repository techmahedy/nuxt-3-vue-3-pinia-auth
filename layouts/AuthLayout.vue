<template>
    <div id="AuthLayout" class="h-screen w-full flex justify-center">
        <div class="lg:pt-7 pt-3 lg:px-12 px-6 lg:w-2/3 w-full lg:min-w-[800px]">
            <main class="w-full">
                <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { updatedLinkId } = storeToRefs(userStore)
const route = useRoute()
</script>