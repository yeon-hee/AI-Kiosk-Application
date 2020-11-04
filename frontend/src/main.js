import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from './store';
import 'vue-material/dist/vue-material.css'
import HNav from "./components/common/HNav";
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyB3WPR7CFDUysrvEuPYRvmY4jjDo23jNCo",
    authDomain: "mindslab-9eae1.firebaseapp.com",
    databaseURL: "https://mindslab-9eae1.firebaseio.com",
    projectId: "mindslab-9eae1",
    storageBucket: "mindslab-9eae1.appspot.com",
    messagingSenderId: "578095670090",
    appId: "1:578095670090:web:566601271ebba34a8d97b3",
    measurementId: "G-L7GXG2R35H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');

Vue.component("HNav", HNav);


