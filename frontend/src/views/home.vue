<template>
    <div>
        <div>
            <video ref="video" id="video" width="640" height="480" autoplay></video>
        </div><br>
        <div>
            <input type="text" v-model="name" size="20" placeholder="이메일을 입력하세요">
        </div><br>
        <div>
            <button id="snap" v-on:click="capture()">캡처</button>
            <button id="snap" v-on:click="save()">저장</button>
            <button id="snap" v-on:click="recognize()">인식</button>
        </div>
        <!-- <button v-on:click="getList()">Get List</button> -->
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
        <ul>
            <li v-for="c in captures">
                <img v-bind:src="c" height="50" />
            </li>
        </ul>
    </div>
</template>

<script>

import {saveFace} from "../api/face.js";
import {getFaceList} from "../api/face.js";
import {recogFace} from "../api/face.js";
import {API_ID} from "../config/index.js";
import {API_KEY} from "../config/index.js";

export default {
    name: "app",
    data() {
        return {
            imageFile: {},
            name: "",
            fileName: "",
            video: {},
            canvas: {},
            captures: []
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
    methods: {
        capture() {
            console.log("cap");
            this.canvas = this.$refs.canvas;
            var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
            this.captures.push(canvas.toDataURL("image/png"));
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
#app {
    text-align: center;
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
