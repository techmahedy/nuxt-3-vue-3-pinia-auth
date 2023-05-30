import { defineStore } from "pinia";
import products from "~/product";

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
                image: products.find((p) => p.id === product.productID).photoURL,
                name: products.find((p) => p.id === product.productID).name,
                price: products.find((p) => p.id === product.productID).price,
                quantity: product.quantity,
                cost: product.quantity * products.find((p) => p.id === product.productID).price,
              };
            });
        },
        totalCartPrice() {
            return Object.keys(this.$state.cartContent).reduce((acc, id) => {
              const product = products.find((p) => p.id === id);
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