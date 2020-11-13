<template>
    <div class="container">
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:9px;">login</v-icon>
                <span id="detail">출입기록 조회</span>
            </div>
            <v-divider style="margin-top:5px;"></v-divider><br><br>

            <div class="logbox">
                <div class="logDetail">
                    <v-row align="center" style="height: 60px;">
                        <v-col cols="2"></v-col>
                        <v-col cols="2">지점</v-col>
                        <v-col cols="6">
                            <v-select :items="places" label="지점 선택" single-line v-model="selectedPlace"></v-select>
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
                        <v-col cols="5"></v-col>
                        <v-col cols="2" style="text-align: center;">
                            <v-btn color="primary" @click="submitForm" id="submit">검색</v-btn>
                        </v-col>
                        <v-col cols="5"></v-col>
                    </v-row>
                </div>
               
            </div><br><br>

            <v-card>
                <v-card-title>출입 기록
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="logList" :search="search" class="elevation-1"></v-data-table>
            </v-card><br><br>
        </div>
    </div>
</template>

<script>

import HNav from "../components/common/HNav";
import {getPlaceList} from "../api/place.js";
import {getPlaceByAuth} from "../api/place.js";
import {getLogList} from "../api/log.js";
import {getLogPeriod} from "../api/log.js";
import {getAccountByEmail} from "../api/user.js";

export default {
    name: "app",
    data() {
        return {
            selectedPlace: {},
            places: [],
            select: "",
            startDate: "",
            endDate: "",
            searchName: "",
            logList: [], // 로그 들어있는 리스트
            search: '',
            headers: [
                {
                    text: '지점',
                    align: 'start',
                    sortable: false,
                    value: 'PlaceName',
                },
                { text: '이름', value: 'AccountName' },
                { text: '출입 시간', value: 'time' },
            ],
            LogData : {
                PlaceName: "", 
                AccountName: "", 
                time: ""
            },
            userEmail: this.$store.state.user.email, // 유저 이메일
            user: {},
        };
    },
    components: {
        HNav
    },
    mounted() {
        
    },
    created() {
        const vm = this;

        getAccountByEmail(
            this.userEmail,
            function(success){
                vm.user = success.data;
                var email = vm.user.email;
                var authority = vm.user.authority;
                getPlaceByAuth(
                    email,
                    authority,
                    function(success){
                        for(var i=0; i<success.data.length;i++){
                            console.log(success.data[i].name);
                            vm.places.push(success.data[i].name);  
                        }                      
                    },
                    function(fail){
                        console.log('지점 조회 실패');
                    },
                )
            },
            function(fail){

            }
        )

    },
    methods: {
        submitForm() {
            const vm = this;
            if(this.startDate != "" && this.endDate == ""){ // 하나가 빌 경우
                document.getElementById("notice").value = '종료 날짜를 채워주세요.';
            }
            else if(this.startDate == "" && this.endDate != ""){
                document.getElementById("notice").value = '시작 날짜를 채워주세요.';
            }
            else if(this.startDate > this.endDate){ // 기간 오류
                document.getElementById("notice").value = '기간을 다시 설정해주세요.';
            }
            else {
                document.getElementById("notice").value = '';
                if(this.startDate != "" && this.endDate != ""){ // 기간 조회
                    vm.logList= [];
                    getLogPeriod(
                        vm.user.email,
                        this.selectedPlace,
                        this.startDate,
                        this.endDate,
                        function(success){
                            console.log('기간으로 로그 조회 성공');
                            for(var i=0;i<success.data.length;i++){
                                var Data = {};
                                Data.PlaceName = success.data[i].placeName;
                                Data.AccountName = success.data[i].accountName;
                                var logTime = success.data[i].time.split("T")[0]; 
                                logTime += " ";
                                var string = success.data[i].time.split("T")[1];
                                logTime += string.split(":")[0];
                                logTime += ":";
                                logTime += string.split(":")[1];
                                Data.time = logTime;
                                vm.logList.push(Data);
                            }
                        },
                        function(fail){
                            console.log('기간으로 로그 조회 실패');
                        }
                    )
                }
                else { // 지점으로 조회
                    vm.logList= [];
                    getLogList(
                        vm.user.email,
                        this.selectedPlace,
                        function(success){
                            for(var i=0;i<success.data.length;i++){
                                var Data = {};
                                Data.PlaceName = success.data[i].placeName;
                                Data.AccountName = success.data[i].accountName;
                                var logTime = success.data[i].time.split("T")[0]; 
                                logTime += " ";
                                var string = success.data[i].time.split("T")[1];
                                logTime += string.split(":")[0];
                                logTime += ":";
                                logTime += string.split(":")[1];
                                Data.time = logTime;
                                vm.logList.push(Data);
                            }
                            console.log('로그 조회 성공');
                        },
                        function(fail){
                            console.log('로그 조회 실패');
                        }
                    )
                }
            }
        }

    },
};
</script>

<style>
#detail {
    font-size:20px; 
    margin-left: 10px;
}
#placeList{
    text-align:left; 
    margin:auto; 
    margin-top:80px;
}
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
    height: 270px;
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
