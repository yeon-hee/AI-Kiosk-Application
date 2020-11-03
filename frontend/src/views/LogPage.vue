<template>
    <div>
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:9px;">login</v-icon>
                <span id="detail">출입기록 조회</span>
            </div>
            <v-divider></v-divider><br><br>

            <div class="logbox">
                <div class="logDetail">
                    <v-row align="center" style="height: 60px;">
                        <v-col cols="2"></v-col>
                        <v-col cols="2">지점</v-col>
                        <v-col cols="6">
                            <v-select :items="places" label="지점 선택" single-line></v-select>
                        </v-col>
                        <v-col cols="2"></v-col>
                    </v-row>
                    <v-row align="center" style="height: 60px; margin-top: 30px;">
                        <v-col cols="2"></v-col>
                        <v-col cols="2" style="padding-bottom:0px;">기간</v-col>
                        <v-col cols="6" style="padding-bottom:0px;">
                            <input type="date" id="startDate" v-model="startDate"> ~
                            <input type="date" id="endDate" v-model="endDate">
                        </v-col>
                        <v-col cols="2"></v-col>
                    </v-row>
                    <v-row align="center" style="padding:0px;">
                        <v-col cols="4"></v-col>
                        <v-col cols="8" style="padding:0px 0px 0px 12px;">
                            <input type="text" disabled id="notice">
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="2"></v-col>
                        <v-col cols="2">이름</v-col>
                        <v-col cols="6">
                            <div class="namebox">
                                <input type="text" id="nameSearch" v-model="searchName">
                            </div>
                        </v-col>
                        <v-col cols="2"></v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col cols="5"></v-col>
                        <v-col cols="2" style="text-align: center; margin-top:10px;">
                            <v-btn color="primary" @click="submitForm" id="submit">제출</v-btn>
                        </v-col>
                        <v-col cols="5"></v-col>
                    </v-row>
                </div>
               
            </div><br><br>
        </div>
    </div>
</template>

<script>

import HNav from "../components/common/HNav";
import {getPlaceList} from "../api/place.js";

export default {
    name: "app",
    data() {
        return {
            places: [],
            select: "",
            startDate: "",
            endDate: "",
            searchName: ""
        };
    },
    components: {
        HNav
    },
    mounted() {
        
    },
    created() {
        const vm = this;

        getPlaceList(
            function(success){
                console.log(success);
                for(var i=0;i<success.data.length;i++){
                    vm.places.push(success.data[i].name);
                }
                console.log(vm.places);
            },
            function(fail){

            },
        )
    },
    methods: {
        submitForm() {
        
            if(this.startDate != "" && this.endDate == ""){
                document.getElementById("notice").value = '종료 날짜를 채워주세요.';
            }
            else if(this.startDate == "" && this.endDate != ""){
                document.getElementById("notice").value = '시작 날짜를 채워주세요.';
            }
            else if(this.startDate > this.endDate){
                document.getElementById("notice").value = '기간을 다시 설정해주세요.';
            }
            else {
                document.getElementById("notice").value = '';
            }

            // 찾기 - 날짜 , 이름 
            
   
        }

    },
};
</script>

<style>
#notice {
    font-family: sans-serif;
    color: red;
    width: 210px;
}
#submit {
    border-radius: 20px;
}
#startDate {
    border: 1px solid rgb(210,210,210);
    border-radius: 5px;
    height: 25px;
    font-family: sans-serif;
    font-size: 15px;
    margin-right: 10px;
    padding-left: 5px;
}
#endDate {
    border: 1px solid rgb(210,210,210);
    border-radius: 5px;
    height: 25px;
    font-family: sans-serif;
    font-size: 15px;
    margin-left: 10px;
    padding-left: 5px;
}
#nameSearch {
    font-family: sans-serif;
    margin-left: 10px;
    outline:none;
    width: 86%;
    float: left;
}
.logbox {
    height: 330px;
    width:80%; 
    border: 2px solid rgb(210,210,210);
    border-radius: 33px;
    padding: 12px 10px 10px 0px;
    margin:auto; 
}
.namebox {
    height: 29px;
    width:95%; 
    border: 1.5px solid rgb(210,210,210);
    border-radius: 23px;
    margin:auto; 
    float: left;
}
.logDetail {
    line-height: 28px;
    font-size: 16px;
    color: rgb(150,150,150);
}
</style>
