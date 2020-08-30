import Vue from 'vue'
import VueApp from './ABCApp.vue'
import {App} from "./App";

import './VueFilters';

import "./index.scss";
import {ItemId} from "@/game/items/ItemId.ts";

Vue.config.productionTip = false

declare global {
    interface Window {
        App: App;
    }
}


/**
 * Start the application when all html elements are loaded.
 */
window.onload = function () {
    App.start();

    // Expose the App class to the window (and the console)
    // if (process.env.DEBUG && typeof window !== undefined) {

    console.log('Exposing App to console');
    window.App = App;
    // }


    console.log("Launched");

    new Vue({
        render: h => h(VueApp),
    }).$mount('#app')


};


