import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from './store';
import 'vue-material/dist/vue-material.css'
import HNav from "./components/common/HNav";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

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


