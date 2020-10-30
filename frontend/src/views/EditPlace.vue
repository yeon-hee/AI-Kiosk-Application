<template>
    <v-card>
        <v-container>
            <v-card-title class="headline" id="head">지점 수정</v-card-title>
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
                <v-btn color="red lighten-2" dark text @click="editplace" min-width="50px">
                    수정
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>

</template>

<script>
import {addplace} from "../api/place.js";
import PlaceDetail from "../components/admin/PlaceDetail.vue";
import {getPlace} from '../api/place.js';
import {editPlace} from '../api/place.js';

export default {
    data() {
        return {
            signup: false,
            id: this.$store.state.placeId,
            newplace: {
                name: "",
                address: "",
                phone: ""
            },
            place: []
        };
    },
    created(){
        const vm = this;
        getPlace(
            this.id,
            function(success){
                console.log('지점 상세 조회 성공');
                vm.place = success.data;
                console.log(vm.place.name);
            },
            function(fail){
                console.log('지점 상세 조회 실패');
            }
        )
    },
    methods: {
        editplace() { // 지점 수정
            const vm = this;
            console.log(this.place.id);
            editPlace(
                this.place.id,
                this.place.name,
                this.place.address,
                this.place.phone,
                function(success){
                    console.log('지점 수정 성공');
                    alert('수정이 완료되었습니다.');
                    location.reload();
                },
                function(fail){
                    console.log('지점 수정 실패');
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
