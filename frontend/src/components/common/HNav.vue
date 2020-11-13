<template>
    <v-card tile>
        <v-app-bar app hide-on-scroll flat style="background-color:rgb(170,145,251);">
            <v-toolbar-title id="header1">
                <router-link class="navbar-brand font rounded-lg" to="/" id="title">
                    <img src="../../../public/images/logo.png" id="logo"/>
                </router-link>
            </v-toolbar-title>
            <v-toolbar-title id="header2">
                <router-link id="link-to-home" @click.native="home" v-if="path == ''" to="/" style="color:rgb(83,71,122);">HOME</router-link>
                <router-link id="link-to-home" @click.native="home" to="/" v-else style="color:white;">HOME</router-link>
                <router-link id="link-to-entrance" @click.native="log" v-if="path == 'logMenu'" to="/logMenu" style="color:rgb(83,71,122);">출입기록조회</router-link>
                <router-link id="link-to-entrance" @click.native="log" v-else to="/logMenu" style="color:white;">출입기록조회</router-link>
                <router-link id="link-to-admin" @click.native="admin" to="/adminMenu" v-if="$store.state.isAdmin && path == 'adminMenu'" style="color:rgb(83,71,122);">관리자메뉴</router-link>
                <router-link id="link-to-admin" @click.native="admin" to="/adminMenu" v-else-if="$store.state.isAdmin" style="color:white;">관리자메뉴</router-link>
                <router-link id="link-to-board" @click.native="board" v-if="path == 'boardMenu'" to="/boardMenu" style="color:rgb(83,71,122);">공지사항</router-link>
                <router-link id="link-to-board" @click.native="board" v-else to="/boardMenu" style="color:white;">공지사항</router-link>
                <router-link id="link-to-edit" > </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title id="header2">
                <a id="link-to-login"
                v-if="!$store.state.isSigned"
                    @click.stop="signup = true">로그인</a>
                <span id="login-user" v-if="$store.state.isSigned">{{userName}}님</span>
                <router-link id="link-to-edit" to="/edit" @click.native="edit" v-if="!$store.state.isAdmin && $store.state.isSigned">회원정보수정</router-link>
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
            },
            userName: this.$store.state.user.name,
            path: "",
        };
    },
    components: {
        Login
    },
    created() {
        this.path = this.$route.path.split("/")[1];
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

#link-to-home{
    font-size:18px;
    margin: 0 10px 0 20px;
    text-align: left;
    text-decoration:none;
    margin-left:10px;
}

#link-to-entrance, #link-to-admin, #link-to-board, #link-to-signup, #link-to-login, #link-to-logout, #link-to-edit{
    color: white;
    font-size:18px;
    margin: 0 10px;
    text-align: left;
    text-decoration:none;
}

#login-user{
    color: white;
    font-size:18px;
    margin: 0 10px;
    text-align: left;
    text-decoration:none;
}

#logo{
    width: 100px;
}

.v-toolbar__content {
    margin: auto;
}

.v-toolbar__content {
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 960px) {
  .v-toolbar__content {
    max-width: 900px;
  }
}
@media (min-width: 1264px) {
  .v-toolbar__content {
    max-width: 1185px;
  }
}
@media (min-width: 1904px) {
  .v-toolbar__content {
    max-width: 1785px;
  }
}
.v-toolbar__content--fluid {
  max-width: 100%;
}
</style>
