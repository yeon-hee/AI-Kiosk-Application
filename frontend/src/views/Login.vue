<template>
    <v-card>
        <v-container>
            <v-card-title class="headline" id="head">로그인</v-card-title>
            <v-text-field
                label="이메일"
                v-model="user.email"
            ></v-text-field>
            <v-text-field
                label="비밀번호"
                v-model="user.password"
                type="password"
            ></v-text-field>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="login" min-width="50px">
                    로그인
                </v-btn>
                <v-btn text @click.stop="signup = true" min-width="50px">
                    회원가입
                </v-btn>
                <v-dialog v-model="signup" max-width="500">
                    <Signup></Signup>
                </v-dialog>
            </v-card-actions>
        </v-container>
    </v-card>

</template>

<script>
import {login} from "../api/user.js";
import Signup from "../views/Signup";
import '@mdi/font/css/materialdesignicons.css';
export default {
    data() {
        return {
            signup: false,
            user: {
                email: "",
                password: ""
            }
        };
    },
    components: {
        Signup
    },
    methods: {
        login() {
            const scope = this;

            login(
                this.user.email,
                this.user.password,
                function(success){
                    scope.$store.commit("setIsSigned", true);
                    scope.$store.commit("setUserId", response.data.email);
                    // 창 닫기
                    location.reload();
                },
                function(fail){
                    alert("유저 이메일 혹은 비밀번호가 일치하지 않습니다.");
                },
            )

         
        }
    }
};
</script>

<style>
#head{
    padding: 16px 0 20px 0;
}

</style>
