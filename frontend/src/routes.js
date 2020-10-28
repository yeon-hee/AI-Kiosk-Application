import SaveFace from "./views/SaveFace.vue";
import Home from "./views/Home.vue";
import store from "./store";
import AdminPage from "./components/admin/Admin.vue";

export default [
    {
        path : '/',
        name : 'Home',
        component : Home
    },
    {
        path : '/adminMenu',
        name : 'AdminPage',
        component : AdminPage
    },
    {
        path : '/home',
        name : 'SaveFace',
        component : SaveFace
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

