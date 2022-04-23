<template>
    <div :class="$style.sortItem">
        <select @change="changeSort">
            <option value="priceMin">По цене min</option>
            <option value="priceMax">По цене max</option>
            <option value="name">По наименованию</option>
        </select>
    </div>
</template>

<script>
import { useState } from "../store/index";
export default {
    name: "SortItem",
    props: { sortProducts: Function },
    setup() {
        return { state: useState() };
    },
    methods: {
        changeSort(event) {
            this.state.sort = event.target.value;
            this.sortProducts();
        },
    },
};
</script>

<style lang="scss" module>
@import "./../assets/styles/sortItem.module.scss";
</style>
