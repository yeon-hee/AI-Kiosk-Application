<template>
    <div>
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon size="20" style="margin-bottom: 9px;">create</v-icon>
                <span id="detail">회원정보 수정</span>
            </div>
            <v-divider style="margin-top:5px;"></v-divider><br><br>

            <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="10">
                    <v-card style="padding: 16px;">
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-text-field
                            v-model="user.name" 
                            :placeholder="oldUser.name"
                            :counter="10"
                            :rules="nameRules"
                            label="이름"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="oldUser.email"
                            :rules="emailRules"
                            label="이메일"
                            disabled
                            ></v-text-field>

                            <v-text-field
                            type="password"
                            label="기존 비밀번호"
                            v-model="Password"
                            required
                            :rules="passwordRules"
                            ></v-text-field>

                            <v-text-field
                            type="password"
                            label="비밀번호"
                            v-model="user.password"
                            required
                            :rules="passwordRules"
                            ></v-text-field>

                            <v-text-field
                            type="password"
                            label="비밀번호 확인"
                            v-model="checkPassword"
                            required
                            :rules="checkPasswordRules"
                            ></v-text-field>

                            <v-btn
                            color="success"
                            @click="change"
                            >
                            변경
                            </v-btn>
                        </v-form>
                    </v-card>
                </v-col>
                <v-col cols="1"></v-col>
            </v-row>
    
        </div>
    </div>
</template>

<script>

import HNav from "../components/common/HNav";
import {getAccountById} from "../api/user.js";
import {updatePw} from "../api/user.js";

export default {
    name: "app",
    data() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
            userId: this.$route.params.id,
            oldUser: {
                email: "",
                name: "",
                password: "",
            },
            user: {
                email: "",
                name: "",
                password: "",
            },
            passwordRules: [
                v => !!v || 'password is required',
            ],
            checkPasswordRules: [
                v => !!v || 'check password is required',
                v => this.user.password === this.checkPassword || 'password is different'
            ],
            checkPassword: "",
            Password: ""
        };
    },
    components: {
        HNav
    },
    mounted() {
        
    },
    created() {
        const vm = this;

        getAccountById(
            this.userId,
            function(success){
                vm.oldUser.email = success.data.email;
                vm.oldUser.name = success.data.name;
                vm.oldUser.password = success.data.password;
                console.log(vm.oldUser);
            },
            function(fail){
                console.log('회원 정보 가져오기 실패');
            }
        )
    },
    methods: {
        change () {
            if(this.Password != this.oldUser.password){
                alert('비밀번호를 잘못 입력하셨습니다.');
            }
            else { // 회원 정보 변경
                const vm = this;
                console.log(typeof(vm.user.name));
                console.log(typeof(vm.oldUser.email));
                console.log(typeof(vm.user.password));
                updatePw(
                    vm.user.name,
                    vm.oldUser.email,
                    vm.user.password,
                    function(success){
                        console.log('비밀번호 변경 성공');
                        alert('변경되었습니다.');
                        vm.$router.push("/");
                    },
                    function(fail) {
                        console.dir(fail);
                        console.log('비밀번호 변경 실패');
                    }
                )
            }
        }
    },
};
</script>

<style>

</style>
