import { createStore } from "vuex";
import { createPinia } from "pinia";

export const vuexStore = createStore({
    state: {
        isLoading: false,
    },
    getters: {

    },
    mutations: {
        changeIsLoading(state, val) {
            state.isLoading = val;
        },
    },
    actions: {

    },
    modules: {},
});

export const piniaStore = createPinia();
