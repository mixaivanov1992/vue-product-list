<template>
    <div :class="$style.sortItem">
        <select @change="changeSort">
            <option
                v-for="option in options"
                :key="option.uuid"
                :value="option.value"
                :selected="option.selected"
            >
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
import { useState } from "../store/index";
import { uuid } from "vue-uuid";
export default {
    name: "SortItem",
    props: { sortProducts: Function },
    setup() {
        return { state: useState() };
    },
    data() {
        return {
            options: [
                {
                    value: "priceMin",
                    text: "По цене min",
                    uuid: uuid.v4(),
                    selected: this.state.sort === "priceMin" ? true : false,
                },
                {
                    value: "priceMax",
                    text: "По цене max",
                    uuid: uuid.v4(),
                    selected: this.state.sort === "priceMax" ? true : false,
                },
                {
                    value: "name",
                    text: "По наименованию",
                    uuid: uuid.v4(),
                    selected: this.state.sort === "name" ? true : false,
                },
            ],
        };
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
