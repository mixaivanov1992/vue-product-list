<template>
    <transition-group :class="$style.productItem" name="productList" tag="div">
        <div
            :class="$style.item"
            v-for="(item, index) in state"
            :key="item.uuid"
        >
            <img :src="item.link" :class="$style.img" />
            <div :class="$style.name">{{ item.name }}</div>
            <div :class="$style.description">
                {{ item.description }}
            </div>
            <div :class="$style.price">{{ item.price }} руб.</div>
            <img
                src="../assets/img/remove.png"
                :class="$style.remove"
                @click="clickRemove(index)"
            />
        </div>
    </transition-group>
</template>

<script>
import { useState } from "../store/index";
export default {
    name: "ProductItem",
    props: {},
    setup() {
        const state = useState();
        return { state: state.products };
    },
    methods: {
        clickRemove(index) {
            this.state.splice(index, 1);
        },
    },
};
</script>

<style lang="scss" module>
@import "./../assets/styles/productItem.module.scss";
</style>
