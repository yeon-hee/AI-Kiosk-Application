<template>
    <div>
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:9px;">person</v-icon>
                <span id="detail">직원 등록</span>
            </div>
            <v-divider></v-divider><br><br>
            <div class="form">
                <v-row>
                    <v-col cols="6">
                        <v-card style="padding: 17px;">
                            <video ref="video" id="video" width="100%;" height="500px;" autoplay></video>
                            <div id="button">
                                <v-btn id="snap" style="margin-right:5px;" color="error" v-on:click="capture()">캡처</v-btn>
                                <!-- <v-btn id="snap" color="error" v-on:click="save()">저장</v-btn> -->
                                <!-- <button id="snap" v-on:click="recognize()">인식</button> -->
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card style="padding: 17px;">
                            <div style="margin-bottom: 17px;">
                                <img src="../../public/images/defaultUser.png" v-if="isImage == false" style="height:120px;">
                                <img v-bind:src="userImage" v-else style="height:120px; width:120px;">
                            </div>
                            <v-text-field label="이름" v-model="user.name"></v-text-field>
                            <v-text-field label="이메일" v-model="user.email"></v-text-field>
                            <v-text-field label="연락처" v-model="user.phone"></v-text-field>
                            <v-radio-group v-model="row" row>
                                <v-radio label="회원" :value="3"></v-radio>
                                <v-radio label="매니저" :value="2"></v-radio>
                            </v-radio-group>
                            <div style="clear: both;"></div>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="addAccount">추가</v-btn>
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

export default {
    name: "app",
    data() {
        return {
            imageFile: {},
            name: "",
            fileName: "",
            video: {},
            canvas: [],
            captures: [],
            row: 3,
            account: "user",
            isImage: false,
            userImage: [],
            user: {
                email: "",
                name: "",
                phone: "",
                authority: "",
                photo: "",
                place: {
                    address: "",
                    id: this.$route.params.id,
                    name: "",
                    phone: ""
                }
            },
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
    components: {
        HNav
    },
    methods: {
        addAccount() { // 회원 추가
            const vm = this;
            this.user.authority = this.row; 
            this.user.photo = this.userImage; // 사진 저장
            // face recognition - set
            let formData = new FormData();
            formData.append("apiId",API_ID);
            formData.append("apiKey",API_KEY);
            formData.append("faceId",this.user.email); // 이메일
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

            addUser(
                this.user.email,
                this.user.name,
                this.user.phone,
                this.user.authority,
                this.user.photo,
                this.user.place,
                function(success){
                    console.log('회원 추가 성공');
                    alert('회원이 등록되었습니다.');
                    this.$router.push("/adminMenu/detail/" + this.$route.params.id);
                },
                function(fail){
                    console.log('회원 추가 실패');
                }
            )
        },
        capture() {
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
