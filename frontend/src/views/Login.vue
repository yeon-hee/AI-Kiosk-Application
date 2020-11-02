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
            </v-card-actions>
        </v-container>
    </v-card>

</template>

<script>
import {login} from "../api/user.js";
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
    methods: {
        login() {
            const scope = this;
            login(
                this.user.email,
                this.user.password,
                function(success){
                    console.log(success);
                    scope.$store.commit("setIsSigned", true);
                    scope.$store.commit("setUserEmail", success.data.email);
                    if(success.data.authority==1){ // 관리자일 경우
                        scope.$store.commit("setIsAdmin", true);
                    }
                    location.reload(); // 창 닫기
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
