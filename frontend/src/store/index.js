import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';

const persistor = new VuexPersistence({
    key: 'root',
    storage: window.localStoarge
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isSigned: false, // 로그인 여부
        isAdmin: false, // 관리자 여부
        user: {
            email: "", // 사용자 이메일 저장
            name: "",
            id: "" // 사용자 아이디
        },
        placeId: 0
    },
    mutations: {
        setplaceId(state, placeId) {
            state.placeId = placeId;
        },
        setIsSigned(state, isSigned) {
            state.isSigned = isSigned;
        },
        setIsAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;
        },
        setUserEmail(state, email) {
            state.user.email = email;
        },
        setUserName(state, name) {
            state.user.name = name;
        },
        setUserId(state, id) {
            state.user.id = id;
        },
        logout(state) {
            state.isSigned = false;
            state.user.email = "";
        },
    },
    actions: {},
    modules: {
    },
    plugins: [persistor.plugin]
});
