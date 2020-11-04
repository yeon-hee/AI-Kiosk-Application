<template>
    <div>
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:9px;">person</v-icon>
                <span id="detail">직원 정보 수정</span>
            </div>
            <v-divider></v-divider><br><br>
            <div class="form">
                <v-row>
                    <v-col cols="6">
                        <v-card style="padding: 17px;">
                            <video ref="video" id="video" width="100%;" height="500px;" autoplay></video>
                            <div id="button">
                                <v-btn id="snap" style="margin-right:5px;" color="error" v-on:click="capture()">캡처</v-btn>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card style="padding: 17px;">
                            <div style="margin-bottom: 17px;">
                                <img v-bind:src="userImage" style="height:120px; width:120px;">
                            </div>
                            <v-text-field label="이름" v-model="user.name" :placeholder="oldUser.name"></v-text-field>
                            <v-text-field label="이메일" disabled v-model="oldUser.email"></v-text-field>
                            <v-text-field label="연락처" v-model="user.phone" :placeholder="oldUser.phone"></v-text-field>
                            <v-radio-group v-model="row" row>
                                <v-radio label="회원" :value="3"></v-radio>
                                <v-radio label="매니저" :value="2"></v-radio>
                            </v-radio-group>
                            <div style="clear: both;"></div>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="updateAccount">수정</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
            </div>
        </div>
    </div>
</template>

<script>

import {saveFace} from "../api/face.js";
import {getFaceList} from "../api/face.js";
import {recogFace} from "../api/face.js";
import {addUser} from "../api/user.js";
import {API_ID} from "../config/index.js";
import {API_KEY} from "../config/index.js";
import HNav from "../components/common/HNav";
import firebase from 'firebase/app';
import {getAccountById} from "../api/user.js";
import {updateUser} from "../api/user.js";
import 'firebase/storage';

export default {
    name: "app",
    data() {
        return {
            userId: this.$route.params.user_id,
            placeId: this.$route.params.place_id,
            imageFile: {},
            name: "",
            fileName: "",
            video: {},
            canvas: [],
            captures: [],
            row: 0,
            account: "user",
            isImage: false,
            userImage: [],
            oldUser: {
                email: "",
                name: "",
                phone: "",
                authority: "",
                photo: "",
                place: {
                    address: "",
                    id: "",
                    name: "",
                    phone: ""
                }
            },
            user: {
                email: "",
                name: "",
                phone: "",
                authority: "",
                photo: "",
                place: {
                    address: "",
                    id: "",
                    name: "",
                    phone: ""
                }
            },
            uploadedImageUrl: "",
            captured: false,
        };
    },
    mounted() {
        this.video = this.$refs.video;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                this.video.srcObject = stream;
                this.video.play();
            });
        }
    },
    created() {
        const vm = this;

        getAccountById(
            this.userId,
            function(success){
                vm.oldUser = success.data;
                vm.row = vm.oldUser.authority;
                vm.userImage = vm.oldUser.photo;
                vm.user.email = vm.oldUser.email;
            },
            function(fail){

            }
        )

    },
    components: {
        HNav
    },
    methods: {
        updateAccount() { // 회원 변경
            const vm = this;
            this.user.authority = this.row; 
            this.user.photo = this.userImage; // 사진 저장

            if(this.captured == true){ // 캡쳐 했을 경우만
                // face recognition - set
                let formData = new FormData();
                formData.append("apiId",API_ID);
                formData.append("apiKey",API_KEY);
                formData.append("faceId",this.user.email); // 이메일
                formData.append("file",this.imageFile);
                var fileName = this.user.email;
                
                saveFace(
                    formData,
                    function(success) {
                        var Storage = firebase.storage().ref("photos/"+fileName).put(vm.imageFile)
                            .then((snapshot) => {
                                vm.savePhoto();
                            }); 
                    },
                    function(fail) {
                        console.log(fail);
                        console.log("얼굴 등록 실패");
                    }
                );
            }
            else {
                vm.updateUser();
            }
        },
        savePhoto() {
            const vm = this;
            var fileName = this.user.email;
            firebase.storage().ref("photos/"+fileName).getDownloadURL()
                .then((url) => {
                    vm.user.photo = url;
                    console.log('업데이트 완료');
                    vm.updateUser();
            })
        },
        updateUser() {
            const vm = this;

            updateUser(
                this.oldUser.email,
                this.user.name,
                this.user.phone,
                this.user.authority,
                this.user.photo, 
                this.user.place,
                function(success){
                    console.log('회원 변경 성공');
                    alert('회원이 변경되었습니다.');
                    vm.$router.push("/adminMenu/detail/" + vm.$route.params.place_id);
                },
                function(fail){
                    console.log('회원 변경 실패');
                }
            )
        },
        capture() {
            this.captured = true;
            this.isImage = true;
            this.canvas = this.$refs.canvas;
            var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
            this.captures.push(canvas.toDataURL("image/png"));
            this.userImage = this.captures[this.captures.length-1];
            var imgurl = canvas.toDataURL("image/png");
            var canvasBin = atob(imgurl.split(',')[1]);
            var array = [];
            for(var i = 0; i<canvasBin.length; i++){
                array.push(canvasBin.charCodeAt(i));
            }
            this.imageFile = new Blob([new Uint8Array(array)], {type: 'image/png'}); // Blob 생성
        },
        save() {
            // face recognition - set
            let formData = new FormData();
            formData.append("apiId",API_ID);
            formData.append("apiKey",API_KEY);
            formData.append("faceId",this.name);
            formData.append("file",this.imageFile);
            
            saveFace(
                formData,
                function(success) {
                    console.log(success);
                },
                function(fail) {
                    console.log(fail);
                    console.log("얼굴 등록 실패");
                }
            );
        },

        getList(){ // face recognition - get face list

            let formData = new FormData();
            formData.append("apiId",API_ID);
            formData.append("apiKey",API_KEY);

            getFaceList(
                formData,
                function(success){
                    console.log(success);
                },
                function(fail){
                    console.log(fail);
                    console.log('얼굴 리스트 가져오기 실패');
                },
            );
        },

        recognize(){ // face recognition - recognize

            let formData = new FormData();
            formData.append("apiId",API_ID);
            formData.append("apiKey",API_KEY);
            formData.append("file",this.imageFile);

            recogFace(
                formData,
                function(success){
                    console.log(success);
                },
                function(fail){
                    console.log(fail);
                    console.log('얼굴 등록 실패');
                },
            );
        }
    },
};
</script>

<style>
#button {
    text-align: center; 
    margin-top: 10px;
}
.add {
    text-align: center;
}
#app {
    /* text-align: center; */
    color: #2c3e50;
    margin-top: 60px;
}
#video {
    background-color: #000000;
}
#canvas {
    display: none;
}
li {
    display: inline;
    padding: 5px;
}
</style>
