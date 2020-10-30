<template>
    <v-card>
        <v-container>
            <v-card-title class="headline" id="head">지점 추가</v-card-title>
            <v-text-field
                label="이름"
                v-model="place.name"
            ></v-text-field>
            <v-text-field
                label="주소"
                v-model="place.address"
            ></v-text-field>
            <v-text-field
                label="전화번호"
                v-model="place.phone"
            ></v-text-field>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red lighten-2" dark text @click="addPlace" min-width="50px">
                    추가
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>

</template>

<script>
import {addplace} from "../api/place.js";

export default {
    data() {
        return {
            signup: false,
            place: {
                name: "",
                address: "",
                phone: ""
            }
        };
    },
    
    methods: {
        addPlace() { // 지점 추가
            const scope = this;
            addplace(
                this.place.name,
                this.place.address,
                this.place.phone,
                function(success){
                    alert('지점이 등록되었습니다.');
                    location.reload(); // 창 닫기
                },
                function(fail){
                    console.log('지점 등록 실패');
                }
            )
        }
    },
};
</script>

<style>
#head{
    padding: 16px 0 20px 0;
}

</style>
