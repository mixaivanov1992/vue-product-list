<template>
    <div :class="$style.newProduct">
        <div :class="$style.header">Добавление товара</div>
        <div :class="$style.content">
            <div :class="$style.name">
                <label for="newProductName">Наименование товара</label>
                <span :class="$style.required"></span>
                <input
                    id="newProductName"
                    type="text"
                    name="name"
                    placeholder="Введите наименование товара"
                    v-model="field.name.value"
                    @focusout="focusoutInput"
                    @input="inputName"
                />
                <span class="warning-text" v-if="field.name.warning"
                    >Поле является обязательным</span
                >
            </div>
            <div :class="$style.description">
                <label for="newProductDescription">Описание товара</label>
                <textarea
                    id="newProductDescription"
                    placeholder="Введите описание товара"
                    v-model="field.description.value"
                />
            </div>
            <div :class="$style.link">
                <label for="newProductLink">Ссылка на изображение товара</label>
                <span :class="$style.required"></span>
                <input
                    id="newProductLink"
                    type="text"
                    name="link"
                    placeholder="Введите ссылку"
                    v-model="field.link.value"
                    @focusout="focusoutInput"
                    @input="inputLink"
                />
                <span class="warning-text" v-if="field.name.warning"
                    >Поле является обязательным</span
                >
            </div>
            <div :class="$style.price">
                <label for="newProductPrice">Цена товара</label>
                <span :class="$style.required"></span>
                <input
                    id="newProductPrice"
                    type="text"
                    name="price"
                    placeholder="Введите цену"
                    :value="field.price.value"
                    @focusout="focusoutInput"
                    @input="inputPrice"
                />
                <span class="warning-text" v-if="field.name.warning"
                    >Поле является обязательным</span
                >
            </div>
            <div :class="$style.add">
                <button
                    type="button"
                    :disabled="isButtonDisabled"
                    @click="clickAdd"
                >
                    Добавить товар
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useState } from "../store/index";
import { uuid } from "vue-uuid";
export default {
    name: "NewProduct",
    props: { sortProducts: Function },
    setup() {
        return { products: useState().products };
    },
    data() {
        return {
            field: {
                name: {
                    value: "",
                    warning: false,
                },
                link: {
                    value: "",
                    warning: false,
                },
                price: {
                    value: "",
                    warning: false,
                },
                description: {
                    value: "",
                },
            },
            isButtonDisabled: true,
        };
    },
    methods: {
        focusoutInput(event) {
            const target = event.target;
            if (!this.field[target.name].value) {
                this.field[target.name].warning = true;
                target.classList.add("warning-border");
            } else {
                this.field[target.name].warning = false;
                target.classList.remove("warning-border");
            }
        },
        inputName() {
            this.onOffButton();
        },
        inputLink() {
            this.onOffButton();
        },
        inputPrice(event) {
            let value = event.target.value.toString().replace(/ /g, "");
            if (new RegExp("^[0-9]+$").test(value) || value === "") {
                let parts = value.split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                this.field.price.value = parts.join(".");
            } else {
                event.target.value = this.field.price.value;
            }
            this.onOffButton();
        },
        onOffButton() {
            if (
                this.field.name.value &&
                this.field.link.value &&
                this.field.price.value
            ) {
                this.isButtonDisabled = false;
            } else {
                this.isButtonDisabled = true;
            }
        },
        clickAdd() {
            const { name, link, price, description } = this.field;

            if (name.value && link.value && price.value) {
                this.products.push({
                    name: name.value,
                    link: link.value,
                    price: price.value,
                    description: description.value,
                    uuid: uuid.v4(),
                });
                name.value = "";
                link.value = "";
                price.value = "";
                description.value = "";
                this.isButtonDisabled = true;
                this.sortProducts();
            }
        },
    },
};
</script>

<style lang="scss" module>
@import "./../assets/styles/newProduct.module.scss";
</style>
