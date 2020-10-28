<template>
    <div>
        <h-nav></h-nav>
        <div id="placeList">
            <div>
                <v-icon style="margin-bottom:9px;">business</v-icon>
                <span style="font-size:18px; margin:0 0 8px 10px;">지점 관리</span>
                <button style="float:right; margin-bottom:10px;" @click.stop="addPlace = true">
                    <v-icon>add_circle_outline</v-icon>
                </button>
            </div>
        <v-divider></v-divider>

        <v-dialog v-model="addPlace" max-width="500" min-width="300">
            <AddPlace></AddPlace>
        </v-dialog>

        </div>
    </div>
</template>

<script>
import HNav from "../../components/common/HNav";
import AddPlace from "../../views/AddPlace";

export default {
    name: "app",
    data() {
        return {
           addPlace: false,
        };
    },
    components: {
        HNav,
        AddPlace
    },
    created() {
    },
    methods: {
        

    },
};
</script>

<style>
#placeList{
    text-align:left; 
    width:80%; 
    margin:auto; 
    margin-top:100px;
}
</style>
