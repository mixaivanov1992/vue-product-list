import { reactive, provide, inject } from 'vue';
export const stateSymbol = Symbol('state');
export const createState = () => reactive({
    products: [],
    sort: 'priceMin'
});

export const useState = () => inject(stateSymbol);
export const provideState = () => provide(
    stateSymbol, 
    createState()
);