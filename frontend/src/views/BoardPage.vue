<template>
    <div>
        <h-nav></h-nav>

        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:8px;" size="20">assignment</v-icon>
                <span id="detail">공지사항</span>
                
                <v-btn depressed color="info" id="create" @click="create" v-if="$store.state.isAdmin">글쓰기</v-btn>
                <div style="clear: both;"></div>
            </div>
            <v-divider style="margin-top:5px;"></v-divider><br>

            <ul class="list" v-for="(item,index) in items" :key="item.title">
                <li>
                    <input type="radio" name="list" class="list-checkbox" v-bind:id="'list-input'+index" />
                    <label v-bind:for="'list-input'+index" class="titles" style="height:45px;">
                        <span style="float:left; font-family: sans-serif;">{{item.title}}</span>
                        <span style="float:right; font-family: sans-serif;">{{item.time}}</span>
                    </label>
                    <div class="desc">
                        <div>{{item.content}}</div>
                    </div>
                    <span style="clear:both;"></span>
                </li>
            </ul> 
        </div>
    </div>
</template>

<script>

import HNav from "../components/common/HNav";
import {getBoardList} from "../api/board.js";

export default {
    name: "app",
    data() {
        return {
            items: []
        };
    },
    components: {
        HNav
    },
    created() {
        const vm = this;

        getBoardList(
            function(success){
                for(var i=0; i<success.data.length;i++){
                    var Data = {};
                    Data.id = success.data[i].id;
                    Data.title = success.data[i].title;
                    Data.content = success.data[i].content;
                    Data.time = success.data[i].time.split("T")[0];
                    vm.items.push(Data);
                }
                console.log('게시판 전체 조회 성공');
            },
            function(fail){
                console.log('게시판 전체 조회 실패');
            }
        )

    },
    mounted() {
    },
    methods: {
        create() { // 공지사항 글 쓰기
            this.$router.push("board/creat");
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

.banner{
    height:500px;
    background: linear-gradient( to right, rgb(236,222,227), rgb(204,234,238) );
}
#service{
    font-family: 'Archivo Black', sans-serif;
    font-size:30px;
    padding-top: 200px;
}

.list {
  list-style: none;
  padding: 0;
}

.list > li {
  padding: 0;
}
.list-checkbox {
  display: none;
}
.titles {
  padding: 10px;
  margin: 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-family: 'Archivo Black', sans-serif;
}

.desc {
  max-height: 0px;
  overflow: hidden;
  transition: 0.5s;
}
.desc > div {
  margin: 10px;
  font-family: sans-serif;
  color: black;
}
.list-checkbox:checked + .titles + .desc {
  max-height: 1000px;
}


</style>