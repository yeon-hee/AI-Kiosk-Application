<template>
    <div>
        <h-nav></h-nav>

        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:8px;" size="20">assignment</v-icon>
                <span id="detail">글쓰기</span>
                <v-btn depressed color="info" id="create" @click="create">등록</v-btn>
            </div>
            <v-divider style="margin-top:7px;"></v-divider><br><br>
            <v-row>
               <v-col cols="1"></v-col>
                <v-col cols="1" style="font-size:15px;">제목</v-col>
                <v-col cols="9">
                    <input type="text" v-model="title" id="text" size="20" style="width:100%;">
                </v-col>
                <v-col cols="1"></v-col>
            </v-row>
            <v-row>
               <v-col cols="1"></v-col>
                <v-col cols="1" style="font-size:15px;">내용</v-col>
                <v-col cols="9">
                    <textarea id="content" v-model="content" rows="10" style="width:100%;"></textarea>
                </v-col>
                <v-col cols="1"></v-col>
            </v-row><br><br>
        </div>
    </div>
</template>

<script>

import HNav from "../components/common/HNav";
import {registBoard} from "../api/board.js";

export default {
    name: "app",
    data() {
        return {
            items: [],
            title: "",
            content: ""
        };
    },
    components: {
        HNav
    },
    created() {
        const vm = this;


    },
    mounted() {
    },
    methods: {
        create() { // 공지사항 글 쓰기
            const vm = this;

            console.log(this.title);
            console.log(this.content);
            if(this.title.length!=0 && this.content.length!=0) { // 모두 내용이 있을 때
                registBoard(
                    this.title,
                    this.content,
                    function(success){
                        console.log('공지사항 추가 성공');
                        alert('등록되었습니다.');
                        vm.$router.push("/boardMenu");
                    },
                    function(fail){
                        console.log('공지사항 추가 실패');
                    }
                )
            }
            else {
                alert("내용을 채워주세요");
            }
        }

    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

#placeList{
    text-align:left; 
    width:80%; 
    margin:auto; 
    margin-top:80px;
}

#create {
    float: right;
    width: 18px;
    height: 33px;
    font-size: 13px;
    border-radius: 27px;
}
.placeDetail {
    padding: 20px 0 0 12px;
    line-height: 28px;
    float: left;
}

#text {
    border: 1.5px solid rgb(188,188,188);
    height: 28px;
    font-family: sans-serif;
}
#content {
    border: 1.5px solid rgb(188,188,188);
    font-family: sans-serif;
}
</style>