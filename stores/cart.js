import { defineStore } from "pinia";
import { useProductStore as productStore} from "./product";

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartContent: {},
    }),
    getters: {
        formattedCart() {
            return Object.keys(this.$state.cartContent).map((productID) => {
              const product = this.$state.cartContent[productID];
      
              return {
                id: product.productID,
                image: productStore().products.data.find((p) => p.id === product.productID).image,
                name: productStore().products.data.find((p) => p.id === product.productID).title,
                price: productStore().products.data.find((p) => p.id === product.productID).price,
                quantity: product.quantity,
                cost: product.quantity * productStore().products.data.find((p) => p.id === product.productID).price,
              };
            });
        },
        totalCartPrice() {
            return Object.keys(this.$state.cartContent).reduce((acc, id) => {
              const product = productStore().products.data.find((p) => p.id == id);
              if (product) {
                return acc + product.price * this.$state.cartContent[id].quantity;
              }
              return acc + 0;
            }, 0);
        },
        cartTotalItem() {
            return Object.keys(this.$state.cartContent).reduce((acc, id) => {
              return acc + this.$state.cartContent[id].quantity;
            }, 0);
        },
    },
    actions: {
        async addToCart(productID){
            if(this.$state.cartContent.hasOwnProperty(productID)){
                this.$state.cartContent[productID] = {
                    productID,
                    quantity: this.$state.cartContent[productID].quantity + 1
                }
            }else{
                this.$state.cartContent[productID] = {
                    productID,
                    quantity: 1
                }
            }
        }
    },
    persist: true,
})