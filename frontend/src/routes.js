import AddAccount from "./views/AddAccount.vue";
import Home from "./views/home.vue";
import store from "./store";
import AdminPage from "./components/admin/Admin.vue";
import PlaceDetail from "./components/admin/PlaceDetail.vue";

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

