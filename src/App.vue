<template>
    <div :id="$style.preloader" v-if="isLoading">
        <div>
            <div :id="$style.preloaderBounce1"></div>
            <div :id="$style.preloaderBounce2"></div>
            <div :id="$style.preloaderBounce3"></div>
        </div>
    </div>
    <NewProduct :sortProducts="sortProducts" />
    <div :class="$style.wrapper">
        <SortItem :sortProducts="sortProducts" />
        <ProductItem />
    </div>
</template>

<style></style>

<script>
import NewProduct from "./components/NewProduct.vue";
import ProductItem from "./components/ProductItem.vue";
import SortItem from "./components/SortItem.vue";
import { useState } from "./store/index";
import "./assets/styles/reset.css";
import "./assets/styles/fonts.css";
import "./assets/styles/main.scss";

export default {
    name: "App",
    components: {
        NewProduct,
        ProductItem,
        SortItem,
    },
    setup() {
        return { state: useState() };
    },
    data() {
        return {
            isLoading: true,
        };
    },
    mounted() {
        this.isLoading = false;
    },
    methods: {
        sortProducts() {
            const { products, sort } = this.state;
            switch (sort) {
                case "priceMax":
                    products.sort(function (a, b) {
                        return (
                            b.price.replace(/ /g, "") -
                            a.price.replace(/ /g, "")
                        );
                    });
                    break;
                case "name":
                    products.sort(function (a, b) {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                default:
                    products.sort(function (a, b) {
                        return (
                            a.price.replace(/ /g, "") -
                            b.price.replace(/ /g, "")
                        );
                    });
                    break;
            }
        },
    },
};
</script>

<style lang="scss" module>
@import "./assets/styles/app.module.scss";
</style>
