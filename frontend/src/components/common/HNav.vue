<template>
    <v-card tile>
        <v-app-bar app hide-on-scroll flat style="background-color:rgb(170,145,251);">
            <v-toolbar-title id="header1">
                <router-link class="navbar-brand font rounded-lg" to="/" id="title">
                    <img src="../../../public/images/logo.png" id="logo"/>
                </router-link>
            </v-toolbar-title>
            <v-toolbar-title id="header2">
                <router-link id="link-to-home" to="/" @click="home">HOME</router-link>
                <router-link id="link-to-entrance" to="/sell">출입기록조회</router-link>
                <router-link id="link-to-admin" to="/adminMenu" v-if="$store.state.isAdmin">관리자메뉴</router-link>
                <router-link id="link-to-board" to="/logout">공지사항</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title id="header2">
                <a id="link-to-login"
                v-if="!$store.state.isSigned"
                    @click.stop="signup = true">로그인</a>
                <router-link id="link-to-logout" to="/logout" v-if="$store.state.isSigned">로그아웃</router-link>
            </v-toolbar-title>

            <v-dialog v-model="signup" max-width="500" min-width="300">
                <Login></Login>
            </v-dialog>
        </v-app-bar>
    </v-card>
</template>

<script>
import Login from "../../views/Login";

export default {
    name: "app",
    data() {
        return {
            signin: false,
            signup: false,
            status: false,
            windowSize: {
                x: 0,
                y: 0
            }
        };
    },
    components: {
        Login
    },
    created() {

    },
    methods: {
        home() {
            console.log('아녕');
            alert('안녕하세요');
        }

    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

*{
    font-family: 'Jua', sans-serif;
}

#link-to-home{
    font-size:18px;
    margin: 0 10px 0 20px;
    text-align: left;
    text-decoration:none;
    margin-left:20px;
}

#link-to-entrance, #link-to-admin, #link-to-board, #link-to-signup, #link-to-login, #link-to-logout{
    color: white;
    font-size:18px;
    margin: 0 10px;
    text-align: left;
    text-decoration:none;
}

#logo{
    width: 100px;
}
</style>
