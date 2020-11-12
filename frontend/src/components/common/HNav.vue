<template>
    <v-card tile>
        <v-app-bar app hide-on-scroll flat style="background-color:rgb(170,145,251);">
            <v-toolbar-title id="header1">
                <router-link class="navbar-brand font rounded-lg" to="/" id="title">
                    <img src="../../../public/images/logo.png" id="logo"/>
                </router-link>
            </v-toolbar-title>
            <v-toolbar-title id="header2">
                <router-link id="link-to-home" @click.native="home" to="/">HOME</router-link>
                <router-link id="link-to-entrance" @click.native="log" to="/logMenu" >출입기록조회</router-link>
                <router-link id="link-to-admin" @click.native="admin" to="/adminMenu" v-if="$store.state.isAdmin">관리자메뉴</router-link>
                <router-link id="link-to-board" @click.native="board" to="/boardMenu">공지사항</router-link>
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
        };
    },
    components: {
        Login
    },
    created() {
        console.log('안녕');
        console.log(this.userName);
        console.log(this.$store.state.user.id);

    },
    methods: {
        home() {
            document.getElementById("link-to-home").style.color = "rgb(83,71,122)";
            document.getElementById("link-to-entrance").style.color = "white";
            document.getElementById("link-to-admin").style.color = "white";
            document.getElementById("link-to-board").style.color = "white";
        },
        log() {
            document.getElementById("link-to-home").style.color = "white";
            document.getElementById("link-to-entrance").style.color = "rgb(83,71,122)";
            document.getElementById("link-to-admin").style.color = "white";
            document.getElementById("link-to-board").style.color = "white";
        },
        admin() {
            document.getElementById("link-to-home").style.color = "white";
            document.getElementById("link-to-entrance").style.color = "white";
            document.getElementById("link-to-admin").style.color = "rgb(83,71,122)";
            document.getElementById("link-to-board").style.color = "white";
        },
        board() {
            document.getElementById("link-to-home").style.color = "white";
            document.getElementById("link-to-entrance").style.color = "white";
            document.getElementById("link-to-admin").style.color = "white";
            document.getElementById("link-to-board").style.color = "rgb(83,71,122)";
        },
        edit() {
            var id = this.$store.state.user.id;
            this.$router.push("/edit/" + id);
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
    color:rgb(83,71,122);
}

#link-to-entrance, #link-to-admin, #link-to-board{
    color: white;

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
</style>
