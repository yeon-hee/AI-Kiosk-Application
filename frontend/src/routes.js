import AddAccount from "./views/AddAccount.vue";
import Home from "./views/Home.vue";
import store from "./store";
import AdminPage from "./components/admin/Admin.vue";
import PlaceDetail from "./components/admin/PlaceDetail.vue";
import LogPage from "./views/LogPage.vue";
import UpdateAccount from "./views/UpdateAccount.vue";

export default [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/adminMenu/detail/:id',
        name : 'PlaceDetail',
        component : PlaceDetail
    },
    {
        path : '/logMenu',
        name : 'LogPage',
        component : LogPage
    },
    {
        path : '/adminMenu',
        name : 'AdminPage',
        component : AdminPage
    },
    {
        path : '/addAccount/:id',
        name : 'AddAccount',
        component : AddAccount
    },
    {
        path : '/updateAccount/:user_id/:place_id',
        name : 'UpdateAccount',
        component : UpdateAccount
    },
    {
        path: "/logout",
        name: "logout",
        beforeEnter(to, from, next) {
            store.commit("logout");
            store.state.isAdmin = false;
            alert("로그아웃 되었습니다.");
            next("/");
        },
    },
]

