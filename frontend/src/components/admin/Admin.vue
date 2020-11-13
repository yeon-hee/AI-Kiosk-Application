<template>
    <div class="container">
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:9px;">business</v-icon>
                <span style="font-size:20px; margin:0 0 8px 10px;">지점 관리</span>
                <span id="total">Total : {{totalSize}}</span>
                <button style="float:right; margin-bottom:10px; " @click.stop="addPlace = true">
                    <v-icon>add_circle_outline</v-icon>
                </button>
            </div>
            
        <v-divider style="margin-top:5px;"></v-divider><br><br>
        <div v-for="(place, index) in places" :key="place.name">
            <div class="box">
                <button @click="placeDetail(index)" style="width:100%;">
                    <div style="float: left; text-align: left;">
                        <span id="name">{{place.name}}</span><br>
                        <span id="address"><v-icon size="15" style="margin-bottom:2px;">location_on</v-icon>{{place.address}}</span>
                    </div>
                    <div style="float:right; margin-top:10px;">
                        <v-icon  color="rgb(170,145,251)">keyboard_arrow_right</v-icon>
                    </div>
                    </button>
            </div>
        </div>

        <v-dialog v-model="addPlace" max-width="500" min-width="300">
            <AddPlace></AddPlace>
        </v-dialog>
        </div>
    </div>
</template>

<script>
import HNav from "../../components/common/HNav";
import AddPlace from "../../views/AddPlace";
import {getPlaceList} from "../../api/place.js";

export default {
    name: "app",
    data() {
        return {
           addPlace: false,
           places: [],
           totalSize: 0
        };
    },
    components: {
        HNav,
        AddPlace
    },
    created() { // 지점 목록 전체 조회
        const vm = this;
        getPlaceList(
            function(success){
                console.log('지점 전체 조회 성공');
                vm.places = success.data;
                vm.totalSize = success.data.length;
                console.log(success.data);
            },
            function(fail){
                console.log('지점 전체 조회 실패');
            }
        )
    },
    methods: {
        placeDetail(index) { // 아이디 가지고 세부조회
            var id = this.places[index].id;
            this.$router.push("adminMenu/detail/" + id);
        }
    },
};
</script>

<style scoped>
#placeList{
    text-align:left; 
    margin:auto; 
    margin-top:80px;
}

.box {
    height: 70px;
    width:80%; 
    border: 1px solid rgb(225,225,225);
    border-radius: 23px;
    padding: 12px 10px 10px 17px;
    margin:auto; 
    margin-bottom: 15px;
}

#address{
    color:rgb(190,190,190);
    font-size:11px;
    padding-left : 3px;
}
#name{
    font-size:16px;
    padding-left: 5px;
}
#total{
    margin-left :12px;
    font-size: 13px;
    color: rgb(180,180,180);
}
</style>
