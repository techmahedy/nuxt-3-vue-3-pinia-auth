<template>
    <AdminLayout>
        <div id="AdminPage" class="flex h-[100vh] pb-4">
            <div class="max-w-[750px] mx-auto pb-24">
                <div class="bg-white">
                    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <div class="group relative" v-for="(product, index) in products.data" :key="index">
                                <div
                                    class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                                    <img src="https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                        alt="image"
                                        class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                                </div>
                                <div class="mt-4 flex justify-between">
                                    <div>
                                        <h3 class="text-sm text-gray-700">
                                            <a href="#">
                                                <span aria-hidden="true" class="inset-0"></span>
                                                {{ product?.title }}
                                            </a>
                                        </h3>
                                    </div>
                                    <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>
                                </div>
                                <button class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md px-2 py-1 text-white" @click.prevent="addToCart(product.id)">
                                  Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
    import AdminLayout from '~~/layouts/AdminLayout.vue';
    import { useCartStore } from '~~/stores/cart';
    import { useProductStore } from '~~/stores/product';
    import { storeToRefs } from 'pinia';
    const cartStore = useCartStore()
    const productStore = useProductStore()
    const { products } = storeToRefs(productStore)

    const addToCart = async (productID) => {
        try {
          await cartStore.addToCart(productID);
        } catch (error) {}
    }

    onMounted(async () => {
        try {
            await productStore.getProduct()
        } catch (error) {
            console.log(error)
        }
    })
</script>
