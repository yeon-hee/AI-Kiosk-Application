import SaveFace from "./views/SaveFace.vue";
import Home from "./views/Home.vue";

export default [
    {
        path : '/',
        name : 'home',
        component : Home
    },
    {
        path : '/home',
        name : 'SaveFace',
        component : SaveFace
    },
]

