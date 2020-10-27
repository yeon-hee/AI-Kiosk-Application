<template>
    <v-card tile>
        <v-app-bar app hide-on-scroll flat style="background-color:rgb(170,145,251);">
            <v-toolbar-title id="header1">
                <router-link class="navbar-brand font rounded-lg" to="/" id="title" >WHO AM I</router-link>
            </v-toolbar-title>
            <v-toolbar-title id="header2">
                <router-link  style="color:rgb(83,71,122);" id="link-to-home" to="/">HOME</router-link>
                <router-link id="link-to-entrance" to="/sell">출입기록조회</router-link>
                <router-link id="link-to-admin" to="/mypage/profile">관리자메뉴</router-link>
                <router-link id="link-to-board" to="/logout">공지사항</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title id="header2">
                <a id="link-to-login"
                v-if="$store.state.isSigned"
                    @click.stop="signup = true">로그인</a>
                <a id="link-to-signup"
                    v-if="$store.state.isSigned"
                    @click.stop="signin = true">회원가입</a>
            </v-toolbar-title>

            <v-dialog v-model="signup" max-width="500" min-width="300">
                <Login></Login>
            </v-dialog>
            <v-dialog v-model="signin" max-width="500" min-width="300">
                <Signup></Signup>
            </v-dialog>

        </v-app-bar>
    </v-card>
</template>

<script>
import Login from "../../views/Login";
import Signup from "../../views/Signup";

export default {
    name: "app",
    data() {
        return {
            signin: false,
            signup: false,
            windowSize: {
                x: 0,
                y: 0
            }
        };
    },
    components: {
        Login,
        Signup
    },
    mounted() {
        
    },
    methods: {
        

    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');

*{
    font-family: 'Jua', sans-serif;
}
#link-to-home, #link-to-entrance, #link-to-admin, #link-to-board, #link-to-signup, #link-to-login{
    color: white;
    font-size:18px;
    margin: 0 10px;
    text-align: left;
    text-decoration:none;
}

</style>
