<template>
    <div>
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:9px;">business</v-icon>
                <span id="detail">지점 상세</span>
                
                <v-btn depressed color="error" id="deletebtn" @click.stop="dialog = true">지점 삭제</v-btn>
                <v-btn depressed color="info" id="modifybtn" @click.stop="editPlace = true">지점 수정</v-btn>
                <div style="clear: both;"></div>
            </div>
            <v-divider style="margin-top:0px;"></v-divider><br><br>

            <div class="detailbox">
                <div class="placeDetail">
                    <span id="detail1">{{place.name}}</span><br>
                    <v-icon size="13">call</v-icon>
                    <span id="detail2">{{place.phone}}</span><br>
                    <span id="detail3">{{place.address}}</span>
                </div>
                <div style="float: right;">
                    <img id="map" src="../../../public/images/defaultmap.jpg"> 
                </div>
            </div><br><br>

            <div>
                <v-icon style="margin-bottom:9px;">business</v-icon>
                <span id="detail">직원 관리</span>
                <span id="total">Total : {{totalSize}}</span>
                <button style="float:right; margin-bottom:10px; " @click="addAccount">
                    <v-icon>add_circle_outline</v-icon>
                </button>
            </div>
            <div style="clear: both;"></div>
            <v-divider style="margin-top:0px;"></v-divider><br><br>

            <div v-for="(user, index) in users" :key="user.email">
                <div class="box">
                        <!-- 이미지 위치-->
                        <img :src="user.photo" id="userFace"> 
                        <div style="float: left; margin-left: 12px;">
                            <span id="name">{{user.name}}</span>
                            <span id="authority" v-if="user.authority == 2">매니저</span>
                            <span id="authority" v-if="user.authority == 3">회원</span><br>
                            <span id="address">{{user.email}}</span>
                            <span id="phone">{{user.phone}}</span>
                        </div>
                        <div style="float: right; margin: 10px 8px 0 0;">
                            <button @click="clickUpdate(user)"><v-icon size="20" style="margin-right: 6px;" color="rgb(255,193,7)">create</v-icon></button>
                            <button @click="clickDelete(index)"><v-icon size="20" color="rgb(192,0,0)">delete</v-icon></button>
                        </div>
                </div>
            </div>

            <v-dialog v-model="accountDelete" max-width="290">
                <v-card>
                   <br><br>
                    <v-card-text>
                        정말로 삭제 하시겠습니까?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="deleteAccount">네</v-btn>
                        <v-btn color="error" text @click="accountDelete = false">아니요</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" max-width="290">
                <v-card>
                   <br><br>
                    <v-card-text>
                        정말로 삭제 하시겠습니까?
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="deletePlace">네</v-btn>
                        <v-btn color="green darken-1" text @click="dialog = false">아니요</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="editPlace" max-width="500" min-width="300">
                <EditPlace></EditPlace>
            </v-dialog>
            
        </div>
    </div>

</template>

<script>

function conf(){
  var result = confirm("확인을 눌러주세요");
    if(result){
    alert("확인완료");
    }else{
    alert("취소되었습니다.");
    }
}

import HNav from "../../components/common/HNav";
import EditPlace from "../../views/EditPlace";
import {getPlace} from '../../api/place.js';
import {deletePlace} from '../../api/place.js';
import {getAccountList} from '../../api/user.js';
import {getPlaceAccount} from '../../api/user.js';
import {deleteUser} from '../../api/user.js';
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
    data() {
        return {
            accountDelete: false,
            dialog: false,
            editPlace: false,
            totalSize: 0,
            id : this.$route.params.id,
            place: [],
            users: [],
            deleteIndex: "",
        };
    },
    components: {
        HNav,
        EditPlace
    },
    created(){
        const vm = this;
        getPlace(
            this.id,
            function(success){
                console.log('지점 상세 조회 성공');
                vm.place = success.data;
                vm.$store.commit("setplaceId", vm.id);
            },
            function(fail){
                console.log('지점 상세 조회 실패');
            }
        ),

        getPlaceAccount(
            this.id,
            function(success){
                console.log(success);
                for(var i=0; i<success.data.length; i++){
                    if(success.data[i].authority == 1) continue;
                    vm.users.push(success.data[i]);
                    vm.totalSize++;
                }
                console.log('회원 전체 조회 성공');
            },
            function(fail){
                console.log('회원 전체 조회 실패');
            }
        )
    },
    methods: {
        deletePlace() {
            const vm = this;
            this.dialog = false;
            deletePlace(
                this.id,
                function(success){
                    console.log('지점 삭제 성공');
                    alert('정상적으로 삭제되었습니다.');
                    vm.$router.push("/adminMenu");
                },
                function(fail){
                    console.log('지점 삭제 실패');
                }
            )
        },
        addAccount() {
            var id = this.id;
            this.$router.push("/addAccount/"+id);
        },
        clickDelete(index){
            this.accountDelete = true;
            this.deleteIndex = index;
        },
        deleteAccount() { // 회원 삭제
            var email = this.users[this.deleteIndex].email;
            deleteUser(
                email,
                function(success){
                    console.log('회원 삭제 성공');
                    firebase.storage().ref("photos/"+email).delete(); // 파이어베이스에서 사진 삭제
                    alert('정상적으로 삭제되었습니다.');
                    location.reload();
                },
                function(fail){
                    console.log('회원 삭제 실패');
                }
            )

        },
        clickUpdate(user) { // 회원 정보 수정
            var user_id = user.id;
            var place_id = this.id;
            this.$router.push("/updateAccount/"+user_id+"/"+place_id);
        }
       
    },
};
</script>

<style scoped>
#placeList{
    text-align:left; 
    width:80%; 
    margin:auto; 
    margin-top:80px;
}
#userFace {
    float: left;
    width: 50px; 
    height: 44px;
    margin-left: 6px;
    border-radius: 70%;
    object-fit: cover;
}
#authority {
    font-size: 10px;    
    color: rgb(210,210,210);
    margin-left: 13px;
}
#phone {
    font-size: 11px;    
    color: rgb(180,180,180);
    margin-left: 13px;
}
#detail {
    font-size:18px; 
    margin-left: 10px;
}
#deletebtn {
    float: right;
    margin-bottom: 5px;
    width: 18px;
    height: 33px;
    font-size: 13px;
    border-radius: 27px;
}
#modifybtn{
    float: right;
    margin: 0 6px 5px 0;
    width: 18px;
    height: 33px;
    font-size: 13px;
    border-radius: 27px;
}
.detailbox {
    height: 150px;
    width:80%; 
    border: 1.5px solid rgb(210,210,210);
    border-radius: 23px;
    padding: 12px 10px 10px 10px;
    margin:auto; 
}
.placeDetail {
    padding: 20px 0 0 12px;
    line-height: 28px;
    float: left;
}
#detail1 {
    font-size: 16px;
}
#detail2 {
    font-size: 11px;
    color: rgb(180,180,180);
    padding-left: 3px;
}
#detail3 {
    font-size: 12px;
    color: rgb(180,180,180);
}
#map {
    height: 100px;
    margin: 11px 15px 0 0;
}
#total{
    margin-left :12px;
    font-size: 5px;
    color: rgb(180,180,180);
}
.box {
    height: 70px;
    width:80%; 
    border: 1px solid rgb(225,225,225);
    border-radius: 23px;
    padding: 12px 10px 10px 10px;
    margin:auto; 
    margin-bottom: 15px;
}
</style>
